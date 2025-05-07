
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PrivacyPolicyDialog } from "@/components/ui/privacy-policy-dialog";

interface PrivacyPolicyButtonProps {
  className?: string;
}

export function PrivacyPolicyButton({ className }: PrivacyPolicyButtonProps) {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  
  return (
    <>
      <Button
        variant="link"
        onClick={() => setShowPrivacyPolicy(true)}
        className={className}
      >
        Privacy Policy
      </Button>
      
      <PrivacyPolicyDialog 
        open={showPrivacyPolicy} 
        onOpenChange={setShowPrivacyPolicy} 
      />
    </>
  );
}
