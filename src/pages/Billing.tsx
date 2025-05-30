
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, History } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PaymentMethodCard } from "@/components/billing/PaymentMethodCard";
import { UsageStats } from "@/components/billing/UsageStats";
import { AddPaymentMethodDialog } from "@/components/billing/AddPaymentMethodDialog";
import { StripePaymentForm } from "@/components/billing/StripePaymentForm";

const Billing = () => {
  const { toast } = useToast();
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [showStripePaymentForm, setShowStripePaymentForm] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(250);
  const [totalVerifications, setTotalVerifications] = useState(0);
  
  // Simulate verification cost tracking
  useEffect(() => {
    const verificationCost = 2.5; // $2.50 per verification
    const newBalance = Math.max(0, 250 - (totalVerifications * verificationCost));
    setCurrentBalance(newBalance);
  }, [totalVerifications]);

  // Simulate verification tracking (in real app, this would come from your verification service)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random verifications being processed
      if (Math.random() > 0.95) { // 5% chance every second
        setTotalVerifications(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleAddFunds = () => {
    setShowStripePaymentForm(true);
  };

  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">Billing & Payments</h1>
        <p className="text-verify-mediumGray">Manage your prepaid account and payment methods</p>
      </header>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Account Balance Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-verify-green" />
              Prepaid Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-verify-darkGray">${currentBalance.toFixed(2)}</div>
            <p className="text-verify-mediumGray text-sm">
              Available balance for verification services ($2.50 per verification)
            </p>
            <div className="mt-2 text-sm text-verify-mediumGray">
              Total verifications processed: <span className="font-semibold">{totalVerifications}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleAddFunds}
              className="w-full bg-verify-green hover:bg-verify-green/90"
            >
              Add Funds
            </Button>
          </CardFooter>
        </Card>
        
        {/* Usage Stats Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <History className="mr-2 h-5 w-5 text-verify-green" />
              Usage This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UsageStats />
          </CardContent>
        </Card>
      </div>
      
      {/* Payment Methods Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage your saved payment methods for adding funds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <PaymentMethodCard 
              type="visa"
              last4="4242"
              expiry="12/25"
              isDefault={true}
            />
            
            <PaymentMethodCard 
              type="mastercard"
              last4="8888"
              expiry="06/24"
              isDefault={false}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => setShowAddPaymentDialog(true)}
            className="bg-verify-green hover:bg-verify-green/90"
          >
            Add Payment Method
          </Button>
        </CardFooter>
      </Card>
      
      <AddPaymentMethodDialog 
        open={showAddPaymentDialog} 
        onOpenChange={setShowAddPaymentDialog} 
      />

      <StripePaymentForm
        open={showStripePaymentForm}
        onOpenChange={setShowStripePaymentForm}
        onSuccess={(amount: number) => {
          setCurrentBalance(prev => prev + amount);
          toast({
            title: "Payment successful",
            description: `$${amount.toFixed(2)} has been added to your balance.`,
          });
        }}
      />
    </div>
  );
};

export default Billing;
