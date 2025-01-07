import React, { useState } from 'react';
import { PlusCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../../data/mockProducts';

export default function JustAddedFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  // Filter just added products
  const newArrivals = mockProducts.filter(product => product.isNew);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex >= newArrivals.length) return 0;
      if (nextIndex < 0) return newArrivals.length - 1;
      return nextIndex;
    });
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50; // minimum distance for swipe
    if (Math.abs(info.offset.x) > swipeThreshold) {
      paginate(info.offset.x < 0 ? 1 : -1);
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${newArrivals[currentIndex].id}`);
  };

  return (
    <section className="relative">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <PlusCircle className="text-neon-yellow w-6 h-6" />
        Just Added
      </h2>

      <div className="relative h-[500px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute w-full h-full touch-pan-y"
          >
            <div className="flex items-center justify-center h-full">
              <motion.div 
                className="bg-dark-grey/30 p-8 rounded-xl w-full max-w-3xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div 
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <img
                      src={newArrivals[currentIndex].image}
                      alt={newArrivals[currentIndex].name}
                      className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                    />
                  </motion.div>
                  <motion.div 
                    className="w-full md:w-1/2 text-center md:text-left"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <h3 className="text-3xl font-bold mb-4">
                      {newArrivals[currentIndex].name}
                    </h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                      <span className="text-2xl text-neon-yellow">
                        ${newArrivals[currentIndex].price}
                      </span>
                      {newArrivals[currentIndex].discount && (
                        <span className="bg-neon-yellow text-black px-2 py-1 rounded-full text-sm">
                          {newArrivals[currentIndex].discount} OFF
                        </span>
                      )}
                    </div>
                    <p className="text-text-grey mb-6">
                      {newArrivals[currentIndex].sold} people bought this item
                    </p>
                    <motion.button 
                      onClick={handleViewDetails}
                      className="bg-neon-yellow text-black px-6 py-3 rounded-full hover:bg-neon-yellow/80 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows - only visible on desktop */}
        <motion.button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full 
                     hover:bg-black/60 transition z-10 hidden md:block"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full 
                     hover:bg-black/60 transition z-10 hidden md:block"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center mt-8 gap-2">
        {newArrivals.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentIndex === index ? 'bg-neon-yellow' : 'bg-dark-grey/50'
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </section>
  );
}