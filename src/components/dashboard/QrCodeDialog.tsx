
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type QrCodeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verificationLink: string;
};

export const QrCodeDialog = ({ open, onOpenChange, verificationLink }: QrCodeDialogProps) => {
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
  );
};
