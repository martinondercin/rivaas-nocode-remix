
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";

// Initialize Stripe - replace with your publishable key
const stripePromise = loadStripe("pk_test_51JHThESCe4HMVGax9qCmEGBzZDZlknSxXS8NpGvOjNuGBR4ZGnOjcV0XxOCbwEHk3F2Vwya6dGfYhvlaZASpmCCu00cSi7bd0d");

interface StripePaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (amount: number) => void;
}

export function StripePaymentForm({ open, onOpenChange, onSuccess }: StripePaymentFormProps) {
  const { toast } = useToast();
  const [amount, setAmount] = useState<number>(100);
  const [selectedAmount, setSelectedAmount] = useState<string>("100");
  const [loading, setLoading] = useState(false);
  
  const predefinedAmounts = [
    { value: "50", label: "$50" },
    { value: "100", label: "$100" },
    { value: "200", label: "$200" },
    { value: "custom", label: "Custom amount" },
  ];
  
  const handleAmountChange = (value: string) => {
    setSelectedAmount(value);
    if (value !== "custom") {
      setAmount(parseInt(value, 10));
    }
  };
  
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value ? parseFloat(value) : 0;
    setAmount(numericValue);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      // In a real implementation, this would create a payment intent via Supabase Edge Function
      // const { data, error } = await supabase.functions.invoke("create-payment", {
      //   body: { amount: amount * 100 }, // Convert to cents for Stripe
      // });
      
      // if (error) throw error;
      
      // Mock successful payment for demo purposes
      setTimeout(() => {
        setLoading(false);
        onSuccess(amount);
        onOpenChange(false);
        
        // Reset form state
        setSelectedAmount("100");
        setAmount(100);
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds to Your Account</DialogTitle>
          <DialogDescription>
            Choose an amount to add to your prepaid balance.
          </DialogDescription>
        </DialogHeader>
        
        <Elements stripe={stripePromise}>
          <form onSubmit={handlePayment}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Select Amount</Label>
                <RadioGroup 
                  value={selectedAmount} 
                  onValueChange={handleAmountChange}
                  className="grid grid-cols-2 gap-2"
                >
                  {predefinedAmounts.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`amount-${option.value}`} />
                      <Label htmlFor={`amount-${option.value}`}>{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {selectedAmount === "custom" && (
                <div className="grid gap-2">
                  <Label htmlFor="custom-amount">Enter Amount ($)</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleCustomAmountChange}
                  />
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="total">Total to Add</Label>
                <div className="text-2xl font-bold">${amount.toFixed(2)}</div>
              </div>
              
              <div className="border p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500 mb-2">Payment methods:</p>
                <div className="flex gap-2">
                  <div className="border rounded p-1 flex items-center justify-center">
                    <span className="font-bold text-blue-600">Visa</span>
                  </div>
                  <div className="border rounded p-1 flex items-center justify-center">
                    <span className="font-bold text-orange-500">Master</span>
                  </div>
                  <div className="border rounded p-1 flex items-center justify-center">
                    <span className="font-bold">ApplePay</span>
                  </div>
                  <div className="border rounded p-1 flex items-center justify-center">
                    <span className="font-bold text-blue-500">G Pay</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Secure payment processing by Stripe
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-verify-green hover:bg-verify-green/90"
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
              </Button>
            </DialogFooter>
          </form>
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
