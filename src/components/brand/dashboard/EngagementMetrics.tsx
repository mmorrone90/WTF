import React from 'react';
import { Clock, FileText, RefreshCw } from 'lucide-react';

const metrics = [
  { icon: Clock, label: 'Avg. Visit Duration', value: '4m 32s' },
  { icon: FileText, label: 'Pages per Visit', value: '3.2' },
  { icon: RefreshCw, label: 'New vs Returning', value: '65% / 35%' }
];

export default function EngagementMetrics() {
  return (
    <div className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-xl font-bold mb-6">Engagement Metrics</h3>
      <div className="space-y-6">
        {metrics.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5 text-neon-yellow" />
              <span>{label}</span>
            </div>
            <span className="font-bold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
