
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Link, Download, AlertTriangle } from "lucide-react";

interface QrCodeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verificationLink: string;
  isRevoked?: boolean;
}

export function QrCodeDialog({ open, onOpenChange, verificationLink, isRevoked = false }: QrCodeProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"qr" | "link">("qr");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationLink);
    toast({
      title: "Copied!",
      description: "Verification link copied to clipboard",
    });
  };

  const handleDownloadQR = () => {
    // Get QR code image
    const qrCodeImage = document.querySelector(".qr-code-image") as HTMLImageElement;
    if (!qrCodeImage) {
      toast({
        title: "Error",
        description: "Could not find QR code image",
        variant: "destructive",
      });
      return;
    }

    // Create a canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    
    // Set canvas dimensions to match the image
    canvas.width = qrCodeImage.naturalWidth;
    canvas.height = qrCodeImage.naturalHeight;
    
    // Draw the image on the canvas
    if (context) {
      // Create a new image to ensure it's fully loaded
      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle CORS if QR is from different domain
      img.onload = () => {
        context.drawImage(img, 0, 0);
        
        // Convert to data URL and create download
        try {
          const dataURL = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataURL;
          link.download = "verification-qr-code.png";
          link.click();
          
          toast({
            title: "Downloaded!",
            description: "QR code has been downloaded",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to download QR code due to CORS restrictions",
            variant: "destructive",
          });
        }
      };
      img.src = qrCodeImage.src;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Verification Link & QR Code</DialogTitle>
        </DialogHeader>
        
        {isRevoked ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="rounded-full bg-red-100 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-medium text-lg">This link has been revoked</h3>
            <p className="text-sm text-verify-mediumGray">
              This verification link is no longer active and cannot be used.
              Please generate a new link to continue.
            </p>
          </div>
        ) : (
          <>
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "qr" | "link")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qr">QR Code</TabsTrigger>
                <TabsTrigger value="link">Link</TabsTrigger>
              </TabsList>
              
              <TabsContent value="qr" className="pt-4 pb-2">
                <div className="flex justify-center py-4">
                  <div className="bg-white p-3 border border-gray-200 rounded-lg">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://verify-identity.innovatrics.com/demo-iframe" 
                      alt="QR Code" 
                      className="w-[200px] h-[200px] qr-code-image" 
                    />
                  </div>
                </div>
                <p className="text-center text-sm text-verify-mediumGray mt-2">
                  Scan this QR code with a mobile device to verify identity.
                </p>
              </TabsContent>
              
              <TabsContent value="link" className="pt-4 pb-2">
                <div className="flex flex-col space-y-4 py-4">
                  <div className="border border-gray-200 px-3 py-2 rounded-md bg-gray-50 break-all">
                    <span className="text-sm font-mono">{verificationLink}</span>
                  </div>
                  <p className="text-sm text-verify-mediumGray">
                    Share this link via email or SMS to your customers.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="gap-2 sm:gap-0">
              {activeTab === "qr" ? (
                <Button className="gap-1.5" onClick={handleDownloadQR}>
                  <Download className="h-4 w-4" />
                  <span>Download QR</span>
                </Button>
              ) : (
                <Button className="gap-1.5" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                  <span>Copy Link</span>
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
