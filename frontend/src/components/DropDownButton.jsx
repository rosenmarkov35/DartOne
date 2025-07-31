import { useState } from "react";
import { Link } from "react-router-dom";

export default function DropDownButton({
  additionalClasses = '',
  text,
  desc,
  linkTo = null,
  onLinkClick = null,
  linkText,
}) { 
  const [ isExpanded, setIsExpanded ] = useState(false);
  return (
    <>
      <div className={`flex flex-col ${additionalClasses}`}>
        <div
          onClick={() => {
            setIsExpanded((prev) => !prev);
          }}
          className={`${
            isExpanded ? `rounded-t-lg dark:bg-zinc-900 blur-[1.2px]` : `rounded-lg`
          } transition-all text-2xl dark:bg-dark-gray bg-offwhite dark:text-offwhite text-dark-gray py-2 px-4`}
        >
          {text}
        </div>
        <div
          className={`${
            isExpanded
              ? `opacity-100 pointer-events-auto max-h-24 mb-2`
              : `opacity-0 max-h-0 pointer-events-none mb-0`
          } flex flex-col items-center duration-300 transition-all rounded-b-lgease-in-out bg-transparent dark:text-offwhite text-dark-gray text-sm`}
        >
          <span
            className={`${
              isExpanded ? `opacity-100` : `opacity-0`
            } p-2 duration-500 ease-in-out transition-all drop-shadow-[1px_1px_3px_rgba(0,0,0,0.9)]`}
          >
            {desc}
          </span>
          <Link className="bg-dark-gray mb-2 px-2 py-1 bg-opacity-60 rounded-sm text-md tracking-[0.12em]" onClick={onLinkClick && onLinkClick} to={linkTo ? linkTo : ''}>
            <span className=" drop-shadow-[0px_0px_2px_rgba(255,255,255,0.4)]">{linkText}</span>
          </Link>

          <hr className="w-3/4 border-zinc-600" />
        </div>
      </div>
    </>
  );
}
