import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <nav className="bg-black p-4 flex gap-6 border-b border-gray-700">
        <Link to="/admin-dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/admin-dashboard/data-management" className="hover:underline">Data Management</Link>
        <Link to="/admin-dashboard/logs" className="hover:underline">Logs</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
