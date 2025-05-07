
import React from "react";
import { AlertOctagon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const VerificationLimitReachedPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4 md:p-8">
      <div className="mb-8 p-4">
        <p className="text-xl font-bold">
          <span className="text-black">YOUR</span>
          <span className="text-verify-green">LOGO</span>
        </p>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-sm border-0 bg-white">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Unable to Start Verification
              </h1>
              
              <p className="text-gray-700 mb-2">
                Unable to verify your identity. The maximum number of verifications 
                for this service has been reached.
              </p>
              
              <p className="text-gray-500 text-sm mb-8">
                (Verification Limit Reached)
              </p>
            </div>
            
            <Button 
              className="w-full bg-verify-green hover:bg-verify-green/90"
              onClick={() => window.history.back()}
            >
              Return to previous page
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8">
        <Separator className="mb-4 w-32 mx-auto bg-gray-200" />
        <p className="text-xs text-verify-mediumGray text-center">
          Powered by Innovatrics
        </p>
      </div>
    </div>
  );
};

export default VerificationLimitReachedPage;
