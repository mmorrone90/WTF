import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
    
      video.addEventListener('timeupdate', () => {
        // If the video reaches the end, reset to 2 seconds
        if (video.currentTime >= video.duration - 0.1) {
          video.currentTime = 0;
        }
      });
    }
  }, []);

  return (
    <div className="relative h-screen">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://msqgjcoxwffojqihlxaa.supabase.co/storage/v1/object/public/assets/20250106_1647_Elegant%20Fashion%20Display_simple_compose_01jgysccczeewrpmvyj6ss4cgz.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative h-full max-w-container mx-auto px-6 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-[3.5rem] font-extrabold leading-tight mb-6">
            Discover Your Next
            <span className="block text-neon-yellow">Style Shop</span>
          </h1>
          <p className="text-text-grey text-xl mb-8">
            Explore curated collections from emerging designers and iconic brands.
            Your fashion journey starts here.
          </p>
          <button className="neon-button">
            Explore Collections
          </button>
        </div>
      </div>
    </div>
  );
}
