import React, { useState, useEffect, useRef } from "react";
import { Down, Up } from "../icons/icons";

interface Props {
  name?: string;
  options: React.ReactNode[];
  className?: string;
  isCloseToSelected?: boolean;
  classNameDropDown?: string;
  classNameContainer?: string;
  children?: React.ReactNode;
  topChildren?: React.ReactNode;
  icon?: React.ReactNode;
  button?: React.ReactNode;
  direction?: "right" | "left";
  vertical?: "top" | "bottom";
  shadow?: boolean;
}

export default function DropDown({
  classNameContainer,
  name,
  direction = "left",
  vertical,
  button,
  children,
  topChildren,
  icon,
  options,
  classNameDropDown = "w-max",
  shadow = true,
  className = "bg-[#e3e3e3] hover:bg-[#d4d4d4]",
  isCloseToSelected = true,
}: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [isAbove, setIsAbove] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show && !vertical) {
      const dropdownElement = dropdownRef.current;
      const buttonElement = buttonRef.current;

      if (dropdownElement && buttonElement) {
        const dropdownRect = dropdownElement.getBoundingClientRect();
        const buttonRect = buttonElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const spaceBelow = viewportHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;

        setIsAbove(spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height);
      }
    }

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, vertical]);


  const positionClass =
    vertical === "top" || (!vertical && isAbove)
      ? "bottom-full mb-2"
      : "mt-2";

  return (
    <div className={`relative inline-block text-left ${classNameContainer}`}>
      {button ? (
        <div role="button" onClick={() => setShow(!show)}>
          {button}
        </div>
      ) : (
        <button
          onClick={() => setShow(!show)}
          ref={buttonRef}
          className={`${className} ${shadow ? 'shadow-default active:shadow-pressed' : ''} ${show ? 'shadow-pressed' : ''} h-9 justify-between text-primary text-xs outline-none font-semibold rounded-lg px-3 py-2 text-center inline-flex items-center`}
          type="button"
        >
          {name}
          {icon ? icon : !show ? <Down className="size-4" /> : <Up className="size-4" />}
        </button>
      )}

      {show && (
        <div
          ref={dropdownRef}
          className={`absolute border border-gray-300 z-50 ${direction === "right" ? "right-0" : "left-0"} ${positionClass} bg-white rounded-lg shadow ${classNameDropDown}`}
        >
          <div className="px-2 pt-2">{topChildren}</div>
          <div>
            <ul className="px-2 pt-2 space-y-1 pb-1 text-sm text-primary font-medium">
              {options.map((option, index) => (
                <div
                  role="button"
                  onClick={() => isCloseToSelected && setShow(false)}
                  key={index}
                  className="cursor-pointer rounded-md hover:bg-gray-100"
                >
                  {option}
                </div>
              ))}
            </ul>
          </div>
          <div className="px-4 mb-2">{children}</div>
        </div>
      )}
    </div>
  );
}
