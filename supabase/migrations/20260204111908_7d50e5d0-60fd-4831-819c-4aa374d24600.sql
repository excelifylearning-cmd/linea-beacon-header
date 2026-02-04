-- ============================================
-- PHASE 2.3: Gigs System Tables
-- Creates gigs, gig_packages, gig_gallery, gig_requirements, gig_faqs
-- ============================================

-- ============================================
-- TABLE: gigs
-- Main gig/service listings
-- ============================================
CREATE TYPE public.gig_status AS ENUM ('draft', 'active', 'paused', 'archived');
CREATE TYPE public.gig_type AS ENUM ('standard', 'auction', 'subscription', 'consultation', 'flash', 'rental');

CREATE TABLE public.gigs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(220) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    skill_ids UUID[] DEFAULT '{}',
    status public.gig_status DEFAULT 'draft',
    gig_type public.gig_type DEFAULT 'standard',
    base_price_points INTEGER NOT NULL DEFAULT 10,
    delivery_days INTEGER DEFAULT 7,
    revision_count INTEGER DEFAULT 2,
    max_orders_queue INTEGER DEFAULT 5,
    seo_title VARCHAR(60),
    seo_description VARCHAR(160),
    view_count INTEGER DEFAULT 0,
    order_count INTEGER DEFAULT 0,
    rating_avg DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    featured_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.gigs IS 'Main gig/service listings in the marketplace';

CREATE INDEX idx_gigs_seller ON public.gigs(seller_id);
CREATE INDEX idx_gigs_slug ON public.gigs(slug);
CREATE INDEX idx_gigs_category ON public.gigs(category_id);
CREATE INDEX idx_gigs_status ON public.gigs(status);
CREATE INDEX idx_gigs_featured ON public.gigs(is_featured) WHERE is_featured = true;
CREATE INDEX idx_gigs_rating ON public.gigs(rating_avg DESC);

CREATE TRIGGER update_gigs_updated_at
    BEFORE UPDATE ON public.gigs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS for gigs
ALTER TABLE public.gigs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active gigs are viewable by everyone"
    ON public.gigs FOR SELECT
    USING (status = 'active' OR auth.uid() = seller_id);

CREATE POLICY "Users can insert their own gigs"
    ON public.gigs FOR INSERT
    WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can update their own gigs"
    ON public.gigs FOR UPDATE
    USING (auth.uid() = seller_id)
    WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Users can delete their own gigs"
    ON public.gigs FOR DELETE
    USING (auth.uid() = seller_id);

-- ============================================
-- TABLE: gig_packages
-- Tiered pricing packages for gigs
-- ============================================
CREATE TYPE public.package_tier AS ENUM ('basic', 'standard', 'premium');

CREATE TABLE public.gig_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gig_id UUID NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    tier public.package_tier NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price_points INTEGER NOT NULL,
    delivery_days INTEGER NOT NULL,
    revision_count INTEGER DEFAULT 1,
    features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(gig_id, tier)
);

COMMENT ON TABLE public.gig_packages IS 'Tiered pricing packages for gigs';

CREATE INDEX idx_gig_packages_gig ON public.gig_packages(gig_id);

-- RLS for gig_packages
ALTER TABLE public.gig_packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gig packages are viewable by everyone"
    ON public.gig_packages FOR SELECT
    USING (true);

CREATE POLICY "Sellers can manage their gig packages"
    ON public.gig_packages FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.gigs 
        WHERE gigs.id = gig_packages.gig_id 
        AND gigs.seller_id = auth.uid()
    ));

-- ============================================
-- TABLE: gig_gallery
-- Media gallery for gigs
-- ============================================
CREATE TABLE public.gig_gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gig_id UUID NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video')),
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    title VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_cover BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.gig_gallery IS 'Media gallery for gigs';

CREATE INDEX idx_gig_gallery_gig ON public.gig_gallery(gig_id);

-- RLS for gig_gallery
ALTER TABLE public.gig_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gig gallery is viewable by everyone"
    ON public.gig_gallery FOR SELECT
    USING (true);

CREATE POLICY "Sellers can manage their gig gallery"
    ON public.gig_gallery FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.gigs 
        WHERE gigs.id = gig_gallery.gig_id 
        AND gigs.seller_id = auth.uid()
    ));

-- ============================================
-- TABLE: gig_requirements
-- Requirements form for buyers
-- ============================================
CREATE TABLE public.gig_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gig_id UUID NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    input_type VARCHAR(30) NOT NULL CHECK (input_type IN ('text', 'textarea', 'file', 'multiple_choice')),
    options JSONB DEFAULT '[]'::jsonb,
    is_required BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.gig_requirements IS 'Requirements form questions for buyers';

CREATE INDEX idx_gig_requirements_gig ON public.gig_requirements(gig_id);

-- RLS for gig_requirements
ALTER TABLE public.gig_requirements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gig requirements are viewable by everyone"
    ON public.gig_requirements FOR SELECT
    USING (true);

CREATE POLICY "Sellers can manage their gig requirements"
    ON public.gig_requirements FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.gigs 
        WHERE gigs.id = gig_requirements.gig_id 
        AND gigs.seller_id = auth.uid()
    ));

-- ============================================
-- TABLE: gig_faqs
-- Frequently asked questions for gigs
-- ============================================
CREATE TABLE public.gig_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gig_id UUID NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.gig_faqs IS 'Frequently asked questions for gigs';

CREATE INDEX idx_gig_faqs_gig ON public.gig_faqs(gig_id);

-- RLS for gig_faqs
ALTER TABLE public.gig_faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gig FAQs are viewable by everyone"
    ON public.gig_faqs FOR SELECT
    USING (true);

CREATE POLICY "Sellers can manage their gig FAQs"
    ON public.gig_faqs FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.gigs 
        WHERE gigs.id = gig_faqs.gig_id 
        AND gigs.seller_id = auth.uid()
    ));

-- ============================================
-- TABLE: gig_tags
-- Tags for gigs
-- ============================================
CREATE TABLE public.gig_tags (
    gig_id UUID NOT NULL REFERENCES public.gigs(id) ON DELETE CASCADE,
    tag VARCHAR(50) NOT NULL,
    PRIMARY KEY (gig_id, tag)
);

COMMENT ON TABLE public.gig_tags IS 'Tags for gig discovery';

CREATE INDEX idx_gig_tags_tag ON public.gig_tags(tag);

-- RLS for gig_tags
ALTER TABLE public.gig_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gig tags are viewable by everyone"
    ON public.gig_tags FOR SELECT
    USING (true);

CREATE POLICY "Sellers can manage their gig tags"
    ON public.gig_tags FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.gigs 
        WHERE gigs.id = gig_tags.gig_id 
        AND gigs.seller_id = auth.uid()
    ));