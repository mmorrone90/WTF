import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe } from 'lucide-react';
import ContactInfoCard from './ContactInfoCard';

const quickContactItems = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'support@wheretofind.com'
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+1 (555) 123-4567'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: '123 Fashion Street\nNew York, NY 10001'
  }
];

const additionalInfoItems = [
  {
    icon: MessageSquare,
    title: 'Live Chat',
    content: 'Available 24/7 for instant support'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM'
  },
  {
    icon: Globe,
    title: 'Global Support',
    content: 'Support available in multiple languages'
  }
];

export default function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <ContactInfoCard title="Quick Contact" items={quickContactItems} />
      <ContactInfoCard title="More Ways to Connect" items={additionalInfoItems} />
    </motion.div>
  );
}