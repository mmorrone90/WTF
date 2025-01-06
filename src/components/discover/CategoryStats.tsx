import React from 'react';
import { TrendingUp, Users, ShoppingBag } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

const stats: Stat[] = [
  {
    label: 'Monthly Active Users',
    value: '2.4M',
    change: '+12.5%',
    icon: Users
  },
  {
    label: 'Items Sold',
    value: '847K',
    change: '+24.3%',
    icon: ShoppingBag
  },
  {
    label: 'Avg. Purchase Value',
    value: '$312',
    change: '+8.7%',
    icon: TrendingUp
  }
];

export default function CategoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={index} className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6 
                                  border border-dark-grey hover:border-neon-yellow/20 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <stat.icon className="w-6 h-6 text-neon-yellow" />
            <span className="text-neon-yellow text-sm font-bold">{stat.change}</span>
          </div>
          <p className="text-3xl font-bold mb-2">{stat.value}</p>
          <p className="text-text-grey">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
