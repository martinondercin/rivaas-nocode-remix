
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ApiSettings = () => {
  const { toast } = useToast();
  
  // API integration URL fields
  const [webhookUrl, setWebhookUrl] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [successUrl, setSuccessUrl] = useState("");
  const [failureUrl, setFailureUrl] = useState("");
  
  // API keys state
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  
  // Check if all URL fields are filled
  const allUrlsFilled = webhookUrl && callbackUrl && redirectUrl && successUrl && failureUrl;
  
  const handleSaveApi = () => {
    toast({
      title: "API settings saved",
      description: "Your API settings have been updated.",
    });
  };
  
  const handleGenerateApiKeys = () => {
    // Generate random keys
    const newApiKey = 'ik_' + Math.random().toString(36).substring(2, 15);
    const newApiSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    
    setApiKey(newApiKey);
    setApiSecret(newApiSecret);
    
    toast({
      title: "API Keys Generated",
      description: "Your new API Key and Secret have been created.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://"
              className="mt-1"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-verify-mediumGray mt-1">
              URL where verification results will be sent
            </p>
          </div>
          
          <div>
            <Label htmlFor="callback-url">Callback URL</Label>
            <Input
              id="callback-url"
              type="url"
              placeholder="https://"
              className="mt-1"
              value={callbackUrl}
              onChange={(e) => setCallbackUrl(e.target.value)}
            />
            <p className="text-xs text-verify-mediumGray mt-1">
              URL for callback events
            </p>
          </div>
          
          <div>
            <Label htmlFor="redirect-url">Redirect URL</Label>
            <Input
              id="redirect-url"
              type="url"
              placeholder="https://"
              className="mt-1"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
            />
            <p className="text-xs text-verify-mediumGray mt-1">
              URL to redirect after verification
            </p>
          </div>
          
          <div>
            <Label htmlFor="success-url">Success URL</Label>
            <Input
              id="success-url"
              type="url"
              placeholder="https://"
              className="mt-1"
              value={successUrl}
              onChange={(e) => setSuccessUrl(e.target.value)}
            />
            <p className="text-xs text-verify-mediumGray mt-1">
              URL for successful verification
            </p>
          </div>
          
          <div>
            <Label htmlFor="failure-url">Failure URL</Label>
            <Input
              id="failure-url"
              type="url"
              placeholder="https://"
              className="mt-1"
              value={failureUrl}
              onChange={(e) => setFailureUrl(e.target.value)}
            />
            <p className="text-xs text-verify-mediumGray mt-1">
              URL for failed verification
            </p>
          </div>
        </div>
        
        <div className="pt-6 border-t border-gray-200 space-y-4">
          <h4 className="text-sm font-medium">API Credentials</h4>
          <div className="p-4 border rounded-md bg-gray-50">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="api-key">API Key</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={!allUrlsFilled}
                    onClick={handleGenerateApiKeys}
                  >
                    Generate API Keys
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    id="api-key"
                    readOnly
                    value={apiKey}
                    className="pr-10 bg-white"
                    placeholder={allUrlsFilled ? "Click Generate API Keys button" : "Fill all URL fields above first"}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="api-secret">API Secret</Label>
                <div className="relative">
                  <Input
                    id="api-secret"
                    type="password"
                    readOnly
                    value={apiSecret}
                    className="pr-10 bg-white"
                    placeholder={allUrlsFilled ? "Click Generate API Keys button" : "Fill all URL fields above first"}
                  />
                </div>
              </div>
              
              {!allUrlsFilled && (
                <p className="text-amber-600 text-xs mt-2">
                  Please fill in all URL fields above to generate API credentials.
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveApi} className="bg-verify-green text-white hover:bg-verify-green/90">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiSettings;
