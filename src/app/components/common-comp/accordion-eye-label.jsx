// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { MdOutlineLabel } from "react-icons/md";
import { MdOutlineLabelOff } from "react-icons/md";

const AccordionItemWithEyeLabel = ({ title, children, onClick, eyeState, labelState, setLabelState }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const eyeClickHandler = () => {
    onClick();
  };

  return (
    <div className=" ">
      <div
        // style={{ alignItems: "center" }}
        className="relative items-center flex pl-4 border rounded-lg border-blue-700 focus:outline-none bg-blue-900 text-white text-sm sm:text-sm  w-full transition duration-150 ease-in"
      >
        <h3 style={{ margin: 0, marginRight: "10px" }} className="text-white" >{title}</h3>
        <div className="flex absolute right-0 mr-4 gap-4">
          <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span>
          <span>
            {labelState && (<MdOutlineLabel onClick={() => setLabelState(false)} className=" cursor-pointer hover:scale-125" />)}
            {!labelState && <MdOutlineLabelOff onClick={() => setLabelState(true)} className=" cursor-pointer hover:scale-125" />}
          </span>
          <span className="">
            {eyeState && (
              <TbEye className="cursor-pointer hover:scale-125" onClick={eyeClickHandler} />
            )}
            {!eyeState && (
              <TbEyeOff
                className="cursor-pointer hover:scale-125"
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

export default AccordionItemWithEyeLabel;
