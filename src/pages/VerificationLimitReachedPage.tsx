
import React from "react";
import { XCircle } from "lucide-react";

const VerificationLimitReachedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <div className="mx-auto mb-4 text-red-600 flex justify-center">
          <XCircle className="h-16 w-16" />
        </div>

        <h1 className="text-2xl font-bold text-verify-darkGray mb-2">
          Unable to Start Verification
        </h1>

        <p className="text-verify-mediumGray mb-6">
          Sorry, we can't start your identity verification at this time. 
          The maximum number of verifications for this service has been reached.
        </p>

        <div className="bg-verify-lightGray p-4 rounded-md border border-gray-200 mb-4">
          <p className="text-sm text-verify-mediumGray">
            Please contact the administrator or support team of the website or service 
            where you initiated this verification process for further assistance.
          </p>
        </div>

        <p className="text-xs text-verify-mediumGray italic">
          If you believe this is an error, please try again later or contact 
          the support for the service you were trying to access.
        </p>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-xs text-verify-mediumGray">
          Powered by Innovatrics
        </p>
      </div>
    </div>
  );
};

export default VerificationLimitReachedPage;
