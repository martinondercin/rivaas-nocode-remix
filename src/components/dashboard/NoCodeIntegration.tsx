
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { QrCodeDialog } from "./QrCodeDialog";

export const NoCodeIntegration = () => {
  const [showQrCode, setShowQrCode] = useState(false);
  const verificationLink = "https://verify-identity.innovatrics.com/demo-iframe";

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
            
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setShowQrCode(true)}
                className="bg-verify-green hover:bg-verify-green/90 text-white"
              >
                Generate Link
              </Button>
              
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
      />
    </>
  );
};
