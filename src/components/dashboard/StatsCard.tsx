
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

export const StatsCard = ({ title, value, description, icon: Icon }: StatsCardProps) => {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-verify-mediumGray">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-md bg-verify-lightGray flex items-center justify-center">
          <Icon className="h-4 w-4 text-verify-darkGray" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-verify-darkGray">{value}</div>
        <p className="text-xs text-verify-mediumGray mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
