
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Copy, Download, ChevronUp, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface VerificationLinkDisplayProps {
  linkStatus: "active" | "revoked";
  verificationLink: string;
}

export const VerificationLinkDisplay = ({ 
  linkStatus,
  verificationLink 
}: VerificationLinkDisplayProps) => {
  const [isLinkCollapsibleOpen, setIsLinkCollapsibleOpen] = useState(false);
  const { toast } = useToast();
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationLink);
    toast({
      title: "Copied!",
      description: "Verification link copied to clipboard",
    });
  };
  
  const handleDownloadQR = () => {
    const qrCodeImage = document.querySelector(".collapsible-qr-code") as HTMLImageElement;
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
  
  if (linkStatus !== "active") {
    return (
      <p className="mt-2 text-sm text-verify-mediumGray">
        No active verification link available. Please generate a new link.
      </p>
    );
  }
  
  return (
    <div className="mt-2">
      <Collapsible
        open={isLinkCollapsibleOpen}
        onOpenChange={setIsLinkCollapsibleOpen}
        className="w-full"
      >
        <div className="flex items-center">
          <CollapsibleTrigger className="flex items-center text-sm text-verify-green hover:text-verify-green/80 font-medium">
            {isLinkCollapsibleOpen ? (
              <ChevronUp className="h-4 w-4 mr-1" />
            ) : (
              <ChevronDown className="h-4 w-4 mr-1" />
            )}
            View current link & QR code
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-3 space-y-4">
          <div className="rounded-md border border-gray-200 bg-gray-50 p-4 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-verify-darkGray">Verification Link</p>
              <div className="flex items-center">
                <div className="flex-grow overflow-hidden bg-white border border-gray-200 rounded-l-md">
                  <p className="p-2 text-sm font-mono truncate">{verificationLink}</p>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-verify-green text-white rounded-r-md hover:bg-verify-green/90 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-verify-darkGray">Verification QR Code</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1" 
                  onClick={handleDownloadQR}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="text-xs">Download</span>
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="bg-white p-3 border border-gray-200 rounded-lg">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://verify-identity.innovatrics.com/demo-iframe" 
                    alt="QR Code" 
                    className="w-[150px] h-[150px] collapsible-qr-code" 
                  />
                </div>
              </div>
            </div>
            
            <p className="text-xs text-verify-mediumGray italic">
              You can re-use this link or QR code on other websites or channels until it is revoked.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
