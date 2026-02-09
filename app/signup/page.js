import AuthCard from "@/components/AuthCard";

export default function SignupPage() {
  return (
    <AuthCard
      mode="signup"
      subtitle="Create your account to get started"
      buttonText="Create Account"
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLinkHref="/login"
    />
  );
}
