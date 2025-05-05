
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Link2, CheckCircle, XCircle } from "lucide-react";
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

export const NoCodeIntegration = () => {
  const [showQrCode, setShowQrCode] = useState(false);
  const verificationLink = "https://verify-identity.innovatrics.com/demo-iframe";
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [linkStatus, setLinkStatus] = useState<"active" | "revoked">("active");
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
    toast({
      title: "Link Revoked",
      description: "Your verification link has been successfully revoked.",
      variant: "destructive",
    });
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
