
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info, FileText } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { ApiKeysDialog } from "./ApiKeysDialog";

export const ApiIntegration = () => {
  const [showApiForm, setShowApiForm] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const { toast } = useToast();
  
  const [verifiedUrl, setVerifiedUrl] = useState("");
  const [rejectedUrl, setRejectedUrl] = useState("");
  const [unverifiedUrl, setUnverifiedUrl] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  
  const allFieldsFilled = verifiedUrl && rejectedUrl && unverifiedUrl && callbackUrl && logoUrl;
  const apiDocumentationUrl = "https://www.innovatrics.com/wp-content/uploads/2025/02/Innovatrics-IDV-Service_Integration-Manual.pdf";

  const handleGenerateApiKeys = () => {
    if (!allFieldsFilled) {
      toast({
        title: "Missing information",
        description: "Please fill in all URL fields before generating API keys.",
        variant: "destructive"
      });
      return;
    }
    
    setApiKey("vf_live_" + Math.random().toString(36).substring(2, 15));
    setApiSecret("sk_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    setShowApiForm(true);
  };

  const handleOpenDocumentation = () => {
    toast({
      title: "API documentation",
      description: "API documentation has been opened in a new tab.",
    });
    window.open(apiDocumentationUrl, '_blank');
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-verify-darkGray">API Integration</h3>
              <p className="text-sm text-verify-mediumGray mt-1">
                Configure your integration endpoints and generate secure API keys to integrate identity verification directly into your systems.
              </p>
            </div>
            
            <div className="grid gap-3">
              <Input 
                type="url" 
                placeholder="Verified URL" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={verifiedUrl}
                onChange={(e) => setVerifiedUrl(e.target.value)}
              />
              <Input 
                type="url" 
                placeholder="Rejected URL" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={rejectedUrl}
                onChange={(e) => setRejectedUrl(e.target.value)}
              />
              <Input 
                type="url" 
                placeholder="Unverified URL" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={unverifiedUrl}
                onChange={(e) => setUnverifiedUrl(e.target.value)}
              />
              <Input 
                type="url" 
                placeholder="Callback URL" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={callbackUrl}
                onChange={(e) => setCallbackUrl(e.target.value)}
              />
              <Input 
                type="url" 
                placeholder="Logo URL" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <Button 
                onClick={handleGenerateApiKeys}
                className="bg-[#0D1941] hover:bg-[#0D1941]/90 text-white"
                disabled={!allFieldsFilled}
              >
                Generate Token and Secure Key
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-verify-mediumGray/30 text-verify-mediumGray hover:bg-verify-lightGray"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    <span>Learn More</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-verify-darkGray">API Integration</h3>
                    <div className="space-y-2">
                      <h4 className="font-medium">Enterprise-Grade Security</h4>
                      <p className="text-sm text-verify-mediumGray">
                        Our API integration provides a secure, customizable solution for businesses that require complete control over their identity verification flow.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Benefits:</h4>
                      <ul className="list-disc pl-5 text-sm text-verify-mediumGray space-y-1">
                        <li>Enhanced security with encrypted API communications</li>
                        <li>Seamless integration with your existing systems</li>
                        <li>Customizable verification workflows</li>
                        <li>Real-time verification status and callback support</li>
                        <li>Comprehensive audit logs and compliance reporting</li>
                      </ul>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="mt-4">
              <Button
                variant="outline"
                className="flex items-center border-[#0D1941] text-[#0D1941] hover:bg-[#0D1941]/10"
                onClick={handleOpenDocumentation}
              >
                <FileText className="mr-2 h-4 w-4" />
                View Integration Manual
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <ApiKeysDialog 
        open={showApiForm}
        onOpenChange={setShowApiForm}
        apiKey={apiKey}
        apiSecret={apiSecret}
        documentationUrl={apiDocumentationUrl}
      />
    </>
  );
};
