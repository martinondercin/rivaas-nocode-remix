
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Copy, RotateCcw, Download, Shield, Clock, Globe, Zap, FileText } from "lucide-react";

const ApiSettings = () => {
  const { toast } = useToast();
  
  // Configuration URLs (read-only from Overview setup)
  const [configuredUrls] = useState({
    verifiedUrl: "https://example.com/verification/success",
    rejectedUrl: "https://example.com/verification/failed", 
    unverifiedUrl: "https://example.com/verification/pending",
    callbackUrl: "https://example.com/api/webhook/verification",
    logoUrl: "https://example.com/assets/logo.png"
  });
  
  // API credentials state
  const [apiCredentials, setApiCredentials] = useState({
    apiKey: "ik_live_abc123def456",
    apiSecret: "sk_xyz789uvw012345",
    generatedAt: "2024-01-15T10:30:00Z",
    lastUsed: "2024-01-20T14:22:00Z"
  });
  
  const [showSecret, setShowSecret] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Advanced security settings
  const [securitySettings, setSecuritySettings] = useState({
    ipRestrictions: "",
    webhookSecret: "wh_sec_abc123def456",
    keyExpiration: 90, // days
    rateLimit: 1000, // requests per hour
    autoRotation: false
  });

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied.`,
    });
  };

  const handleRegenerateCredentials = async () => {
    try {
      // Simulate credential regeneration
      const newCredentials = {
        apiKey: "ik_live_" + Math.random().toString(36).substring(2, 20),
        apiSecret: "sk_" + Math.random().toString(36).substring(2, 30),
        generatedAt: new Date().toISOString(),
        lastUsed: null
      };
      
      setApiCredentials(prev => ({ ...prev, ...newCredentials }));
      
      toast({
        title: "Credentials Regenerated",
        description: "New API credentials have been generated. Update your integration accordingly.",
      });
    } catch {
      toast({
        title: "Regeneration Failed",
        description: "Unable to regenerate credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDownloadCredentials = () => {
    const config = {
      api_credentials: apiCredentials,
      endpoints: configuredUrls,
      security_settings: securitySettings
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'api-configuration.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Configuration Downloaded",
      description: "Your complete API configuration has been downloaded.",
    });
  };

  const handleSaveSecuritySettings = () => {
    toast({
      title: "Security Settings Updated",
      description: "Your advanced security configuration has been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            API Configuration Management
          </CardTitle>
          <p className="text-sm text-verify-mediumGray">
            Comprehensive management of your API integration settings and security configuration
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="urls" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="urls" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                URL Configuration
              </TabsTrigger>
              <TabsTrigger value="credentials" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                API Credentials
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Advanced Security
              </TabsTrigger>
            </TabsList>

            <TabsContent value="urls" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Configured Endpoints</h4>
                  <p className="text-sm text-verify-mediumGray">
                    URLs configured in the Overview section
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Validated
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? "Cancel" : "Modify URLs"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {Object.entries(configuredUrls).map(([key, url]) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={url}
                        readOnly={!isEditing}
                        className={`${!isEditing ? 'bg-gray-50' : ''}`}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(url, key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="credentials" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">API Credentials</h4>
                  <p className="text-sm text-verify-mediumGray">
                    Manage your API keys and secrets
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadCredentials}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRegenerateCredentials}
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>API Key</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(apiCredentials.apiKey, "API Key")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-3 bg-white border rounded font-mono text-sm">
                    {apiCredentials.apiKey}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>API Secret</Label>
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
                        onClick={() => handleCopy(apiCredentials.apiSecret, "API Secret")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 bg-white border rounded font-mono text-sm">
                    {showSecret ? apiCredentials.apiSecret : "•".repeat(apiCredentials.apiSecret.length)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Generated:</span>
                    <br />
                    {new Date(apiCredentials.generatedAt).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Last Used:</span>
                    <br />
                    {apiCredentials.lastUsed 
                      ? new Date(apiCredentials.lastUsed).toLocaleString()
                      : "Never"
                    }
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div>
                <h4 className="font-medium mb-4">Advanced Security Configuration</h4>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="ip-restrictions">IP Address Restrictions</Label>
                    <Input
                      id="ip-restrictions"
                      placeholder="192.168.1.0/24, 10.0.0.0/8 (comma-separated)"
                      value={securitySettings.ipRestrictions}
                      onChange={(e) => setSecuritySettings(prev => ({
                        ...prev,
                        ipRestrictions: e.target.value
                      }))}
                      className="mt-1"
                    />
                    <p className="text-xs text-verify-mediumGray mt-1">
                      Restrict API access to specific IP addresses or ranges
                    </p>
                  </div>

                  <div>
                    <Label>Webhook Signature Secret</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={securitySettings.webhookSecret}
                        readOnly
                        className="bg-gray-50 font-mono"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(securitySettings.webhookSecret, "Webhook Secret")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-verify-mediumGray mt-1">
                      Use this secret to verify webhook payload signatures
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="key-expiration">Key Expiration (Days)</Label>
                      <Input
                        id="key-expiration"
                        type="number"
                        value={securitySettings.keyExpiration}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          keyExpiration: parseInt(e.target.value)
                        }))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="rate-limit">Rate Limit (Requests/Hour)</Label>
                      <Input
                        id="rate-limit"
                        type="number"
                        value={securitySettings.rateLimit}
                        onChange={(e) => setSecuritySettings(prev => ({
                          ...prev,
                          rateLimit: parseInt(e.target.value)
                        }))}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automatic Key Rotation</Label>
                      <p className="text-xs text-verify-mediumGray">
                        Automatically rotate API keys based on expiration settings
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.autoRotation}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({
                        ...prev,
                        autoRotation: checked
                      }))}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button 
                  onClick={handleSaveSecuritySettings}
                  className="bg-verify-green text-white hover:bg-verify-green/90"
                >
                  Save Security Settings
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiSettings;
