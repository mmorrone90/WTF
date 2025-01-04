import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, RefreshCcw, CreditCard, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { icon: ShoppingBag, title: 'Orders', description: 'Track, modify, or cancel orders' },
  { icon: Truck, title: 'Shipping', description: 'Delivery info and tracking' },
  { icon: RefreshCcw, title: 'Returns', description: 'Return policy and process' },
  { icon: CreditCard, title: 'Payment', description: 'Payment methods and issues' },
  { icon: User, title: 'Account', description: 'Account settings and security' },
  { icon: Shield, title: 'Privacy', description: 'Privacy and data protection' },
];

export default function SupportCategories() {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-12">Support Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={`/support/${category.title.toLowerCase()}`}
              className="block p-6 bg-dark-grey/50 backdrop-blur-sm rounded-xl
                       hover:bg-dark-grey/70 transition-colors"
            >
              <category.icon className="w-8 h-8 text-neon-yellow mb-4" />
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
              <p className="text-text-grey">{category.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}