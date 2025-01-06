import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShoppingBag, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: ShoppingBag,
    title: 'Product Management',
    description: 'Easily manage your product catalog with our intuitive dashboard'
  },
  {
    icon: Users,
    title: 'Customer Insights',
    description: 'Understand your customers better with AI-powered analytics'
  },
  {
    icon: BarChart3,
    title: 'Sales Analytics',
    description: 'Track your performance with real-time sales analytics'
  }
];

export default function BrandHome() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow/20 to-neon-cyan/20 blur-3xl" />
        <div className="relative max-w-container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Grow Your Fashion Brand with AI
            </h1>
            <p className="text-xl text-text-grey mb-8">
              Join the future of fashion retail. Use AI-powered insights to reach more customers
              and boost your sales.
            </p>
            <Link 
              to="/signup"
              className="inline-flex items-center gap-2 neon-button text-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-grey/50 backdrop-blur-sm p-6 rounded-xl"
              >
                <feature.icon className="w-12 h-12 text-neon-yellow mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-text-grey">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
