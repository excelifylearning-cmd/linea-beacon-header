-- ============================================
-- PHASE 2.5: Messaging System
-- Creates conversations, messages
-- ============================================

CREATE TYPE public.conversation_type AS ENUM ('order', 'inquiry', 'support');

CREATE TABLE public.conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type public.conversation_type DEFAULT 'inquiry',
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    participant_ids UUID[] NOT NULL,
    last_message_at TIMESTAMPTZ DEFAULT now(),
    is_archived BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.conversations IS 'Conversation threads between users';

CREATE INDEX idx_conversations_participants ON public.conversations USING GIN(participant_ids);
CREATE INDEX idx_conversations_order ON public.conversations(order_id);
CREATE INDEX idx_conversations_last_message ON public.conversations(last_message_at DESC);

-- RLS for conversations
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their conversations"
    ON public.conversations FOR SELECT
    USING (auth.uid() = ANY(participant_ids));

CREATE POLICY "Users can create conversations they participate in"
    ON public.conversations FOR INSERT
    WITH CHECK (auth.uid() = ANY(participant_ids));

CREATE POLICY "Participants can update conversations"
    ON public.conversations FOR UPDATE
    USING (auth.uid() = ANY(participant_ids));

-- ============================================
-- TABLE: messages
-- Messages within conversations
-- ============================================
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT,
    content_type VARCHAR(20) DEFAULT 'text' CHECK (content_type IN ('text', 'file', 'system')),
    attachments JSONB DEFAULT '[]'::jsonb,
    reply_to_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    is_edited BOOLEAN DEFAULT false,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.messages IS 'Messages within conversations';

CREATE INDEX idx_messages_conversation ON public.messages(conversation_id);
CREATE INDEX idx_messages_sender ON public.messages(sender_id);
CREATE INDEX idx_messages_created ON public.messages(created_at DESC);

CREATE TRIGGER update_messages_updated_at
    BEFORE UPDATE ON public.messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- RLS for messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Conversation participants can view messages"
    ON public.messages FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.conversations 
        WHERE conversations.id = messages.conversation_id 
        AND auth.uid() = ANY(conversations.participant_ids)
    ));

CREATE POLICY "Users can send messages to their conversations"
    ON public.messages FOR INSERT
    WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.conversations 
            WHERE conversations.id = messages.conversation_id 
            AND auth.uid() = ANY(conversations.participant_ids)
        )
    );

CREATE POLICY "Users can update their own messages"
    ON public.messages FOR UPDATE
    USING (auth.uid() = sender_id);

-- ============================================
-- PHASE 2.6: Reviews & Ratings
-- ============================================

CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID UNIQUE NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
    value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
    title VARCHAR(200),
    content TEXT,
    is_public BOOLEAN DEFAULT true,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.reviews IS 'Reviews for completed orders';

CREATE INDEX idx_reviews_reviewee ON public.reviews(reviewee_id);
CREATE INDEX idx_reviews_reviewer ON public.reviews(reviewer_id);
CREATE INDEX idx_reviews_rating ON public.reviews(rating DESC);

-- RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reviews are viewable by everyone"
    ON public.reviews FOR SELECT
    USING (is_public = true OR auth.uid() = reviewer_id OR auth.uid() = reviewee_id);

CREATE POLICY "Users can create reviews for their orders"
    ON public.reviews FOR INSERT
    WITH CHECK (
        auth.uid() = reviewer_id AND
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = reviews.order_id 
            AND (orders.buyer_id = auth.uid() OR orders.seller_id = auth.uid())
            AND orders.status = 'completed'
        )
    );

-- ============================================
-- PHASE 2.7: Skill Points Economy
-- ============================================

CREATE TABLE public.skill_point_wallets (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    available_balance INTEGER DEFAULT 100,
    pending_balance INTEGER DEFAULT 0,
    lifetime_earned INTEGER DEFAULT 0,
    lifetime_spent INTEGER DEFAULT 0,
    last_transaction_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.skill_point_wallets IS 'User skill point wallets';

CREATE TRIGGER update_wallets_updated_at
    BEFORE UPDATE ON public.skill_point_wallets
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- RLS for wallets
ALTER TABLE public.skill_point_wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wallet"
    ON public.skill_point_wallets FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own wallet"
    ON public.skill_point_wallets FOR ALL
    USING (auth.uid() = user_id);

-- ============================================
-- TABLE: skill_point_transactions
-- Transaction history
-- ============================================
CREATE TYPE public.transaction_type AS ENUM ('earn', 'spend', 'transfer', 'purchase', 'withdrawal', 'refund', 'bonus');

CREATE TABLE public.skill_point_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type public.transaction_type NOT NULL,
    amount INTEGER NOT NULL,
    balance_after INTEGER NOT NULL,
    source_type VARCHAR(50),
    source_id UUID,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'reversed')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.skill_point_transactions IS 'Skill point transaction history';

CREATE INDEX idx_transactions_user ON public.skill_point_transactions(user_id);
CREATE INDEX idx_transactions_type ON public.skill_point_transactions(type);
CREATE INDEX idx_transactions_created ON public.skill_point_transactions(created_at DESC);

-- RLS for transactions
ALTER TABLE public.skill_point_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions"
    ON public.skill_point_transactions FOR SELECT
    USING (auth.uid() = user_id);

-- ============================================
-- Auto-create wallet on profile creation
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_wallet()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.skill_point_wallets (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_profile_created_wallet
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_wallet();