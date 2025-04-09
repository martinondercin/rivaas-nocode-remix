
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password should be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real implementation, this would call an API to reset the password
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now log in with your new password.",
      });
      navigate("/login");
    }, 1500);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-verify-darkGray">Invalid or Expired Link</h1>
            <p className="text-verify-mediumGray">
              This password reset link is invalid or has expired. Please request a new password reset link.
            </p>
            <Button
              className="mt-4 bg-verify-green text-white"
              onClick={() => navigate("/forgot-password")}
            >
              Request New Link
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
          <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
          <p className="text-lg opacity-80">Create a new secure password for your account</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 border-0 shadow-none">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-verify-darkGray">Create New Password</h1>
              <p className="text-verify-mediumGray">
                Your password must be at least 8 characters long
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-10"
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-verify-mediumGray"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3"
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 bg-verify-green text-white rounded-md hover:bg-opacity-90 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
