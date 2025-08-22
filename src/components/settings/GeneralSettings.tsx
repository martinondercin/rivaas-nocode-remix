
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const GeneralSettings = () => {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dataRetentionDays, setDataRetentionDays] = useState(30);
  const [email, setEmail] = useState("admin@demo.com");
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings saved",
      description: "Your general settings have been updated.",
    });
  };

  return (
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
              Number of days verification data is kept before being sent to customer email and permanently deleted
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
  );
};

export default GeneralSettings;
