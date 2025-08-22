import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WebhooksTab from "@/components/api/WebhooksTab";
import ApiKeysTab from "@/components/api/ApiKeysTab";
import IntegrationManualTab from "@/components/api/IntegrationManualTab";

const Api = () => {
  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">API</h1>
        <p className="text-verify-mediumGray">Manage API keys, webhooks, and integration settings</p>
      </header>
      
      <Tabs defaultValue="webhooks" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="apikeys">API Keys</TabsTrigger>
          <TabsTrigger value="integration">Integration Manual</TabsTrigger>
        </TabsList>
        
        <TabsContent value="webhooks">
          <WebhooksTab />
        </TabsContent>
        
        <TabsContent value="apikeys">
          <ApiKeysTab />
        </TabsContent>
        
        <TabsContent value="integration">
          <IntegrationManualTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Api;