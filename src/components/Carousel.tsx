import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

import {
  CarouselProps,
  HeroCarouselProps,
  ProductCarouselProps,
} from "../types";

// Component to determine which carousel type to render
export const Carousel: React.FC<CarouselProps> = (props) => {
  // Default to product carousel if type is not specified
  const { type = "hero", ...restProps } = props;

  if (type === "hero") {
    return <HeroCarousel {...(restProps as HeroCarouselProps)} type="hero" />;
  }

  return (
    <ProductCarousel {...(restProps as ProductCarouselProps)} type="product" />
  );
};

// Product Carousel Component Implementation
const ProductCarousel: React.FC<ProductCarouselProps> = ({
  items = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  itemsPreView = {
    desktop: 4,
    tablet: 3,
    mobile: 1,
  },
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPreView.desktop);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate how many total slides we need
  const totalSlides = Math.ceil(items.length / itemsToShow);

  // Update items to show on window resize
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 640) {
          setItemsToShow(itemsPreView.mobile);
        } else if (width < 1024) {
          setItemsToShow(itemsPreView.tablet);
        } else {
          setItemsToShow(itemsPreView.desktop);
        }
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [itemsPreView]);

  // Auto play functionality
  useEffect(() => {
    let interval: number | undefined;

    if (autoPlay && totalSlides > 1) {
      interval = window.setInterval(() => {
        next();
      }, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, autoPlay, autoPlayInterval, totalSlides]);

  // Navigation functions
  const next = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= totalSlides ? 0 : nextIndex;
    });
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? totalSlides - 1 : nextIndex;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch event handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      next();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prev();
    }
  };

  // Calculate proper starting index for each slide
  const getSlideItems = (slideIndex: number) => {
    const startIndex = slideIndex * itemsToShow;
    const endIndex = Math.min(startIndex + itemsToShow, items.length);
    return items.slice(startIndex, endIndex);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        ref={carouselRef}
        className="w-full flex"
        initial={false}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <div key={slideIndex} className="w-full flex-shrink-0">
            <div className="flex flex-wrap">
              {getSlideItems(slideIndex).map((item, itemIndex) => (
                <motion.div
                  key={`${slideIndex}-${itemIndex}`}
                  className="px-2"
                  style={{ width: `${100 / itemsToShow}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md h-full">
                    {item.image && (
                      <div className="aspect-square bg-gray-100">
                        <img
                          src={item.image}
                          alt={
                            item.title ||
                            `Product ${slideIndex * itemsToShow + itemIndex}`
                          }
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      {item.title && (
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      )}
                      {item.price && (
                        <p className="text-lg font-bold mt-2">{item.price}</p>
                      )}
                      {item.button && (
                        <motion.button
                          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {item.button}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <motion.button
            onClick={prev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 z-10"
            aria-label="Previous slide"
            disabled={currentIndex === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </motion.button>
          <motion.button
            onClick={next}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 z-10"
            aria-label="Next slide"
            disabled={currentIndex === totalSlides - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </motion.button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalSlides > 1 && (
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center py-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`mx-1 w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Hero Carousel Component Implementation
const HeroCarousel: React.FC<HeroCarouselProps> = ({
  items = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalSlides = items.length;

  // Auto play functionality
  useEffect(() => {
    let interval: number | undefined;

    if (autoPlay && totalSlides > 1) {
      interval = window.setInterval(() => {
        next();
      }, autoPlayInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, autoPlay, autoPlayInterval, totalSlides]);

  // Navigation functions
  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch event handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      next();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prev();
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        ref={carouselRef}
        className="w-full flex"
        initial={false}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <div className="relative">
              {item.image && (
                <div className="w-full h-96 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title || `Slide ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {(item.title || item.description) && (
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-black bg-opacity-40 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {item.title && (
                    <motion.h2
                      className="text-4xl font-bold mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {item.title}
                    </motion.h2>
                  )}
                  {item.description && (
                    <motion.p
                      className="text-xl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {item.description}
                    </motion.p>
                  )}
                  {item.button && (
                    <motion.button
                      className="mt-6 px-6 py-2 bg-white text-black font-medium rounded hover:bg-gray-200 transition-colors"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.button}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <motion.button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 z-10"
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </motion.button>
          <motion.button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 z-10"
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </motion.button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`mx-1 w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-white bg-opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
