
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Line, ResponsiveContainer, Legend } from "recharts";

const Reports = () => {
  // In a real app, this data would come from an API
  const monthlyData = [
    { name: "Jan", verifications: 65 },
    { name: "Feb", verifications: 59 },
    { name: "Mar", verifications: 80 },
    { name: "Apr", verifications: 81 },
    { name: "May", verifications: 56 },
    { name: "Jun", verifications: 55 },
    { name: "Jul", verifications: 40 },
    { name: "Aug", verifications: 70 },
    { name: "Sep", verifications: 90 },
    { name: "Oct", verifications: 75 },
    { name: "Nov", verifications: 62 },
    { name: "Dec", verifications: 85 },
  ];

  const statusData = [
    { name: "Verified", value: 85 },
    { name: "Rejected", value: 10 },
    { name: "Pending", value: 5 },
  ];

  const dailyData = [
    { name: "Mon", completed: 12, rejected: 2 },
    { name: "Tue", completed: 19, rejected: 3 },
    { name: "Wed", completed: 15, rejected: 1 },
    { name: "Thu", completed: 20, rejected: 4 },
    { name: "Fri", completed: 18, rejected: 2 },
    { name: "Sat", completed: 8, rejected: 1 },
    { name: "Sun", completed: 5, rejected: 0 },
  ];

  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">Reports</h1>
        <p className="text-verify-mediumGray">View verification statistics and insights</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="verifications" fill="#2ECC71" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completed" stroke="#2ECC71" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="rejected" stroke="#FF5252" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Verification Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around p-4">
              {statusData.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {item.value}%
                  </div>
                  <div className={`text-sm ${
                    item.name === "Verified"
                      ? "text-green-600"
                      : item.name === "Rejected"
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}>
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
