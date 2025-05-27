
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Info, FileText, AlertTriangle, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ApiCredentialsModal } from "./ApiCredentialsModal";

interface UrlValidationState {
  isValid: boolean;
  isValidating: boolean;
  message?: string;
}

interface ApiUrls {
  verifiedUrl: string;
  rejectedUrl: string;
  unverifiedUrl: string;
  callbackUrl: string;
  logoUrl: string;
}

export const UnifiedApiIntegration = () => {
  const { toast } = useToast();
  
  const [urls, setUrls] = useState<ApiUrls>({
    verifiedUrl: "",
    rejectedUrl: "",
    unverifiedUrl: "",
    callbackUrl: "",
    logoUrl: ""
  });

  const [validationStates, setValidationStates] = useState<Record<keyof ApiUrls, UrlValidationState>>({
    verifiedUrl: { isValid: false, isValidating: false },
    rejectedUrl: { isValid: false, isValidating: false },
    unverifiedUrl: { isValid: false, isValidating: false },
    callbackUrl: { isValid: false, isValidating: false },
    logoUrl: { isValid: false, isValidating: false }
  });

  const [isGeneratingCredentials, setIsGeneratingCredentials] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    apiKey: string;
    apiSecret: string;
    generatedAt: string;
  } | null>(null);

  const urlFieldConfig = {
    verifiedUrl: {
      label: "Verified URL",
      placeholder: "https://yourdomain.com/verification/success",
      tooltip: "Endpoint where users are redirected after successful identity verification"
    },
    rejectedUrl: {
      label: "Rejected URL", 
      placeholder: "https://yourdomain.com/verification/failed",
      tooltip: "Endpoint where users are redirected when verification fails or is rejected"
    },
    unverifiedUrl: {
      label: "Unverified URL",
      placeholder: "https://yourdomain.com/verification/pending", 
      tooltip: "Endpoint where users are redirected when verification is pending or incomplete"
    },
    callbackUrl: {
      label: "Callback URL",
      placeholder: "https://yourdomain.com/api/webhook/verification",
      tooltip: "Server-to-server endpoint for receiving verification status updates and results"
    },
    logoUrl: {
      label: "Logo URL",
      placeholder: "https://yourdomain.com/assets/logo.png",
      tooltip: "Your company logo displayed during the verification process (recommended: 200x50px PNG)"
    }
  };

  const validateUrl = async (url: string, field: keyof ApiUrls) => {
    if (!url) {
      setValidationStates(prev => ({
        ...prev,
        [field]: { isValid: false, isValidating: false, message: "URL is required" }
      }));
      return;
    }

    if (!url.startsWith('https://')) {
      setValidationStates(prev => ({
        ...prev,
        [field]: { isValid: false, isValidating: false, message: "Must use HTTPS protocol" }
      }));
      return;
    }

    setValidationStates(prev => ({
      ...prev,
      [field]: { isValid: false, isValidating: true, message: "Validating..." }
    }));

    try {
      // Simulate URL validation (in real implementation, this would check endpoint accessibility)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setValidationStates(prev => ({
        ...prev,
        [field]: { isValid: true, isValidating: false, message: "URL validated successfully" }
      }));
    } catch {
      setValidationStates(prev => ({
        ...prev,
        [field]: { isValid: false, isValidating: false, message: "Unable to validate URL endpoint" }
      }));
    }
  };

  const handleUrlChange = (field: keyof ApiUrls, value: string) => {
    setUrls(prev => ({ ...prev, [field]: value }));
    
    // Reset validation state when URL changes
    setValidationStates(prev => ({
      ...prev,
      [field]: { isValid: false, isValidating: false }
    }));

    // Trigger validation after user stops typing (debounced)
    const timeoutId = setTimeout(() => {
      if (value) {
        validateUrl(value, field);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const allUrlsValid = Object.values(validationStates).every(state => state.isValid);
  const anyUrlValidating = Object.values(validationStates).some(state => state.isValidating);

  const handleGenerateCredentials = async () => {
    if (!allUrlsValid) {
      toast({
        title: "Validation Required",
        description: "Please ensure all URLs are valid before generating API credentials.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingCredentials(true);

    try {
      // Simulate credential generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const credentials = {
        apiKey: "ik_live_" + Math.random().toString(36).substring(2, 20),
        apiSecret: "sk_" + Math.random().toString(36).substring(2, 30) + Math.random().toString(36).substring(2, 30),
        generatedAt: new Date().toISOString()
      };

      setGeneratedCredentials(credentials);
      setShowCredentialsModal(true);
      
      toast({
        title: "API Credentials Generated",
        description: "Your secure API credentials have been created successfully.",
      });
    } catch {
      toast({
        title: "Generation Failed",
        description: "Unable to generate API credentials. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingCredentials(false);
    }
  };

  const renderValidationIcon = (field: keyof ApiUrls) => {
    const state = validationStates[field];
    
    if (state.isValidating) {
      return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
    }
    
    if (state.isValid) {
      return <Check className="h-4 w-4 text-green-500" />;
    }
    
    if (urls[field] && !state.isValid) {
      return <X className="h-4 w-4 text-red-500" />;
    }
    
    return null;
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            API Integration Setup
          </CardTitle>
          <p className="text-sm text-verify-mediumGray">
            Configure your integration endpoints and generate secure API credentials for identity verification
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {(Object.keys(urlFieldConfig) as Array<keyof ApiUrls>).map((field) => {
              const config = urlFieldConfig[field];
              const state = validationStates[field];
              
              return (
                <div key={field} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={field}>{config.label}</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-verify-mediumGray" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{config.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="relative">
                    <Input
                      id={field}
                      type="url"
                      placeholder={config.placeholder}
                      value={urls[field]}
                      onChange={(e) => handleUrlChange(field, e.target.value)}
                      className={`pr-10 ${
                        state.isValid ? 'border-green-500' : 
                        urls[field] && !state.isValid && !state.isValidating ? 'border-red-500' : ''
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {renderValidationIcon(field)}
                    </div>
                  </div>
                  {state.message && (
                    <p className={`text-xs ${
                      state.isValid ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {state.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-verify-darkGray">API Credentials</h4>
                <p className="text-sm text-verify-mediumGray">
                  Generate secure API keys after URL validation
                </p>
              </div>
              
              <Button
                onClick={handleGenerateCredentials}
                disabled={!allUrlsValid || anyUrlValidating || isGeneratingCredentials}
                className="bg-[#0D1941] hover:bg-[#0D1941]/90 text-white"
              >
                {isGeneratingCredentials ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate API Credentials"
                )}
              </Button>
            </div>
            
            {!allUrlsValid && (
              <div className="mt-3 flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <p className="text-xs">
                  Complete URL validation to enable credential generation
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ApiCredentialsModal
        open={showCredentialsModal}
        onOpenChange={setShowCredentialsModal}
        credentials={generatedCredentials}
        configuredUrls={urls}
      />
    </TooltipProvider>
  );
};
