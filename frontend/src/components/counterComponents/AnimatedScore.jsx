import React from "react";
import { useEffect, useState, useRef } from "react";

const AnimatedScore = ({ score }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const previousScore = useRef(score);

  const getAnimationScale = (currentScore, prevScore) => {
    const difference = currentScore - prevScore;
    
    console.log('Animation calculation:', {
      current: currentScore,
      previous: prevScore,
      difference
    });

    if (difference <= -50) return "scale-[1.6] drop-shadow-[0px_0px_4px_rgba(255,0,45,0.7)]";
    if (difference <= -36) return "scale-[1.35] drop-shadow-[0px_0px_4px_rgba(200,0,255,0.7)]";
    if (difference <= -20) return "scale-110 drop-shadow-[0px_0px_4px_rgba(60,133,33,0.7)]";
    return "scale-105";
  };

  useEffect(() => {
    // Make sure we're using .current to access the ref value
    const animationScale = getAnimationScale(score, previousScore.current);
    console.log("Animation triggered:", {
      newScore: score,
      previousScore: previousScore.current,
      scale: animationScale
    });

    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
      previousScore.current = score;  // Update the previous score after animation
    }, 300);

    return () => clearTimeout(timer);
  }, [score]);

  return (
    <div className="relative">
      <p
        className={`
          dark:text-offwhite
          text-dark-gray
          text-4xl
          font-semibold
          transition-all
          duration-300
          ease-in-out
          ${
            isAnimating
              ? `${getAnimationScale(score, previousScore.current)} translate-y-1`
              : "scale-100 translate-y-0 drop-shadow-[0px_0px_2px_rgba(200,0,255,0)]"
          }
        `}
      >
        {score}
      </p>
    </div>
  );
};

export default AnimatedScore;