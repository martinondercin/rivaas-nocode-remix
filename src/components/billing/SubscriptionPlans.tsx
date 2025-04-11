
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function SubscriptionPlans() {
  const { toast } = useToast();
  const [currentPlan, setCurrentPlan] = useState("standard");
  
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 199,
      description: "For small businesses starting with identity verification",
      features: [
        "Up to 100 verifications per month",
        "Basic identity verification",
        "Email support",
        "Standard SLA"
      ]
    },
    {
      id: "standard",
      name: "Standard",
      price: 499,
      description: "For growing businesses with moderate verification needs",
      features: [
        "Up to 500 verifications per month",
        "Advanced verification options",
        "Priority email & chat support",
        "Enhanced SLA with 4h response time"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 999,
      description: "For enterprises with high-volume verification requirements",
      features: [
        "Unlimited verifications",
        "Full verification suite with fraud detection",
        "24/7 dedicated support",
        "Custom SLA with 1h response time",
        "Dedicated account manager"
      ]
    }
  ];
  
  const handleSelectPlan = (planId: string) => {
    if (planId === currentPlan) return;
    
    toast({
      title: "Plan change requested",
      description: `You've requested to change to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan.`,
    });
    
    // In a real app, this would open a confirmation dialog and handle payment
    setCurrentPlan(planId);
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`${currentPlan === plan.id ? 'border-verify-green border-2' : 'border-gray-200'}`}
        >
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                {plan.name}
                {currentPlan === plan.id && (
                  <Badge className="ml-2 bg-verify-green">Current</Badge>
                )}
              </CardTitle>
            </div>
            <CardDescription>{plan.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              <span className="text-gray-500">/month</span>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 mr-2 text-verify-green" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full ${
                currentPlan === plan.id
                  ? "bg-gray-100 text-gray-600 cursor-default hover:bg-gray-100" 
                  : "bg-verify-green hover:bg-verify-green/90 text-white"
              }`}
              onClick={() => handleSelectPlan(plan.id)}
              disabled={currentPlan === plan.id}
            >
              {currentPlan === plan.id ? "Current Plan" : "Select Plan"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
