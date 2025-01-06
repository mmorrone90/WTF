import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order by logging into your account and visiting the Orders section. There, you\'ll find tracking information for all your recent orders.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all unworn items in their original packaging. Simply initiate a return through your account or contact our support team.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for faster delivery.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. Shipping times and costs vary by location. You can check specific details during checkout.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-grey/50 backdrop-blur-sm rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex items-center justify-between"
            >
              <span className="font-bold">{faq.question}</span>
              <ChevronDown 
                className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-6 text-text-grey">
                {faq.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
