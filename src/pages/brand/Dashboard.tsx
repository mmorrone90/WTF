import React from 'react';
import { BarChart3, Users, Smartphone, Monitor } from 'lucide-react';
import StatCard from '../../components/brand/dashboard/StatCard';
import TopCountries from '../../components/brand/dashboard/TopCountries';
import EngagementMetrics from '../../components/brand/dashboard/EngagementMetrics';

const stats = [
  { title: 'Total Visits', value: '124,892', change: '+12.5%', icon: BarChart3 },
  { title: 'Desktop Users', value: '68%', change: '+2.1%', icon: Monitor },
  { title: 'Mobile Users', value: '32%', change: '-2.1%', icon: Smartphone, isPositive: false },
  { title: 'Active Users', value: '45,231', change: '+8.3%', icon: Users }
];

export default function Dashboard() {
  return (
    <div className="max-w-container mx-auto px-6 py-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TopCountries />
        <EngagementMetrics />
      </div>
    </div>
  );
}
