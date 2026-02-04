-- ============================================
-- PHASE 2.1: Core User System Tables
-- Creates profiles, user_settings, user_sessions, user_devices, user_activity_logs
-- ============================================

-- ============================================
-- TABLE: profiles
-- Core user profile information
-- ============================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE,
    display_name VARCHAR(100),
    bio TEXT,
    avatar_url TEXT,
    location VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    language VARCHAR(10) DEFAULT 'en',
    date_of_birth DATE,
    gender VARCHAR(20),
    is_verified BOOLEAN DEFAULT false,
    verification_tier VARCHAR(20) DEFAULT 'basic' CHECK (verification_tier IN ('basic', 'pro', 'enterprise')),
    is_student BOOLEAN DEFAULT false,
    university_name VARCHAR(200),
    graduation_year INTEGER,
    website_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    skill_points_balance INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.profiles IS 'User profile information extending auth.users';

-- Create indexes
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_is_verified ON public.profiles(is_verified) WHERE is_verified = true;
CREATE INDEX idx_profiles_is_student ON public.profiles(is_student) WHERE is_student = true;

-- RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ============================================
-- TABLE: user_settings
-- User preferences for notifications, privacy, and security
-- ============================================
CREATE TABLE public.user_settings (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    notification_preferences JSONB DEFAULT '{
        "email_marketing": true,
        "email_orders": true,
        "email_messages": true,
        "email_reviews": true,
        "push_orders": true,
        "push_messages": true,
        "push_mentions": true,
        "in_app_all": true
    }'::jsonb,
    privacy_settings JSONB DEFAULT '{
        "profile_visibility": "public",
        "show_online_status": true,
        "show_last_active": true,
        "allow_messages_from": "everyone",
        "show_earnings": false
    }'::jsonb,
    theme VARCHAR(20) DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    language VARCHAR(10) DEFAULT 'en',
    currency VARCHAR(3) DEFAULT 'USD',
    two_factor_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.user_settings IS 'User preferences for notifications, privacy, and security';

-- RLS for user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own settings"
    ON public.user_settings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
    ON public.user_settings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
    ON public.user_settings FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================
-- TABLE: user_sessions
-- Tracks user login sessions
-- ============================================
CREATE TABLE public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_info JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    location_data JSONB DEFAULT '{}'::jsonb,
    user_agent TEXT,
    last_active_at TIMESTAMPTZ DEFAULT now(),
    is_current BOOLEAN DEFAULT false,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.user_sessions IS 'Tracks active and historical user login sessions';

CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_last_active ON public.user_sessions(last_active_at DESC);

-- RLS for user_sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own sessions"
    ON public.user_sessions FOR ALL
    USING (auth.uid() = user_id);

-- ============================================
-- TABLE: user_devices
-- Trusted devices for security
-- ============================================
CREATE TABLE public.user_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    device_fingerprint VARCHAR(255) NOT NULL,
    device_name VARCHAR(100),
    device_type VARCHAR(50) CHECK (device_type IN ('desktop', 'mobile', 'tablet', 'unknown')),
    browser VARCHAR(100),
    os VARCHAR(100),
    is_trusted BOOLEAN DEFAULT false,
    last_used_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, device_fingerprint)
);

COMMENT ON TABLE public.user_devices IS 'Registered and trusted devices for security';

CREATE INDEX idx_user_devices_user_id ON public.user_devices(user_id);

-- RLS for user_devices
ALTER TABLE public.user_devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own devices"
    ON public.user_devices FOR ALL
    USING (auth.uid() = user_id);

-- ============================================
-- TABLE: user_activity_logs
-- Audit trail for user actions
-- ============================================
CREATE TABLE public.user_activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

COMMENT ON TABLE public.user_activity_logs IS 'Audit trail of user actions';

CREATE INDEX idx_activity_logs_user_id ON public.user_activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON public.user_activity_logs(created_at DESC);

-- RLS for user_activity_logs
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity"
    ON public.user_activity_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Allow insert activity logs"
    ON public.user_activity_logs FOR INSERT
    WITH CHECK (true);

-- ============================================
-- FUNCTION: Update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to profiles
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Apply to user_settings
CREATE TRIGGER update_user_settings_updated_at
    BEFORE UPDATE ON public.user_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- FUNCTION: Auto-create profile on user signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, display_name, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    
    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();