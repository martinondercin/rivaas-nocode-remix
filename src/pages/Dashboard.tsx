
import { useState } from "react";
import { QrCode, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { NoCodeIntegration } from "@/components/dashboard/NoCodeIntegration";
import { ApiContactForm } from "@/components/dashboard/ApiContactForm";

const Dashboard = () => {
  const [noCodeVerificationCount] = useState(85);
  const [apiVerificationCount] = useState(389);

  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">Dashboard Overview</h1>
        <p className="text-verify-mediumGray">Monitor your verification activity and manage integration options</p>
      </header>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsCard
          title="No-Code Verifications"
          value={noCodeVerificationCount}
          description="Identity verifications performed via links and QR codes"
          icon={QrCode}
        />
        
        <StatsCard
          title="API Integration Verifications"
          value={apiVerificationCount}
          description="Identity verifications performed via API integration"
          icon={Code}
        />
      </div>
      
      <h2 className="text-lg font-semibold mb-4 text-verify-darkGray">Integration Options</h2>
      
      <Tabs defaultValue="no-code" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="no-code" 
            className="data-[state=active]:bg-verify-green data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 font-medium"
          >
            No-Code Integration
          </TabsTrigger>
          <TabsTrigger 
            value="api"
            className="data-[state=active]:bg-[#0D1941] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 font-medium"
          >
            API Integration
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="no-code" className="space-y-4 bg-[#F1F0FB] p-5 rounded-lg border border-gray-100 shadow-sm">
          <NoCodeIntegration />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4 bg-[#F1F0FB] p-5 rounded-lg border border-gray-100 shadow-sm">
          <ApiContactForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
