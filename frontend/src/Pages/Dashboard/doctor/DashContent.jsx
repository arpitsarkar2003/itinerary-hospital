import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  MessageSquareText,
  History,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  ChevronUp,
  Dot,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { MdSchedule, MdSupport } from "react-icons/md";

const DashContent = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState(null);

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Please log in to view your profile
      </div>
    );
  }

  const getLinkClass = (path, isNested = false) => {
    const isActive = location.pathname === path;
    return `flex items-center p-3 rounded-lg gap-3 cursor-pointer mb-2 transition-all duration-300 ease-in-out transform ${
      isActive
        ? "bg-orange-100 text-orange-600 font-medium"
        : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"
    } ${isNested ? "pl-10" : ""}`;
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const navItems = [
    { path: "/doctor-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    {
      icon: Users,
      label: "Appointments",
      subItems: [
        { path: "/doctor-dashboard/appointments/manage-appointments",icon: Dot, label: "Manage Appointments" },
        { path: "/doctor-dashboard/appointments/view-appointments",icon: Dot, label: "View Appointments" },
      ],
    },
    { path: "/doctor-dashboard/schedules", icon: MdSchedule, label: "Schedules" },
    { path: "/doctor-dashboard/messages", icon: MessageSquareText, label: "Messages" },
    { path: "/doctor-dashboard/histories", icon: History, label: "History" },
    
  ];

  const bottomNavItems = [
    { path: "/doctor-dashboard/notifications", icon: Bell, label: "Notifications" },
    { path: "/doctor-dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-white p-6 h-full w-80 sm:w-72 flex flex-col border-r border-gray-200">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <img
          className="rounded-full w-24 h-24 border-4 border-orange-200 shadow-lg object-cover"
          src={user.Image || "https://via.placeholder.com/150"}
          alt="Doctor Profile"
        />
        <h2 className="text-xl font-semibold mt-4 text-gray-800">
          {user.FirstName} {user.LastName}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{user.specialization || "Doctor"}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow overflow-y-auto text-base">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.label)}
                    className={`w-full ${getLinkClass("")}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="flex-grow text-left">{item.label}</span>
                    {expandedSection === item.label ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  {expandedSection === item.label && (
                    <ul className="mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <Link to={subItem.path} className={getLinkClass(subItem.path, true)}>
                          <subItem.icon className="w-5 h-5" />
                            <span className="flex-grow">{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link to={item.path} className={getLinkClass(item.path)}>
                  <item.icon className="w-4 h-4" />
                  <span className="flex-grow">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <ul className="space-y-1 mb-4">
          {bottomNavItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={getLinkClass(item.path)}>
                <item.icon className="w-5 h-5" />
                <span className="flex-grow">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashContent;
