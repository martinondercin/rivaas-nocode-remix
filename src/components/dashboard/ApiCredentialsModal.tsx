
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Eye, EyeOff, Download, ExternalLink, Shield, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ApiCredentialsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  credentials: {
    apiKey: string;
    apiSecret: string;
    generatedAt: string;
  } | null;
  configuredUrls: {
    verifiedUrl: string;
    rejectedUrl: string;
    unverifiedUrl: string;
    callbackUrl: string;
    logoUrl: string;
  };
}

export const ApiCredentialsModal = ({ 
  open, 
  onOpenChange, 
  credentials,
  configuredUrls 
}: ApiCredentialsModalProps) => {
  const { toast } = useToast();
  const [showSecret, setShowSecret] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  const handleDownloadConfig = () => {
    if (!credentials) return;
    
    const config = {
      api_credentials: {
        api_key: credentials.apiKey,
        api_secret: credentials.apiSecret,
        generated_at: credentials.generatedAt
      },
      endpoints: {
        verified_url: configuredUrls.verifiedUrl,
        rejected_url: configuredUrls.rejectedUrl,
        unverified_url: configuredUrls.unverifiedUrl,
        callback_url: configuredUrls.callbackUrl,
        logo_url: configuredUrls.logoUrl
      }
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'innovatrics-api-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Configuration downloaded",
      description: "Your API configuration file has been downloaded.",
    });
  };

  const handleOpenDocumentation = () => {
    window.open("https://www.innovatrics.com/wp-content/uploads/2025/02/Innovatrics-IDV-Service_Integration-Manual.pdf", '_blank');
    toast({
      title: "Documentation opened",
      description: "API integration manual opened in a new tab.",
    });
  };

  const jsExample = `// JavaScript/Node.js Example
const response = await fetch('${configuredUrls.callbackUrl}', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ${credentials?.apiKey}',
    'Content-Type': 'application/json',
    'X-API-Secret': '${credentials?.apiSecret}'
  },
  body: JSON.stringify({
    verification_id: 'ver_123456',
    status: 'verified'
  })
});`;

  const pythonExample = `# Python Example
import requests

headers = {
    'Authorization': 'Bearer ${credentials?.apiKey}',
    'Content-Type': 'application/json',
    'X-API-Secret': '${credentials?.apiSecret}'
}

response = requests.post('${configuredUrls.callbackUrl}', 
                        headers=headers,
                        json={'verification_id': 'ver_123456', 'status': 'verified'})`;

  const curlExample = `# cURL Example
curl -X POST '${configuredUrls.callbackUrl}' \\
  -H 'Authorization: Bearer ${credentials?.apiKey}' \\
  -H 'Content-Type: application/json' \\
  -H 'X-API-Secret: ${credentials?.apiSecret}' \\
  -d '{"verification_id": "ver_123456", "status": "verified"}'`;

  if (!credentials) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            API Credentials Generated Successfully
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Credentials Display */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">API Key</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(credentials.apiKey, "API Key")}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="p-3 bg-white border rounded font-mono text-sm break-all">
                  {credentials.apiKey}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">API Secret</label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSecret(!showSecret)}
                    >
                      {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(credentials.apiSecret, "API Secret")}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="p-3 bg-white border rounded font-mono text-sm break-all">
                  {showSecret ? credentials.apiSecret : "•".repeat(credentials.apiSecret.length)}
                </div>
                <div className="flex items-center gap-1 mt-2 text-amber-600">
                  <Clock className="h-4 w-4" />
                  <p className="text-xs">
                    <strong>Important:</strong> Store this secret securely. It won't be shown again.
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                Generated: {new Date(credentials.generatedAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Security Best Practices */}
          <div className="p-4 border rounded-lg border-amber-200 bg-amber-50">
            <h4 className="font-medium text-amber-800 mb-2">Security Best Practices</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Store credentials in environment variables, never in source code</li>
              <li>• Use HTTPS for all API communications</li>
              <li>• Implement proper rate limiting on your endpoints</li>
              <li>• Regularly rotate your API credentials</li>
              <li>• Monitor API usage for suspicious activity</li>
            </ul>
          </div>

          {/* Code Examples */}
          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="curl">cURL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="javascript" className="space-y-2">
              <h4 className="font-medium">JavaScript Implementation</h4>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-sm overflow-x-auto">
                <code>{jsExample}</code>
              </pre>
            </TabsContent>
            
            <TabsContent value="python" className="space-y-2">
              <h4 className="font-medium">Python Implementation</h4>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-sm overflow-x-auto">
                <code>{pythonExample}</code>
              </pre>
            </TabsContent>
            
            <TabsContent value="curl" className="space-y-2">
              <h4 className="font-medium">cURL Example</h4>
              <pre className="p-4 bg-gray-900 text-gray-100 rounded-lg text-sm overflow-x-auto">
                <code>{curlExample}</code>
              </pre>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={handleDownloadConfig}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Configuration
            </Button>
            
            <Button
              variant="outline"
              onClick={handleOpenDocumentation}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Integration Manual
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                // This would link to the Settings section
                onOpenChange(false);
                // Navigate to settings would be implemented here
              }}
            >
              View Full Configuration
            </Button>
            
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-[#0D1941] hover:bg-[#0D1941]/90 text-white ml-auto"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
