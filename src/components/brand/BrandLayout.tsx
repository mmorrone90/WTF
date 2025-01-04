import React from 'react';
import { Outlet } from 'react-router-dom';
import BrandHeader from './BrandHeader';
import BrandFooter from './BrandFooter';

export default function BrandLayout() {
  return (
    <div className="min-h-screen bg-black">
      <BrandHeader />
      <main className="pt-20">
        <Outlet />
      </main>
      <BrandFooter />
    </div>
  );
}