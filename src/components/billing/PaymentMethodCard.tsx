
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, MoreVertical, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

type PaymentMethodCardProps = {
  type: "visa" | "mastercard" | "amex" | "paypal";
  last4: string;
  expiry: string;
  isDefault: boolean;
};

export function PaymentMethodCard({ 
  type, 
  last4, 
  expiry, 
  isDefault 
}: PaymentMethodCardProps) {
  
  const getCardIcon = () => {
    // In a real app, you would use actual card brand logos
    switch (type) {
      case "visa":
        return "V";
      case "mastercard":
        return "M";
      case "amex":
        return "A";
      case "paypal":
        return "P";
      default:
        return "C";
    }
  };
  
  const getBrandColor = () => {
    switch (type) {
      case "visa":
        return "bg-blue-500 text-white";
      case "mastercard":
        return "bg-orange-500 text-white";
      case "amex":
        return "bg-indigo-500 text-white";
      case "paypal":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="p-4 flex items-center justify-between border border-gray-200">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-md flex items-center justify-center ${getBrandColor()}`}>
          {getCardIcon()}
        </div>
        <div className="flex flex-col">
          <div className="font-medium">
            {type.charAt(0).toUpperCase() + type.slice(1)} •••• {last4}
            {isDefault && (
              <Badge className="ml-2 bg-verify-green text-white">Default</Badge>
            )}
          </div>
          <div className="text-sm text-gray-500">Expires {expiry}</div>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isDefault && <DropdownMenuItem><Check className="mr-2 h-4 w-4" />Set as default</DropdownMenuItem>}
          <DropdownMenuItem>Edit details</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}
