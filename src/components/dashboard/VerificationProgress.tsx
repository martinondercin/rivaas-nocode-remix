
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
  const hasReachedLimit = currentVerifications >= 150;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm items-center">
        <div className="flex items-center gap-2">
          <span>{currentVerifications} verifications performed</span>
          {hasReachedLimit ? (
            <span className="inline-flex items-center bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium gap-1">
              <XCircle className="h-3 w-3" />
              Limit Achieved
            </span>
          ) : linkStatus === "active" ? (
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
      
      {hasReachedLimit && (
        <div className="mt-4 space-y-3">
          <div className="text-lg font-semibold text-verify-green">
            You've successfully completed 150 identity verifications with our service.
          </div>
          <div className="text-sm text-verify-mediumGray">
            Your free trial has reached its limit, but we'd love to help you continue growing. Let's discuss a custom plan that fits your verification volume and business needs.{" "}
            <a 
              href="https://www.innovatrics.com/contact/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-verify-green hover:underline font-medium"
            >
              Contact Us
            </a>
          </div>
        </div>
      )}
      
      {!hasReachedLimit && (
        <Alert className="mt-3 bg-verify-lightGray border-verify-mediumGray/20">
          <AlertDescription className="text-xs text-verify-mediumGray">
            Once the maximum number of free verifications is achieved, link and QR code will be deactivated. 
            In order to continue with this service, please{" "}
            <a 
              href="https://www.innovatrics.com/contact/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-verify-green hover:underline font-medium"
            >
              contact us
            </a>.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
