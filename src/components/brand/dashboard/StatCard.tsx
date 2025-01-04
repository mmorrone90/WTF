import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  isPositive?: boolean;
}

export default function StatCard({ title, value, change, icon: Icon, isPositive = true }: StatCardProps) {
  return (
    <div className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-6 h-6 text-neon-yellow" />
        <span className={`text-sm font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-text-grey">{title}</p>
    </div>
  );
}