
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { PrivacyPolicyButton } from "@/components/PrivacyPolicyButton";

const Signup = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would call an API to create a user account
    if (companyName && email && password) {
      // Show success message and redirect to explore solutions
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Account created successfully",
        description: "Welcome to your Identity Verification Dashboard.",
      });
      navigate("/explore-solutions");
    } else {
      toast({
        title: "Signup failed",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
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
          <h2 className="text-3xl font-bold mb-4">Join Our Verification Platform</h2>
          <p className="text-lg opacity-80">Simple, secure identity verification for your business</p>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md p-8 border-0 shadow-none">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight text-verify-darkGray">Sign up</h1>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verify-green"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verify-green"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verify-green"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-verify-green text-white rounded-md hover:bg-opacity-90 transition-all"
              >
                Create account
              </button>
            </form>
            
            <div className="text-center text-sm text-verify-mediumGray">
              <p>
                By continuing, you agree to Identity Verification's{" "}
                <Link to="/terms" className="text-verify-green hover:underline">
                  Terms of Services
                </Link>{" "}
                and{" "}
                <span className="inline-flex align-middle">
                  <PrivacyPolicyButton className="text-verify-green hover:underline p-0 h-auto" />
                </span>
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-verify-mediumGray">
                Already have an account?{" "}
                <Link to="/login" className="text-verify-green hover:underline">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
