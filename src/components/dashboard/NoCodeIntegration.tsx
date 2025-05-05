import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Link2, CheckCircle, XCircle, ChevronDown, ChevronUp, Copy, Download } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { QrCodeDialog } from "./QrCodeDialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const NoCodeIntegration = () => {
  const [showQrCode, setShowQrCode] = useState(false);
  const verificationLink = "https://verify-identity.innovatrics.com/demo-iframe";
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [linkStatus, setLinkStatus] = useState<"active" | "revoked">("active");
  const [isLinkCollapsibleOpen, setIsLinkCollapsibleOpen] = useState(false);
  const { toast } = useToast();
  
  // Set maximum number of verifications to 150
  const maxVerifications = 150;
  const currentVerifications = 85; // Current number of verifications
  const percentComplete = (currentVerifications / maxVerifications) * 100;
  
  const handleGenerateLink = () => {
    setLinkStatus("active");
    setShowQrCode(true);
    toast({
      title: "Link Generated",
      description: "Your verification link has been successfully generated.",
    });
  };
  
  const handleRevokeLinkConfirm = () => {
    setLinkStatus("revoked");
    setShowRevokeDialog(false);
    setIsLinkCollapsibleOpen(false); // Close collapsible when link is revoked
    toast({
      title: "Link Revoked",
      description: "Your verification link has been successfully revoked.",
      variant: "destructive",
    });
  };
  
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
  
  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-verify-darkGray">Static Link & QR Code</h3>
              <p className="text-sm text-verify-mediumGray mt-1">
                Generate a static link and QR code for customer identity verification without technical setup.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center gap-2">
                  <span>{currentVerifications} verifications performed</span>
                  {linkStatus === "active" ? (
                    <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium gap-1">
                      <XCircle className="h-3 w-3" />
                      Revoked
                    </span>
                  )}
                </div>
                <span className="font-medium">{maxVerifications} free limit</span>
              </div>
              <Progress value={percentComplete} className="h-2" />
              
              <Alert className="mt-3 bg-verify-lightGray border-verify-mediumGray/20">
                <AlertDescription className="text-xs text-verify-mediumGray">
                  Once the maximum number of free verifications is achieved, link and QR code will be deactivated. 
                  In order to continue with this service, please top up your account balance or switch to API integration.
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button 
                        onClick={handleGenerateLink}
                        className="bg-verify-green hover:bg-verify-green/90 text-white"
                        disabled={linkStatus === "active"}
                      >
                        <Link2 className="mr-1.5 h-4 w-4" />
                        Generate Link
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {linkStatus === "active" && (
                    <TooltipContent>
                      <p>Revoke current link before generating a new one</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              
              {linkStatus === "active" && (
                <Button 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 bg-red-50"
                  onClick={() => setShowRevokeDialog(true)}
                >
                  <XCircle className="mr-1.5 h-4 w-4" />
                  Revoke Link
                </Button>
              )}
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-verify-mediumGray/30 text-verify-mediumGray hover:bg-verify-lightGray"
                  >
                    <Info className="mr-2 h-4 w-4" />
                    <span>Learn More</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-verify-darkGray">No-Code Integration</h3>
                    <div className="space-y-2">
                      <h4 className="font-medium">Simplicity First</h4>
                      <p className="text-sm text-verify-mediumGray">
                        Our no-code solution allows you to implement identity verification without writing a single line of code.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Key Benefits:</h4>
                      <ul className="list-disc pl-5 text-sm text-verify-mediumGray space-y-1">
                        <li>Instant setup with no technical knowledge required</li>
                        <li>Share links via email, SMS or embed in your website</li>
                        <li>QR code support for mobile verification</li>
                        <li>Perfect for small businesses and quick implementations</li>
                      </ul>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {/* Collapsible link and QR code section */}
            {linkStatus === "active" ? (
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
            ) : (
              <p className="mt-2 text-sm text-verify-mediumGray">
                No active verification link available. Please generate a new link.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <QrCodeDialog 
        open={showQrCode} 
        onOpenChange={setShowQrCode} 
        verificationLink={verificationLink} 
        isRevoked={linkStatus === "revoked"}
      />
      
      <AlertDialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Verification Link</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke this link? It cannot be used anymore.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleRevokeLinkConfirm}
            >
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
