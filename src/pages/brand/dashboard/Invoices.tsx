import React from 'react';
    import { motion } from 'framer-motion';

    export default function Invoices() {
      const invoices = [
        { id: 'INV-2024-001', date: '2024-01-15', amount: 1250.00, status: 'Paid' },
        { id: 'INV-2024-002', date: '2024-02-01', amount: 875.50, status: 'Pending' },
        { id: 'INV-2024-003', date: '2024-02-15', amount: 1500.00, status: 'Paid' },
        { id: 'INV-2024-004', date: '2024-03-01', amount: 920.00, status: 'Pending' },
        { id: 'INV-2024-005', date: '2024-03-15', amount: 1100.00, status: 'Paid' },
      ];

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-container mx-auto px-6 py-12 space-y-8"
        >
          <h1 className="text-2xl font-bold mb-6">Invoices</h1>
          <p className="text-text-grey mb-8">
            View and manage your invoices and billing information.
          </p>

          <div className="bg-dark-grey/50 backdrop-blur-sm rounded-xl overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-grey">
                  <th className="text-left p-4">Invoice ID</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="border-b border-dark-grey hover:bg-dark-grey/20 transition-colors">
                    <td className="p-4">{invoice.id}</td>
                    <td className="p-4">{invoice.date}</td>
                    <td className="p-4">${invoice.amount.toFixed(2)}</td>
                    <td className="p-4">{invoice.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }
