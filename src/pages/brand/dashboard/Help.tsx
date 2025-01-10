import React from 'react';
    import { motion } from 'framer-motion';

    export default function Help() {
      const faqs = [
        {
          question: 'How do I add a new product?',
          answer: 'To add a new product, navigate to the "Products" section and click on the "Add Product" button. Fill in the required details and save.'
        },
        {
          question: 'How can I track my sales?',
          answer: 'You can track your sales in the "Sales" section of the dashboard. It provides a detailed overview of your revenue and orders.'
        },
        {
          question: 'How do I manage my account settings?',
          answer: 'You can manage your account settings in the "Settings" section. Here you can update your profile, change your password, and manage your preferences.'
        },
        {
          question: 'How do I export my product data?',
          answer: 'To export your product data, navigate to the "Products" section and click on the "Export" button. This will download a CSV file of your product data.'
        },
        {
          question: 'How do I import product data?',
          answer: 'To import product data, navigate to the "Products" section and click on the "Import" button. Select a CSV file to import your product data.'
        }
      ];

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-container mx-auto px-6 py-12 space-y-8"
        >
          <h1 className="text-2xl font-bold mb-6">Help</h1>
          <p className="text-text-grey mb-8">
            Find answers to common questions and get support.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-dark-grey/50 backdrop-blur-sm rounded-xl p-6">
                <h3 className="font-bold mb-2">{faq.question}</h3>
                <p className="text-text-grey">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }
