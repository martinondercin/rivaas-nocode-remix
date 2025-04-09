
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real implementation, this would call an API to send a password reset email
    setTimeout(() => {
      setIsSubmitting(false);
      setIsEmailSent(true);
      toast({
        title: "Recovery email sent",
        description: "Please check your inbox for password reset instructions.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="bg-gray-900 hidden md:flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[#0a1940]">
          <img 
            src="/lovable-uploads/41730dcd-34b5-4636-9e3e-9c50a5184562.png" 
            alt="Identity Verification Abstract" 
            className="w-full h-full object-contain opacity-90 p-12"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1940]/80 to-transparent"></div>
        </div>
        <div className="relative z-10 text-white text-center px-8">
          <h2 className="text-3xl font-bold mb-4">Account Recovery</h2>
          <p className="text-lg opacity-80">Reset your password to regain access to your account</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 border-0 shadow-none">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-verify-darkGray">
                {isEmailSent ? "Check your email" : "Forgot Password"}
              </h1>
              <p className="text-verify-mediumGray">
                {isEmailSent 
                  ? "We've sent a password recovery link to your email address" 
                  : "Enter your email address and we'll send you a link to reset your password"}
              </p>
            </div>
            
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full py-3 bg-verify-green text-white rounded-md hover:bg-opacity-90 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Recovery Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="mb-4 p-4 bg-verify-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-verify-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-verify-mediumGray">
                  If you don't see the email in your inbox, check your spam folder
                </p>
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setIsEmailSent(false)}
                >
                  Try another email
                </Button>
              </div>
            )}
            
            <div className="flex items-center justify-center text-sm">
              <Link
                to="/login"
                className="inline-flex items-center text-verify-green hover:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
