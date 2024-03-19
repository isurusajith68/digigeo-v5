// components/Accordion.js
import React, { useState,useEffect } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const LayerVisibleVisibilityStateDiv = ({ title, children, onClick, eyeState, visibilityState }) => {
  
  useEffect(()=>{
    console.log("visibilityState",visibilityState)

  },[visibilityState])
  return (
    <div>
      <div
        style={{ alignItems: "center" }}
        className="relative item-center flex pl-4 border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2 focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in"
      >
        <span className="mr-2">{children}</span>
        <h3 style={{ margin: 0, marginRight: "10px" }}>{title}</h3>
        <div className="flex absolute right-0 mr-4 gap-4">
          {/* <span onClick={toggleAccordion} className="cursor-pointer"> 
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          <span className="">
            {eyeState &&  (<VscEye className={`${visibilityState ? "bg-red-800": ""} cursor-pointer hover:scale-125`} onClick={onClick} />) }
            {/* {eyeState && visibilityState ? (<VscEye className="cursor-pointer hover:scale-125" onClick={onClick} />) : (<VscEye className="bg-red-800 cursor-pointer hover:scale-125" onClick={onClick} />) } */}
            
            {!eyeState && (
              <VscEyeClosed className="cursor-pointer hover:scale-125" onClick={onClick} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LayerVisibleVisibilityStateDiv;
