import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../../components/brand/dashboard/Sidebar';

export default function BrandDashboard() {
  return (
    <div className="flex min-h-screen bg-black overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 overflow-auto h-screen">
        <div className="max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
