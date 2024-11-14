import React, { useState, useEffect, useRef } from "react";
import { Down } from "../icons/icons";

interface Props {
  name?: string;
  options: React.ReactNode[];
  className?: string;
  isCloseToSelected?: boolean;
  classNameDropDown?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  direction?: 'right' | 'left'
}

export default function DropDown({ name, direction = 'left', button, children, icon, options, classNameDropDown = "w-max", className = "bg-[#e3e3e3] hover:bg-[#d4d4d4]", isCloseToSelected = true }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {button ? (
        <div role="button" onClick={() => setShow(!show)}>
          {button}
        </div>
      ) : (
        <>
          <button
            onClick={() => setShow(!show)}
            className={`${className} shadow-sm text-primary text-xs outline-none font-semibold rounded-lg px-3 py-2 text-center inline-flex items-center`}
            type="button"
          >
            {name}
            {icon ? icon : <Down className="size-4" />}
          </button>
        </>
      )}

      {show && (
        <div className={`absolute border border-gray-300 z-50 ${direction === 'right' ? 'right-0' : 'left-0'} mt-2 bg-white rounded-lg shadow ${classNameDropDown}`}>
          <ul className="px-2 pt-2 pb-1 text-sm text-primary font-medium">
            {options.map((option, index) => (
              <div role="button" onClick={() => isCloseToSelected && setShow(false)} key={index} className="cursor-pointer hover:bg-gray-100">
                {option}
              </div>
            ))}
          </ul>
          <div className="px-4 mb-2">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
