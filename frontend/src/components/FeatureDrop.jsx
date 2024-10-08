import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FeatureDrop({
  title,
  description,
  demoButton,
  alert,
  linkTo,
  extHeight = "13rem",
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isExpanded]);

  return (
    <div className="my-5 feature-drop rounded-2xl w-full dark:bg-dark-gray bg-offwhite text-dark-gray dark:text-gray-300 overflow-hidden">
      <div
        className="cursor-pointer p-5 flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-center items-center">
          <h1
            className={`text-base lg:text-xl font-bold transition-colors duration-300 ${
              isExpanded ? "dark:text-purple-400" : ""
            }`}
          >
            {title}
          </h1>
          {demoButton && (
            <Link
              to={linkTo}
              className={`px-1 h-5 min-w-11 bg-purple-400 hover:bg-purple-500 transition-all duration-300 rounded-md ml-1 md:ml-4 text-sm font-semibold text-dark-gray ${
                isExpanded ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
              }`}
            >
              {demoButton}
            </Link>
          )}
          {alert && (
            <button
              className={`px-1 h-5 min-w-11 bg-yellow-100 transition-all duration-300 rounded-md m-3 xl:ml-4 text-sm font-semibold text-dark-gray ${
                isExpanded ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
              }`}
            >
              {alert}
            </button>
          )}
        </div>
        <span
          className={`text-2xl transition-transform duration-300 ${
            isExpanded ? "rotate-90" : "rotate-0"
          }`}
        >
          &gt;
        </span>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: contentHeight }}
      >
        <p className="px-5 pb-5 sm:text-base text-sm text-dark-gray dark:text-purple-200">
          {description}
        </p>
      </div>
    </div>
  );
}