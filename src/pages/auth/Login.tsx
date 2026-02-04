import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout, LoginForm } from "@/components/features/auth";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground" />
      </div>
    );
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue exchanging skills"
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
