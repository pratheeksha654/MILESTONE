import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  return (
    <AuthCard
      mode="login"
      subtitle="Welcome back! Sign in to continue"
      buttonText="Login"
      bottomText="Don’t have an account?"
      bottomLinkText="Sign up"
      bottomLinkHref="/signup"
    />
  );
}