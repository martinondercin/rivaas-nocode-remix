
import React from "react";
import { AlertOctagon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const VerificationLimitReachedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 md:p-8">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="p-0">
          <div className="bg-verify-lightGray rounded-t-lg p-8 text-center">
            <div className="mx-auto mb-5 bg-red-100 rounded-full p-4 w-20 h-20 flex items-center justify-center">
              <AlertOctagon className="h-10 w-10 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-verify-darkGray mb-2">
              Unable to Start Verification
            </h1>
            
            <p className="text-verify-mediumGray mb-2">
              Sorry, we can't start your identity verification at this time.
            </p>
            <p className="text-verify-mediumGray font-medium">
              The maximum number of verifications for this service has been reached.
            </p>
          </div>
          
          <div className="p-6">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-6">
              <p className="text-sm text-blue-800">
                Please contact the administrator or support team of the website or service 
                where you initiated this verification process for further assistance.
              </p>
            </div>
            
            <p className="text-xs text-verify-mediumGray italic text-center">
              If you believe this is an error, please try again later or contact 
              the support for the service you were trying to access.
            </p>
          </div>
        </CardContent>
      </Card>
      
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
