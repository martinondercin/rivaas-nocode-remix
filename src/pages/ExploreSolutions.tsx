
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, ExternalLink, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Define the solution type
type Solution = {
  id: string;
  name: string;
  description: string;
  components: {
    icon: React.ReactNode;
    name: string;
  }[];
  isAdded: boolean;
};

const ExploreSolutions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Solutions data
  const [solutions, setSolutions] = useState<Solution[]>([
    {
      id: "identity-verification",
      name: "Identity Verification",
      description: "Comprehensive identity verification solution combining government ID validation with biometric selfie matching to prevent fraud and ensure regulatory compliance.",
      components: [
        { icon: <div className="w-10 h-10 rounded-full bg-[#F1F0FB] flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 8H15.01M9.5 8.5H11.5L13.5 14.5H16.5" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0a1940" strokeWidth="1.5"/><path d="M3 8H21" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 15H9" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/></svg></div>, name: "Government ID" },
        { icon: <div className="w-10 h-10 rounded-full bg-[#F1F0FB] flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 9.00001C7 7.34316 8.34315 6.00001 10 6.00001H14C15.6569 6.00001 17 7.34316 17 9.00001V10C17 11.6569 15.6569 13 14 13H10C8.34315 13 7 11.6569 7 10V9.00001Z" stroke="#0a1940" strokeWidth="1.5"/><path d="M5 22V19C5 17.8954 5.89543 17 7 17H17C18.1046 17 19 17.8954 19 19V22" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="10" r="2" stroke="#0a1940" strokeWidth="1.5"/><path d="M17 3V2" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/><path d="M17 6V5" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/><path d="M19 4H20" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 4H15" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/></svg></div>, name: "Selfie" }
      ],
      isAdded: true,
    },
    {
      id: "age-verification",
      name: "Age Verification",
      description: "Streamlined age verification solution that quickly determines user age eligibility without collecting unnecessary personal data, perfect for age-restricted services.",
      components: [
        { icon: <div className="w-10 h-10 rounded-full bg-[#F1F0FB] flex items-center justify-center"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="16" rx="2" stroke="#0a1940" strokeWidth="1.5"/><path d="M8 9H9M15.5 9H16.5" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 10V13.5L13.5 15" stroke="#0a1940" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="9" r="6" stroke="#0a1940" strokeWidth="1.5"/></svg></div>, name: "Age Check" }
      ],
      isAdded: false,
    }
  ]);

  // Handle adding a solution
  const handleAddSolution = (solutionId: string) => {
    setSolutions(prev => 
      prev.map(solution => 
        solution.id === solutionId 
          ? { ...solution, isAdded: true } 
          : solution
      )
    );
    
    toast({
      title: "Solution added",
      description: "The solution has been added to your dashboard.",
    });
    
    // In a real implementation, you might redirect to the dashboard or configuration page
    if (solutionId === "identity-verification") {
      navigate("/dashboard");
    }
  };

  // Handle previewing a solution
  const handlePreviewSolution = (solutionId: string) => {
    // In a real implementation, this might open a modal with details
    toast({
      title: "Preview mode",
      description: `Preview for ${solutionId} solution would open here.`,
    });
  };

  // Filter solutions based on search query
  const filteredSolutions = solutions.filter(solution =>
    solution.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    solution.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/fc69db1a-cc90-4817-9a09-256167c7944d.png" 
              alt="Innovatrics Logo" 
              className="h-10 w-auto"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-sm">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-verify-darkGray mb-2">Explore Solutions</h1>
          <p className="text-verify-mediumGray">Choose the verification solutions that work best for your business needs</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search solutions..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-verify-green"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSolutions.map(solution => (
            <Card key={solution.id} className="overflow-hidden border border-gray-200 rounded-lg transition-shadow hover:shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-bold text-verify-darkGray mb-4">{solution.name}</h2>
                
                {/* Components Flow */}
                <div className="flex items-center mb-6 flex-wrap">
                  {solution.components.map((component, index) => (
                    <div key={index} className="flex items-center">
                      {component.icon}
                      <span className="mx-1 text-sm text-verify-mediumGray">{component.name}</span>
                      {index < solution.components.length - 1 && (
                        <Plus className="mx-2 text-verify-mediumGray" size={16} />
                      )}
                    </div>
                  ))}
                </div>
                
                <p className="text-verify-mediumGray mb-6">{solution.description}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handlePreviewSolution(solution.id)}
                  >
                    <ExternalLink size={16} />
                    Preview this solution
                  </Button>
                  
                  {solution.isAdded ? (
                    <Button 
                      disabled
                      className="bg-gray-100 text-verify-mediumGray flex items-center gap-2"
                    >
                      <Check size={16} />
                      Solution already added
                    </Button>
                  ) : (
                    <Button 
                      className="bg-verify-green hover:bg-opacity-90 flex items-center gap-2"
                      onClick={() => handleAddSolution(solution.id)}
                    >
                      <Plus size={16} />
                      Add solution
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreSolutions;
