import React, {useRef, useState, useEffect} from "react";
import { motion } from "framer-motion";
const ScrollCard = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -5 }}
      animate={isVisible ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="chess-card"
    >
      {children}
    </motion.div>
  );
};

export default ScrollCard;