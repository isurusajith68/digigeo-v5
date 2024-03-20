// components/Accordion.js
import React, { useState,useEffect } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { TbEyePause } from "react-icons/tb";

const LayerVisibleVisibilityStateDiv = ({ title, children, onClick, eyeState, visibilityState }) => {
  
  useEffect(()=>{
    console.log("visibilityState",visibilityState)

  },[visibilityState])
  return (
    <div>
      <div
              className="flex items-center justify-between pl-4   border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2 focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in"
      >
        <div className="flex">
        <span className="mr-2">{children}</span>
        <h3 style={{ margin: 0, marginRight: "10px" }}>{title}</h3>
        </div>
        <div className="flex items-center justify-center mr-4">
          {/* <span onClick={toggleAccordion} className="cursor-pointer"> 
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          {/* <span className="mr-4 bg-red-400"> */}
            {/* {eyeState &&  (<VscEye className={`${visibilityState ? "bg-red-800": ""} cursor-pointer hover:scale-125`} onClick={onClick} />) } */}
            {eyeState && visibilityState && (<TbEye className="cursor-pointer hover:scale-125" onClick={onClick} />)}  
            {eyeState && !visibilityState && (<TbEyePause className="cursor-pointer hover:scale-125" onClick={onClick} />)} 
            {!eyeState && (<TbEyeOff className="cursor-pointer hover:scale-125" onClick={onClick} />)}
            
          {/* </span> */}
        </div>
      </div>
    </div>
  );
};

export default LayerVisibleVisibilityStateDiv;
