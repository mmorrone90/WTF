import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactItem {
  icon: LucideIcon;
  title: string;
  content: string;
}

interface ContactInfoCardProps {
  title: string;
  items: ContactItem[];
}

export default function ContactInfoCard({ title, items }: ContactInfoCardProps) {
  return (
    <div className="bg-dark-grey/50 backdrop-blur-sm p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="p-3 bg-neon-yellow/10 rounded-lg">
              <item.icon className="w-6 h-6 text-neon-yellow" />
            </div>
            <div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-text-grey whitespace-pre-line">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
