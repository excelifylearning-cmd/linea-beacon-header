import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLayout, SignUpForm } from "@/components/features/auth";
import { useAuth } from "@/hooks/use-auth";

const SignUp = () => {
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
      title="Create your account"
      subtitle="Start exchanging skills with professionals worldwide"
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
