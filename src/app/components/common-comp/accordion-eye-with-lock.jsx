// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaLock, FaLockOpen } from "react-icons/fa6";

const AccordionItemWithEyeWithLock = ({ title, children, onClick, eyeState,onLockClick,lockState }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  const eyeClickHandler = () => {
    onLockClick();
  };
  
  return (
    <div className="grow-[2]">
      <div
        // style={{ alignItems: "center" }}
        className="relative items-center flex pl-4 border rounded-lg border-blue-700 focus:outline-none bg-blue-900 text-white text-sm sm:text-sm py-2 w-full transition duration-150 ease-in"
      >
        <h3 style={{ margin: 0, marginRight: "10px" }}>{title}</h3>
        <div className="flex absolute right-0 mr-4 gap-4">
          <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span>
          <span>
             {lockState && (
              <FaLock className="bg-red-600 cursor-pointer hover:scale-125" onClick={eyeClickHandler} />
            )}
            {!lockState && (
              <FaLockOpen
                className=" bg-red-600 cursor-pointer hover:scale-125"
                onClick={eyeClickHandler}
              />
            )}
          </span>

          <span className="">
            {eyeState && (
              <VscEye className="bg-red-600 cursor-pointer hover:scale-125" onClick={eyeClickHandler} />
            )}
            {!eyeState && (
              <VscEyeClosed
                className="bg-red-600 cursor-pointer hover:scale-125"
                onClick={eyeClickHandler}
              />
            )}
          </span>
        </div>
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default AccordionItemWithEyeWithLock;
