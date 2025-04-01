
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, this would call an authentication API
    if (email && password) {
      // Simulate login success
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Login successful",
        description: "Welcome back to your Identity Verification Dashboard.",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login failed",
        description: "Please check your email and password.",
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
              <h1 className="text-3xl font-bold tracking-tight text-verify-darkGray">Log in</h1>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => 
                      setRememberMe(checked === true)
                    }
                  />
                  <label htmlFor="remember" className="text-sm text-verify-mediumGray">
                    Remember me
                  </label>
                </div>
                
                <Link to="/forgot-password" className="text-sm text-verify-green hover:underline">
                  Forgot your password?
                </Link>
              </div>
              
              <button
                type="submit"
                className="w-full py-3 bg-verify-green text-white rounded-md hover:bg-opacity-90 transition-all"
              >
                Log in
              </button>
            </form>
            
            <div className="text-center">
              <p className="text-sm text-verify-mediumGray">
                Don't have an account?{" "}
                <Link to="/signup" className="text-verify-green hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
