import React from 'react';
import { Calendar } from 'lucide-react';

interface SeasonalItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
}

const seasonalItems: SeasonalItem[] = [
  {
    id: '1',
    title: 'Spring 2024 Collection',
    description: 'Neon-infused streetwear with sustainable materials',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
    date: 'Coming March 2024'
  },
  // Add more seasonal items
];

export default function SeasonalPicks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {seasonalItems.map((item) => (
        <div key={item.id} className="group relative overflow-hidden rounded-xl bg-dark-grey/50 backdrop-blur-sm">
          <div className="flex gap-6 p-6">
            <div className="w-1/3">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="w-2/3">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-text-grey mb-4">{item.description}</p>
              <div className="flex items-center gap-2 text-neon-yellow">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-bold">{item.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}