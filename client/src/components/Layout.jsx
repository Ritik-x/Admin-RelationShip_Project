import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Agents", href: "/agents", icon: "👥" },
    { name: "Upload", href: "/upload", icon: "📤" },
    { name: "Tasks", href: "/tasks", icon: "📋" },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar
        navigation={navigation}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPath={location.pathname}
      />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Header user={user} logout={logout} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
