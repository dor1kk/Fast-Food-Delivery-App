import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';

const AdminHome = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminHome;
