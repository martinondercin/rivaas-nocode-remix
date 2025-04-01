
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Clock, FileText, Settings, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast({
      title: "Logged out successfully",
    });
    navigate("/login");
  };

  const navItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Recent Activities",
      path: "/dashboard/activities",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      name: "Reports",
      path: "/dashboard/reports",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white border-r border-gray-200 w-64 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="bg-verify-green rounded-md h-8 w-8 flex items-center justify-center text-white font-bold">IV</div>
          <span className="font-bold text-lg">VerifyID</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  location.pathname === item.path
                    ? "bg-verify-lightGray text-verify-darkGray font-medium"
                    : "text-verify-mediumGray hover:bg-verify-lightGray"
                } transition-colors`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-9 w-9 rounded-full bg-verify-lightGray flex items-center justify-center">
            <User className="h-5 w-5 text-verify-mediumGray" />
          </div>
          <div>
            <div className="text-sm font-medium">Demo Company</div>
            <div className="text-xs text-verify-mediumGray">admin@demo.com</div>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-verify-mediumGray hover:bg-verify-lightGray rounded-md transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};
