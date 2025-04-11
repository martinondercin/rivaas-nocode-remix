
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export function UsageStats() {
  const data = [
    { name: "Apr 1", verifications: 12 },
    { name: "Apr 5", verifications: 19 },
    { name: "Apr 10", verifications: 25 },
    { name: "Apr 15", verifications: 16 },
    { name: "Apr 20", verifications: 23 },
    { name: "Apr 25", verifications: 18 },
    { name: "May 1", verifications: 14 },
  ];

  const totalVerifications = data.reduce((sum, item) => sum + item.verifications, 0);
  const estimatedCost = totalVerifications * 2.5; // Assume $2.50 per verification
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <div className="text-2xl font-bold">{totalVerifications}</div>
        <div className="text-verify-mediumGray text-sm">Verifications</div>
      </div>
      
      <div className="text-sm text-verify-mediumGray">
        Estimated cost: <span className="font-semibold">${estimatedCost.toFixed(2)}</span>
      </div>
      
      <div className="h-16 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Bar dataKey="verifications" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
