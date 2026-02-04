-- ============================================
-- PHASE 2.2: Skills & Categories Tables
-- Creates categories, skills, user_skills, skill_endorsements
-- ============================================

-- ============================================
-- TABLE: categories
-- Skill categories hierarchy
-- ============================================
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    color VARCHAR(20),
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.categories IS 'Skill categories with hierarchical structure';

CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_categories_parent ON public.categories(parent_id);
CREATE INDEX idx_categories_active ON public.categories(is_active) WHERE is_active = true;

-- RLS for categories (public read)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
    ON public.categories FOR SELECT
    USING (true);

-- ============================================
-- TABLE: skills
-- Individual skills within categories
-- ============================================
CREATE TABLE public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
    icon VARCHAR(50),
    is_verified BOOLEAN DEFAULT false,
    popularity_score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.skills IS 'Individual skills within categories';

CREATE INDEX idx_skills_slug ON public.skills(slug);
CREATE INDEX idx_skills_category ON public.skills(category_id);
CREATE INDEX idx_skills_popularity ON public.skills(popularity_score DESC);

-- RLS for skills (public read)
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Skills are viewable by everyone"
    ON public.skills FOR SELECT
    USING (true);

-- ============================================
-- TABLE: user_skills
-- User's skill portfolio with mastery levels
-- ============================================
CREATE TYPE public.mastery_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert', 'master');

CREATE TABLE public.user_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    skill_id UUID NOT NULL REFERENCES public.skills(id) ON DELETE CASCADE,
    mastery_level public.mastery_level DEFAULT 'beginner',
    years_experience DECIMAL(4,1),
    description TEXT,
    is_offering BOOLEAN DEFAULT false,
    is_seeking BOOLEAN DEFAULT false,
    elo_rating INTEGER DEFAULT 1200,
    total_exchanges INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, skill_id)
);

COMMENT ON TABLE public.user_skills IS 'User skill portfolio with mastery levels and ELO ratings';

CREATE INDEX idx_user_skills_user ON public.user_skills(user_id);
CREATE INDEX idx_user_skills_skill ON public.user_skills(skill_id);
CREATE INDEX idx_user_skills_offering ON public.user_skills(is_offering) WHERE is_offering = true;
CREATE INDEX idx_user_skills_seeking ON public.user_skills(is_seeking) WHERE is_seeking = true;
CREATE INDEX idx_user_skills_elo ON public.user_skills(elo_rating DESC);

-- Apply updated_at trigger
CREATE TRIGGER update_user_skills_updated_at
    BEFORE UPDATE ON public.user_skills
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS for user_skills
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "User skills are viewable by everyone"
    ON public.user_skills FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own skills"
    ON public.user_skills FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills"
    ON public.user_skills FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills"
    ON public.user_skills FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- TABLE: skill_endorsements
-- Endorsements from other users
-- ============================================
CREATE TABLE public.skill_endorsements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_skill_id UUID NOT NULL REFERENCES public.user_skills(id) ON DELETE CASCADE,
    endorser_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_skill_id, endorser_id)
);

COMMENT ON TABLE public.skill_endorsements IS 'User endorsements for skills';

CREATE INDEX idx_skill_endorsements_user_skill ON public.skill_endorsements(user_skill_id);
CREATE INDEX idx_skill_endorsements_endorser ON public.skill_endorsements(endorser_id);

-- RLS for skill_endorsements
ALTER TABLE public.skill_endorsements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Endorsements are viewable by everyone"
    ON public.skill_endorsements FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can endorse"
    ON public.skill_endorsements FOR INSERT
    WITH CHECK (auth.uid() = endorser_id);

CREATE POLICY "Users can delete their own endorsements"
    ON public.skill_endorsements FOR DELETE
    USING (auth.uid() = endorser_id);

-- Apply updated_at trigger to categories
CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Apply updated_at trigger to skills
CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON public.skills
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();