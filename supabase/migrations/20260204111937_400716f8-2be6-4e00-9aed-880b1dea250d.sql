-- ============================================
-- PHASE 2.4: Orders & Transactions Tables
-- Creates orders, order_deliverables, order_revisions, order_timeline
-- ============================================

-- ============================================
-- TABLE: orders
-- Main order records
-- ============================================
CREATE TYPE public.order_status AS ENUM (
    'pending', 'accepted', 'in_progress', 'delivered', 
    'revision', 'completed', 'cancelled', 'disputed'
);

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    gig_id UUID NOT NULL REFERENCES public.gigs(id) ON DELETE RESTRICT,
    package_id UUID REFERENCES public.gig_packages(id) ON DELETE SET NULL,
    seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    status public.order_status DEFAULT 'pending',
    total_points INTEGER NOT NULL,
    points_in_escrow INTEGER DEFAULT 0,
    due_date TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    requirements_submitted JSONB DEFAULT '{}'::jsonb,
    buyer_notes TEXT,
    seller_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.orders IS 'Order records for skill exchanges';

CREATE INDEX idx_orders_seller ON public.orders(seller_id);
CREATE INDEX idx_orders_buyer ON public.orders(buyer_id);
CREATE INDEX idx_orders_gig ON public.orders(gig_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_number ON public.orders(order_number);

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
    ON public.orders FOR SELECT
    USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

CREATE POLICY "Buyers can create orders"
    ON public.orders FOR INSERT
    WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Participants can update orders"
    ON public.orders FOR UPDATE
    USING (auth.uid() = seller_id OR auth.uid() = buyer_id);

-- ============================================
-- TABLE: order_deliverables
-- Deliverable submissions for orders
-- ============================================
CREATE TABLE public.order_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    submitted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT,
    files JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.order_deliverables IS 'Deliverable submissions for orders';

CREATE INDEX idx_order_deliverables_order ON public.order_deliverables(order_id);

-- RLS for order_deliverables
ALTER TABLE public.order_deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order participants can view deliverables"
    ON public.order_deliverables FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_deliverables.order_id 
        AND (orders.seller_id = auth.uid() OR orders.buyer_id = auth.uid())
    ));

CREATE POLICY "Order participants can submit deliverables"
    ON public.order_deliverables FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_deliverables.order_id 
        AND (orders.seller_id = auth.uid() OR orders.buyer_id = auth.uid())
    ) AND auth.uid() = submitted_by);

-- ============================================
-- TABLE: order_revisions
-- Revision requests for orders
-- ============================================
CREATE TABLE public.order_revisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    deliverable_id UUID REFERENCES public.order_deliverables(id) ON DELETE SET NULL,
    requested_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.order_revisions IS 'Revision requests for orders';

CREATE INDEX idx_order_revisions_order ON public.order_revisions(order_id);

-- RLS for order_revisions
ALTER TABLE public.order_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order participants can view revisions"
    ON public.order_revisions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_revisions.order_id 
        AND (orders.seller_id = auth.uid() OR orders.buyer_id = auth.uid())
    ));

CREATE POLICY "Buyers can request revisions"
    ON public.order_revisions FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_revisions.order_id 
        AND orders.buyer_id = auth.uid()
    ) AND auth.uid() = requested_by);

-- ============================================
-- TABLE: order_timeline
-- Timeline events for orders
-- ============================================
CREATE TABLE public.order_timeline (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.order_timeline IS 'Timeline events for order tracking';

CREATE INDEX idx_order_timeline_order ON public.order_timeline(order_id);
CREATE INDEX idx_order_timeline_created ON public.order_timeline(created_at DESC);

-- RLS for order_timeline
ALTER TABLE public.order_timeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order participants can view timeline"
    ON public.order_timeline FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_timeline.order_id 
        AND (orders.seller_id = auth.uid() OR orders.buyer_id = auth.uid())
    ));

CREATE POLICY "Order participants can add timeline events"
    ON public.order_timeline FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_timeline.order_id 
        AND (orders.seller_id = auth.uid() OR orders.buyer_id = auth.uid())
    ));

-- ============================================
-- FUNCTION: Generate order number
-- ============================================
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
    new_number VARCHAR(20);
BEGIN
    new_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || 
                  LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    NEW.order_number := new_number;
    RETURN NEW;
END;
$$;

CREATE TRIGGER generate_order_number_trigger
    BEFORE INSERT ON public.orders
    FOR EACH ROW
    WHEN (NEW.order_number IS NULL)
    EXECUTE FUNCTION public.generate_order_number();