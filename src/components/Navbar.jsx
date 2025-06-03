import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-xl font-bold text-indigo-600">
            CRM Dashboard
          </Link>
          <Link to="/create-campaign" className="text-gray-700 hover:text-indigo-600 font-medium">
            Create Campaign
          </Link>
          <Link to="/CampaignDeliveryLogs" className="text-gray-700 hover:text-indigo-600 font-medium">
            View Campaigns
          </Link>
          <Link to="/add-customers" className="text-gray-700 hover:text-indigo-600 font-medium">
            Add Customers
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <span className="text-sm text-gray-700">{user.name}</span>
              {user.image && (
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              )}
              <button
                onClick={handleLogout}
                className="ml-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
