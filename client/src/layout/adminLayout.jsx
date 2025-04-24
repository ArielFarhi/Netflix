import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Authentication.jsx";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { signOutUser } = useUserAuth();

  const handleLogout = () => {
    signOutUser();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-black/70 text-white">
      <nav className="bg-black p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-6">
          <Link to="/admin-dashboard">
            <img src="/Logo.png" alt="Netflix Logo" className="w-24 h-auto" />
          </Link>
          <Link to="/admin-dashboard/data-management" className="hover:underline">Data Management</Link>
          <Link to="/admin-dashboard/logs" className="hover:underline">Logs</Link>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;