
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
      <div className="bg-gray-200 hidden md:flex items-center justify-center">
        <div className="w-64 h-64 bg-black rounded">
          <img 
            src="/placeholder.svg" 
            alt="Identity Verification" 
            className="w-full h-full object-cover"
          />
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
