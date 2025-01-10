import React from 'react';
    import { motion } from 'framer-motion';

    export default function Sales() {
      const salesData = [
        { month: 'Jan', revenue: 12500, orders: 320 },
        { month: 'Feb', revenue: 15200, orders: 380 },
        { month: 'Mar', revenue: 18700, orders: 450 },
        { month: 'Apr', revenue: 16300, orders: 410 },
        { month: 'May', revenue: 21000, orders: 520 },
      ];

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-container mx-auto px-6 py-12 space-y-8"
        >
          <h1 className="text-2xl font-bold mb-6">Sales</h1>
          <p className="text-text-grey mb-8">
            Track your sales performance and analyze your revenue data.
          </p>

          <div className="bg-dark-grey/50 backdrop-blur-sm rounded-xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-grey">
                  <th className="text-left p-4">Month</th>
                  <th className="text-left p-4">Revenue</th>
                  <th className="text-left p-4">Orders</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map(sale => (
                  <tr key={sale.month} className="border-b border-dark-grey hover:bg-dark-grey/20 transition-colors">
                    <td className="p-4">{sale.month}</td>
                    <td className="p-4">${sale.revenue.toLocaleString()}</td>
                    <td className="p-4">{sale.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }
