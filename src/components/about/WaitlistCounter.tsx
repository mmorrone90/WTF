import React from 'react';

interface WaitlistCounterProps {
  count: number;
}

export default function WaitlistCounter({ count }: WaitlistCounterProps) {
  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6'
  ];

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex -space-x-2">
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Waitlist member ${index + 1}`}
            className="w-8 h-8 rounded-full border-2 border-black"
          />
        ))}
      </div>
      <span className="ml-4 text-text-grey">
        Join {count.toLocaleString()} + others on the waitlist
      </span>
    </div>
  );
}
