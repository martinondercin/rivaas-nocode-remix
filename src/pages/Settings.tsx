
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [dataRetentionDays, setDataRetentionDays] = useState(30);
  const [email, setEmail] = useState("admin@demo.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
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
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated.",
    });
  };
  
  const handleSaveSecurity = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "The new password and confirmation do not match.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword && newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
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
  
  const handleDeleteAccount = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirm) {
      toast({
        title: "Account scheduled for deletion",
        description: "Your account will be deleted within 30 days.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">Settings</h1>
        <p className="text-verify-mediumGray">Manage your account preferences and security settings</p>
      </header>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-verify-mediumGray">
                      Receive notifications about verification activities
                    </p>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                
                <div>
                  <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                  <Input
                    id="data-retention"
                    type="number"
                    min={1}
                    max={365}
                    value={dataRetentionDays}
                    onChange={(e) => setDataRetentionDays(parseInt(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-verify-mediumGray mt-1">
                    Number of days verification data is kept before being permanently deleted
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral} className="bg-verify-green text-white hover:bg-verify-green/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-verify-mediumGray">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium mb-4">Change Password</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSecurity} className="bg-verify-green text-white hover:bg-verify-green/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Delete Account</h4>
                  <p className="text-sm text-verify-mediumGray mt-1">
                    Once you delete your account, there is no going back. This action cannot be undone.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
