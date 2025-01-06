import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, FileText, ShoppingBag, MessageSquare, Settings, HelpCircle, User } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Home', path: '/brand/dashboard' },
  { icon: BarChart2, label: 'Sales', path: '/brand/dashboard/sales' },
  { icon: FileText, label: 'Invoices', path: '/brand/dashboard/invoices' },
  { icon: ShoppingBag, label: 'Products', path: '/brand/dashboard/products' },
  { icon: MessageSquare, label: 'Customer Feedback', path: '/brand/dashboard/feedback' },
  { icon: Settings, label: 'Settings', path: '/brand/dashboard/settings' },
  { icon: HelpCircle, label: 'Help', path: '/brand/dashboard/help' },
];

export default function Sidebar() {
  const location = useLocation();
  const brandName = "Brand Name"; // This should come from auth context

  return (
    <div className="w-64 h-screen fixed left-0 top-0 bg-dark-grey border-r border-dark-grey">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-neon-yellow mb-8">Partner Dashboard</h1>
        
        <nav className="space-y-2">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${location.pathname === path 
                  ? 'bg-neon-yellow/10 text-neon-yellow' 
                  : 'text-text-grey hover:bg-dark-grey/50'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-dark-grey">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-neon-yellow/10 rounded-lg">
            <User className="w-6 h-6 text-neon-yellow" />
          </div>
          <div>
            <p className="font-bold">{brandName}</p>
            <p className="text-sm text-text-grey">Brand Partner</p>
          </div>
        </div>
      </div>
    </div>
  );
}
