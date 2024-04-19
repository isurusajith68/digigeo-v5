// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { MdOutlineLabel } from "react-icons/md";
import { MdOutlineLabelOff } from "react-icons/md";

const LayerVisibleWithLabelDiv = ({ title, children, onClick, eyeState, labelState, setLabelState }) => {

  return (
    <div>
      <div
        className="relative items-center bg-white flex pl-4 border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2 focus:outline-none text-black text-sm sm:text-sm  w-full transition duration-150 ease-in"
      >
        <span className="mr-2">{children}</span>
        <h3 className="  text-black m-0 mr-[10px]">{title}</h3>
        <div className="flex absolute right-0 mr-4 gap-2">
          {/* <span onClick={toggleAccordion} className="cursor-pointer"> 
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
         
          <span>
            {labelState && (<MdOutlineLabel onClick={()=>setLabelState(false)} className=" cursor-pointer hover:scale-125" />)}
            {!labelState && <MdOutlineLabelOff onClick={() => setLabelState(true)}  className=" cursor-pointer hover:scale-125" />}
          </span>
          <span className="">
            {eyeState && (
              <TbEye className=" cursor-pointer hover:scale-125" onClick={onClick} />
            )}
            {!eyeState && (
              <TbEyeOff className=" cursor-pointer hover:scale-125" onClick={onClick} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LayerVisibleWithLabelDiv;
