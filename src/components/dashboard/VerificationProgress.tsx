
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";

interface VerificationProgressProps {
  currentVerifications: number;
  maxVerifications: number;
  linkStatus: "active" | "revoked";
}

export const VerificationProgress = ({
  currentVerifications,
  maxVerifications,
  linkStatus,
}: VerificationProgressProps) => {
  const percentComplete = (currentVerifications / maxVerifications) * 100;
  
  return (
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
  );
};
