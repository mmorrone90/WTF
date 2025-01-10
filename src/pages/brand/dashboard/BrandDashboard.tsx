import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/brand/dashboard/Sidebar';

export default function BrandDashboard() {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
}
