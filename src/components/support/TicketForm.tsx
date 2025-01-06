import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from '../ui/Button';

export default function TicketForm() {
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    description: '',
    priority: 'normal'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support ticket submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-dark-grey/50 backdrop-blur-sm p-8 rounded-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">Submit a Support Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full bg-black/30 rounded-lg px-4 py-3
                     border border-dark-grey focus:border-neon-yellow
                     focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-black/30 rounded-lg px-4 py-3
                     border border-dark-grey focus:border-neon-yellow
                     focus:outline-none transition-colors"
            required
          >
            <option value="">Select a category</option>
            <option value="orders">Orders</option>
            <option value="shipping">Shipping</option>
            <option value="returns">Returns</option>
            <option value="payment">Payment</option>
            <option value="account">Account</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full bg-black/30 rounded-lg px-4 py-3
                     border border-dark-grey focus:border-neon-yellow
                     focus:outline-none transition-colors resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full bg-black/30 rounded-lg px-4 py-3
                     border border-dark-grey focus:border-neon-yellow
                     focus:outline-none transition-colors"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Submit Ticket
        </Button>
      </form>
    </motion.div>
  );
}
