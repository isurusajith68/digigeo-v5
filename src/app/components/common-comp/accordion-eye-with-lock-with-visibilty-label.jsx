// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { TbEyePause } from "react-icons/tb";
import { MdOutlineLabel } from "react-icons/md";
import { MdOutlineLabelOff } from "react-icons/md";

const AccordionItemWithEyeWithLockVisibilityLabel = ({ title, children, onClick, eyeState, onLockClick, lockState, visibilityState, labelState, setLabelState }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const toggleAccordion = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  
  const eyeClickHandler = (e) => {
   
    onClick();
  };
  
  return (
    <div className="grow-[2]">
      <div
        // style={{ alignItems: "center" }}
        className="relative items-center flex pl-4 border rounded-lg border-blue-700 focus:outline-none bg-blue-900 text-white text-sm sm:text-sm  w-full transition duration-150 ease-in"
      >
        <h3 style={{ margin: 0, marginRight: "10px" }}  >{title}</h3>
        <div className="flex absolute right-0 mr-4 gap-4">
          <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span>
          <span>
            {labelState && (<MdOutlineLabel onClick={() => setLabelState(false)}  className=" cursor-pointer hover:scale-125" />)}
            {!labelState && <MdOutlineLabelOff onClick={() => setLabelState(true)}  className=" cursor-pointer hover:scale-125" />}
          </span>
            <span className="">
            {!lockState &&  eyeState && visibilityState &&  (
              <TbEye className="cursor-pointer hover:scale-125" onClick={(e)=>{
                 e.preventDefault();
                eyeClickHandler()}} />
            )}
              {!lockState && eyeState && !visibilityState && (
              <TbEyePause
                className="cursor-pointer hover:scale-125"
                onClick={(e)=>{
                 e.preventDefault();
                eyeClickHandler()}}
              />
            )}
            {!lockState && !eyeState &&(
              <TbEyeOff
                className="cursor-pointer hover:scale-125"
                onClick={(e)=>{
                 e.preventDefault();
                eyeClickHandler()}}
              />
            )}
          </span>
          <span>
             {lockState && (
              <FaLock className=" cursor-pointer hover:scale-125" onClick={(e)=> {
                 e.preventDefault();
                onLockClick()}} />
            )}
            {!lockState && (
              <FaLockOpen
                className="  cursor-pointer hover:scale-125"
                onClick={(e)=> {
                 e.preventDefault();
                onLockClick()}}
              />
            )}
          </span>

        
        </div>
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default AccordionItemWithEyeWithLockVisibilityLabel;
