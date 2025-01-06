import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from '../ui/Button';
import { ContactFormData } from '../../types/contact';

interface ContactFormProps {
  formData: ContactFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ContactForm({ formData, onChange, onSubmit }: ContactFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-dark-grey/50 backdrop-blur-sm p-8 rounded-2xl"
    >
      <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full bg-black/30 rounded-lg px-4 py-3
                       border border-dark-grey focus:border-neon-yellow
                       focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full bg-black/30 rounded-lg px-4 py-3
                       border border-dark-grey focus:border-neon-yellow
                       focus:outline-none transition-colors"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={onChange}
            className="w-full bg-black/30 rounded-lg px-4 py-3
                     border border-dark-grey focus:border-neon-yellow
                     focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            rows={6}
            className="w-full bg-black/30 rounded-lg px-4 py-3
                     border border-dark-grey focus:border-neon-yellow
                     focus:outline-none transition-colors resize-none"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          <Send className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </form>
    </motion.div>
  );
}
