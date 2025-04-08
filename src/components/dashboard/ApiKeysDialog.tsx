
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ApiKeysDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  apiSecret: string;
  documentationUrl: string;
};

export const ApiKeysDialog = ({ 
  open, 
  onOpenChange, 
  apiKey, 
  apiSecret,
  documentationUrl 
}: ApiKeysDialogProps) => {
  const { toast } = useToast();

  const handleCopy = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: message,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>API Integration Keys</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {(apiKey && apiSecret) && (
            <div className="space-y-4">
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
                onOpenChange(false);
              }}
            >
              Close
            </Button>
            
            {(apiKey && apiSecret) && (
              <Button
                className="bg-[#0D1941] hover:bg-[#0D1941]/90 text-white"
                onClick={() => {
                  toast({
                    title: "API documentation",
                    description: "API documentation has been opened in a new tab.",
                  });
                  window.open(documentationUrl, '_blank');
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
  );
};
