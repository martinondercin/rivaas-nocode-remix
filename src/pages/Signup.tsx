
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
      // Show success message and redirect to login
      toast({
        title: "Account created successfully",
        description: "Please check your email to verify your account.",
      });
      navigate("/login");
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
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1486718448742-163732cd1544?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4392&q=80" 
            alt="Minimalist wavy structure" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
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
                <Link to="/privacy" className="text-verify-green hover:underline">
                  Privacy Policy
                </Link>
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
