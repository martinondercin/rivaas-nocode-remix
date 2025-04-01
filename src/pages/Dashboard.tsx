import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Copy, Download, Link as LinkIcon, Key, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [verificationCount] = useState(1234); // This would come from an API in a real app
  const [showQrCode, setShowQrCode] = useState(false);
  const [showApiForm, setShowApiForm] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const { toast } = useToast();

  const handleGenerateLink = () => {
    setShowQrCode(true);
  };

  const handleGenerateApiKeys = () => {
    // In a real app, this would call an API to generate secure tokens
    setApiKey("vf_live_" + Math.random().toString(36).substring(2, 15));
    setApiSecret("sk_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    setShowApiForm(true);
  };

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: message,
    });
  };

  const verificationLink = "https://verify-identity.innovatrics.com/demo-iframe";

  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">Dashboard Overview</h1>
        <p className="text-verify-mediumGray">Monitor your verification activity and manage integration options</p>
      </header>
      
      <div className="mb-8">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-verify-mediumGray">
              Total Verifications
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-verify-lightGray flex items-center justify-center">
              <QrCode className="h-4 w-4 text-verify-darkGray" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-verify-darkGray">{verificationCount}</div>
            <p className="text-xs text-verify-mediumGray mt-1">
              Identity verifications performed across all methods
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-lg font-semibold mb-4 text-verify-darkGray">Integration Options</h2>
      
      <Tabs defaultValue="no-code" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="no-code">No-Code Integration</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="no-code" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-verify-darkGray">Static Link & QR Code</h3>
                  <p className="text-sm text-verify-mediumGray mt-1">
                    Generate a static link and QR code for customer identity verification without technical setup.
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={handleGenerateLink}
                    className="bg-verify-green hover:bg-verify-green/90 text-white"
                  >
                    Generate Link
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-verify-mediumGray/30 text-verify-mediumGray hover:bg-verify-lightGray"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    <span>Learn More</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Identity Verification Flow</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-verify-mediumGray mb-2">Copy link, or scan the QR from your mobile device</p>
                  <div className="flex items-center space-x-2">
                    <div className="bg-verify-lightGray rounded p-2 flex-1 overflow-hidden">
                      <p className="text-sm truncate">{verificationLink}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="px-2"
                      onClick={() => handleCopy(verificationLink, "Link copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="bg-white p-3 rounded-md border border-gray-200 mb-4">
                    <div className="h-48 w-48">
                      <img src="/placeholder.svg" alt="QR Code" className="h-full w-full object-contain" />
                    </div>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "QR Code downloaded",
                        description: "The QR code has been saved to your device.",
                      });
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download QR Code
                  </Button>
                </div>
                
                <div>
                  <p className="text-sm text-verify-mediumGray mb-2">Copy a QR link to embed into your website</p>
                  <div className="flex items-center space-x-2">
                    <div className="bg-verify-lightGray rounded p-2 flex-1 overflow-hidden">
                      <p className="text-sm truncate">{`<iframe src="${verificationLink}" />`}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="px-2"
                      onClick={() => handleCopy(`<iframe src="${verificationLink}" />`, "Embed code copied to clipboard")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-verify-darkGray">API Integration</h3>
                  <p className="text-sm text-verify-mediumGray mt-1">
                    Generate secure API keys and tokens to integrate identity verification directly into your systems.
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={handleGenerateApiKeys}
                    className="bg-verify-green hover:bg-verify-green/90 text-white"
                  >
                    Generate Token and Secure Key
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-verify-mediumGray/30 text-verify-mediumGray hover:bg-verify-lightGray"
                    onClick={() => window.open('#', '_blank')}
                  >
                    <Info className="mr-2 h-4 w-4" />
                    <span>Learn More</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Dialog open={showApiForm} onOpenChange={setShowApiForm}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Please provide the following info for API Integration</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-3">
                  <input 
                    type="url" 
                    placeholder="Verified URL" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input 
                    type="url" 
                    placeholder="Rejected URL" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input 
                    type="url" 
                    placeholder="Unverified URL" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input 
                    type="url" 
                    placeholder="Callback URL" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                  <input 
                    type="url" 
                    placeholder="Logo URL" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                {(apiKey && apiSecret) && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div>
                      <label className="text-sm font-medium">Your API Key</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="bg-verify-lightGray rounded p-2 flex-1 overflow-hidden">
                          <p className="text-sm font-mono">{apiKey}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="px-2"
                          onClick={() => handleCopy(apiKey, "API key copied to clipboard")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Your API Secret</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="bg-verify-lightGray rounded p-2 flex-1 overflow-hidden">
                          <p className="text-sm font-mono">{apiSecret}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="px-2"
                          onClick={() => handleCopy(apiSecret, "API secret copied to clipboard")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-amber-600 mt-1">
                        <strong>Important:</strong> This secret will only be shown once. Please store it securely.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      if (apiKey && apiSecret) {
                        setShowApiForm(false);
                      } else {
                        toast({
                          title: "Form submitted",
                          description: "Your API configuration has been saved.",
                        });
                        handleGenerateApiKeys();
                      }
                    }}
                  >
                    {apiKey && apiSecret ? "Close" : "Submit"}
                  </Button>
                  
                  {(apiKey && apiSecret) && (
                    <Button
                      className="bg-verify-green hover:bg-verify-green/90 text-white"
                      onClick={() => {
                        toast({
                          title: "API documentation",
                          description: "API documentation has been opened in a new tab.",
                        });
                        window.open('#', '_blank');
                      }}
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      View API Documentation
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
