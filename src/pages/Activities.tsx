
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const Activities = () => {
  // In a real app, this data would come from an API
  const activities = [
    {
      id: 1,
      type: "verification",
      status: "completed",
      date: "2023-09-15T10:30:00Z",
      referenceId: "VER-1234567890",
    },
    {
      id: 2,
      type: "verification",
      status: "rejected",
      date: "2023-09-14T14:22:00Z",
      referenceId: "VER-1234567891",
    },
    {
      id: 3,
      type: "verification",
      status: "pending",
      date: "2023-09-14T09:45:00Z",
      referenceId: "VER-1234567892",
    },
    {
      id: 4,
      type: "verification",
      status: "completed",
      date: "2023-09-13T16:17:00Z",
      referenceId: "VER-1234567893",
    },
    {
      id: 5,
      type: "verification",
      status: "completed",
      date: "2023-09-12T11:05:00Z",
      referenceId: "VER-1234567894",
    },
    // Additional activities that will be hidden initially
    {
      id: 6,
      type: "verification",
      status: "completed",
      date: "2023-09-11T15:30:00Z",
      referenceId: "VER-1234567895",
    },
    {
      id: 7,
      type: "verification",
      status: "rejected",
      date: "2023-09-10T13:25:00Z",
      referenceId: "VER-1234567896",
    },
    {
      id: 8,
      type: "verification",
      status: "pending",
      date: "2023-09-09T09:45:00Z",
      referenceId: "VER-1234567897",
    },
    {
      id: 9,
      type: "verification",
      status: "completed",
      date: "2023-09-08T17:20:00Z",
      referenceId: "VER-1234567898",
    },
    {
      id: 10,
      type: "verification",
      status: "completed",
      date: "2023-09-07T14:10:00Z",
      referenceId: "VER-1234567899",
    },
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const visibleActivities = isExpanded ? activities : activities.slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="p-6 h-full">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-verify-darkGray">Recent Activities</h1>
        <p className="text-verify-mediumGray">Track verification attempts and status</p>
      </header>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Verification Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {visibleActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(activity.status)}
                          <span className="ml-2 capitalize text-sm text-verify-darkGray">
                            {activity.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-verify-darkGray">
                          {activity.referenceId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-verify-mediumGray">
                          {formatDate(activity.date)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {activities.length > 5 && (
                <div className="flex justify-center p-3 bg-gray-50 border-t">
                  <CollapsibleTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center text-sm text-verify-mediumGray"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Show less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          See more
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              )}
            </div>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activities;
