import { useState } from "react";
import { Link } from "react-router-dom";

export default function FeatureDrop({ title, description, demoButton, alert, linkTo }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={`cursor-pointer my-5 feature-drop h-16 rounded-2xl w-full dark:bg-zinc-800 bg-white transition-all dark:text-gray-300 overflow ${
          isHovered ? "h-44" : "h-16"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-16 p-5 flex items-center justify-between">
          <div className="flex justify-center items-center">
          <h1 className={`text-xl font-bold inline transition-all duration-150 ease-in-out ${isHovered && 'text-purple-400'}`}>{title}</h1>
          {demoButton && 
          <Link to={linkTo} className={`px-1 h-5 min-w-11 bg-purple-400 hover:bg-purple-500 transition-colors rounded-md ml-4 text-sm font-semibold text-zinc-700 opacity-0 ${
            isHovered ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
          }`}>{demoButton}</Link>
          }
          { alert && <button className={`px-1 h-5 min-w-11 bg-yellow-100 transition-colors rounded-md ml-4 text-sm font-semibold text-zinc-700 opacity-0 ${
            isHovered ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
          }`}>{alert}
          </button>
          }
          </div>
          <span
            className={`text-2xl transition-transform duration-200 ease-in-out ${
              isHovered ? "rotate-90" : "rotate-0"
            }`}
          >
            &gt;
          </span>
        </div>
        <p
          className={`px-5 pb-5 text-base text-purple-200 transition-all duration-150 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          {description}
        </p>
      </div>
    </>
  );
}
