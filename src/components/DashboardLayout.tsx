
import { Navigate, Outlet, Link } from "react-router-dom";
import { DashboardSidebar } from "./DashboardSidebar";
import { Button } from "@/components/ui/button";

export const DashboardLayout = () => {
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 bg-white border-b border-gray-200">
          <Link to="/explore-solutions">
            <Button variant="ghost" size="sm" className="text-sm">
              Explore Solutions
            </Button>
          </Link>
        </div>
        <Outlet />
      </main>
    </div>
  );
};
