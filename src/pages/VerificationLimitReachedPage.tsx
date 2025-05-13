
import React from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const VerificationLimitReachedPage = () => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    // Navigate back or to a safe fallback route
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4 md:p-8">
      <div className="mb-8 p-4">
        <p className="text-xl font-bold" style={{ height: '25px' }}>
          <span className="text-black">YOUR</span>
          <span className="text-verify-green">LOGO</span>
        </p>
      </div>
      
      <div className="flex-grow flex flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-sm border-0 bg-white relative">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={18} className="text-gray-500" />
          </button>
          
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Unable to Start Verification
              </h1>
              
              <p className="text-gray-700 mb-2">
                Sorry, we can't start your identity verification at this time.
              </p>
              
              <p className="text-gray-700 mb-8">
                The maximum number of verifications for this service has been reached.
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md border border-green-100 mb-6">
              <p className="text-sm text-green-800">
                Please contact the administrator or support team of the website or service 
                where you initiated this verification process for further assistance.
              </p>
            </div>
            
            <p className="text-xs text-verify-mediumGray italic text-center mb-6">
              If you believe this is an error, please try again later or contact 
              the support for the service you were trying to access.
            </p>
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
