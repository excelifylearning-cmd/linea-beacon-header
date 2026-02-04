-- Fix security warnings: Set search_path on functions and fix permissive policy

-- Fix function search paths
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;

-- Fix permissive INSERT policy on user_activity_logs
-- Only allow authenticated users to insert their own logs
DROP POLICY IF EXISTS "Allow insert activity logs" ON public.user_activity_logs;

CREATE POLICY "Users can insert their own activity logs"
    ON public.user_activity_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);