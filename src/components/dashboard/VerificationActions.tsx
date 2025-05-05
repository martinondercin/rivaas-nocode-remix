
import { Button } from "@/components/ui/button";
import { Link2, XCircle, Info } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VerificationActionsProps {
  linkStatus: "active" | "revoked";
  onGenerateLink: () => void;
  onRevokeLink: () => void;
}

export const VerificationActions = ({
  linkStatus,
  onGenerateLink,
  onRevokeLink,
}: VerificationActionsProps) => {
  return (
    <div className="flex items-center gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button 
                onClick={onGenerateLink}
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
          onClick={onRevokeLink}
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
  );
};
