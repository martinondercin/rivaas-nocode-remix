import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface Webhook {
  id: string;
  name: string;
  endpoint: string;
  createdAt: string;
  type: string;
  action: string;
}

const WebhooksTab = () => {
  const { toast } = useToast();
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [webhookName, setWebhookName] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [triggerCondition, setTriggerCondition] = useState("");

  const handleCreateWebhook = () => {
    if (!webhookName || !endpoint || !triggerCondition) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newWebhook: Webhook = {
      id: Date.now().toString(),
      name: webhookName,
      endpoint: endpoint,
      createdAt: new Date().toISOString().split('T')[0],
      type: triggerCondition,
      action: "Active"
    };

    setWebhooks([...webhooks, newWebhook]);
    setWebhookName("");
    setEndpoint("");
    setTriggerCondition("");
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Webhook created successfully"
    });
  };

  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
    toast({
      title: "Success",
      description: "Webhook deleted successfully"
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Manage webhooks to receive real-time updates for AML, Adverse Media or changes in case status.
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-verify-purple hover:bg-verify-purple/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Webhook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new Webhook</DialogTitle>
              <DialogDescription>
                Receive real-time updates for AML, Adverse Media or changes in case status.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="webhook-name">Webhook Name</Label>
                <Input
                  id="webhook-name"
                  placeholder="Enter webhook name"
                  value={webhookName}
                  onChange={(e) => setWebhookName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endpoint">Endpoint</Label>
                <Input
                  id="endpoint"
                  placeholder="http://your-url"
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="trigger-conditions">Trigger Conditions</Label>
                <Select onValueChange={setTriggerCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Trigger Conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verification">Verification Complete</SelectItem>
                    <SelectItem value="aml">AML Check</SelectItem>
                    <SelectItem value="adverse-media">Adverse Media</SelectItem>
                    <SelectItem value="case-status">Case Status Change</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateWebhook}
                  className="bg-verify-purple hover:bg-verify-purple/90 text-white"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {webhooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">No webhooks configured</h3>
              <p className="text-verify-mediumGray">
                Create your first webhook to receive real-time updates for AML, Adverse Media or changes in case status.
              </p>
            </div>
          </div>
        ) : (
          <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Webhook Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {webhooks.map((webhook) => (
              <TableRow key={webhook.id}>
                <TableCell className="font-medium">{webhook.name}</TableCell>
                <TableCell>{webhook.createdAt}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{webhook.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {webhook.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteWebhook(webhook.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default WebhooksTab;