import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { QrCodeDialog } from "./QrCodeDialog";
import { VerificationProgress } from "./VerificationProgress";
import { VerificationActions } from "./VerificationActions";
import { VerificationLinkDisplay } from "./VerificationLinkDisplay";
import { CheckCircle, XCircle } from "lucide-react";
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

interface NoCodeIntegrationProps {
  currentVerifications: number;
}

export const NoCodeIntegration = ({ currentVerifications }: NoCodeIntegrationProps) => {
  const [showQrCode, setShowQrCode] = useState(false);
  const verificationLink = "https://verify-identity.innovatrics.com/demo-iframe";
  const [showRevokeDialog, setShowRevokeDialog] = useState(false);
  const [linkStatus, setLinkStatus] = useState<"active" | "revoked">("active");
  const { toast } = useToast();
  
  // Set maximum number of verifications to 150
  const maxVerifications = 150;
  
  const handleGenerateLink = () => {
    setLinkStatus("active");
    setShowQrCode(true);
    toast({
      title: "Link Generated",
      description: "Your verification link has been successfully generated.",
    });
  };
  
  const handleOpenRevokeDialog = () => {
    setShowRevokeDialog(true);
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
            
            <VerificationProgress 
              currentVerifications={currentVerifications}
              maxVerifications={maxVerifications}
              linkStatus={linkStatus}
            />
            
            <VerificationActions 
              linkStatus={linkStatus}
              onGenerateLink={handleGenerateLink}
              onRevokeLink={handleOpenRevokeDialog}
              currentVerifications={currentVerifications}
            />
            
            <VerificationLinkDisplay 
              linkStatus={linkStatus}
              verificationLink={verificationLink}
            />
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
