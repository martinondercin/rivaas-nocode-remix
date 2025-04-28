
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Receipt, History, CreditCardIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { PaymentMethodCard } from "@/components/billing/PaymentMethodCard";
import { InvoiceList } from "@/components/billing/InvoiceList";
import { UsageStats } from "@/components/billing/UsageStats";
import { AddPaymentMethodDialog } from "@/components/billing/AddPaymentMethodDialog";
import { StripePaymentForm } from "@/components/billing/StripePaymentForm";

const Billing = () => {
  const { toast } = useToast();
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [showStripePaymentForm, setShowStripePaymentForm] = useState(false);
  const [accountType, setAccountType] = useState<"prepaid" | "postpaid">("prepaid");
  const [currentBalance, setCurrentBalance] = useState(250);
  
  const handleAccountTypeChange = (type: "prepaid" | "postpaid") => {
    setAccountType(type);
    toast({
      title: `Switched to ${type} billing`,
      description: `Your account will now use ${type} billing.`,
    });
  };

  const handleAddFunds = () => {
    setShowStripePaymentForm(true);
  };

  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">Billing & Payments</h1>
        <p className="text-verify-mediumGray">Manage your payment methods and invoices</p>
      </header>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Account Balance Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-verify-green" />
              Account Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-verify-darkGray">${currentBalance.toFixed(2)}</div>
            <p className="text-verify-mediumGray text-sm">
              {accountType === "prepaid" 
                ? "Prepaid balance for verification services" 
                : "Current charges for this billing period"}
            </p>
          </CardContent>
          <CardFooter>
            {accountType === "prepaid" ? (
              <Button 
                onClick={handleAddFunds}
                className="w-full bg-verify-green hover:bg-verify-green/90"
              >
                Add Funds
              </Button>
            ) : (
              <div className="text-sm text-verify-mediumGray">Next invoice due in 15 days</div>
            )}
          </CardFooter>
        </Card>
        
        {/* Account Type Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <CreditCardIcon className="mr-2 h-5 w-5 text-verify-green" />
              Billing Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-2">
              <Badge variant={accountType === "prepaid" ? "default" : "outline"} className={accountType === "prepaid" ? "bg-verify-green" : ""}>Prepaid</Badge>
              <Badge variant={accountType === "postpaid" ? "default" : "outline"} className={accountType === "postpaid" ? "bg-verify-green" : ""}>Postpaid</Badge>
            </div>
            <p className="text-verify-mediumGray text-sm">
              {accountType === "prepaid" 
                ? "Pay in advance and use services until your balance is depleted" 
                : "Pay after usage based on monthly invoices"}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant={accountType === "prepaid" ? "default" : "outline"}
              size="sm"
              onClick={() => handleAccountTypeChange("prepaid")}
              className={accountType === "prepaid" ? "bg-verify-green hover:bg-verify-green/90" : ""}
            >
              Switch to Prepaid
            </Button>
            <Button 
              variant={accountType === "postpaid" ? "default" : "outline"}
              size="sm"
              onClick={() => handleAccountTypeChange("postpaid")}
              className={accountType === "postpaid" ? "bg-verify-green hover:bg-verify-green/90" : ""}
            >
              Switch to Postpaid
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
          {/* Removed the CardFooter with the "View Detailed Usage" button */}
        </Card>
      </div>
      
      <Tabs defaultValue="payment-methods" className="space-y-4">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-2">
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods
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
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices & Receipts</CardTitle>
              <CardDescription>
                View and download your invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
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
