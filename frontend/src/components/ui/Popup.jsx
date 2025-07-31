import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);
  let timeoutId = undefined;

  function handlePopup() {
    setIsVisible(true);
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 9000);
  }

  function handleClosePopup() {
    clearTimeout(timeoutId);
    setIsVisible(false);
  }

  useEffect(() => {
    handlePopup();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
        
          whileHover={{ scale: 1.2 }}
          onClick={() => handleClosePopup()}
          initial={{ top: -150, opacity: 0 }}
          animate={{ top: 80, opacity: 1 }}
          exit={{ top: -150, opacity: 0 }}
          transition={{
            scale: { duration: 0.2 },
            duration: 1,
            delay: 0.5,
            ease: easeInOut,
          }}
          className="cursor-pointer absolute z-10 min-w-12 h-16 bg-purple-900 bg-opacity-20 backdrop-blur-md text-offwhite drop-shadow-md text-lg p-3 outline outline-1 outline-purple-900 rounded-md"
        >
          Your past 3 throws are 47% higher than usual.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
