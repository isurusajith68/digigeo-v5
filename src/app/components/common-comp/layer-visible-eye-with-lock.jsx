// components/Accordion.js
import React, { useState } from "react";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Image from 'next/image'
import { FaLock,FaLockOpen  } from "react-icons/fa6";

const LayerVisibleLockDiv = ({ title, children, onClick, eyeState,onLockClick,lockState }) => {
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
          {/* lock-open-closw */}
          <span className="">
            {lockState && (
              <div className="flex">
              <FaLock onClick={onLockClick}
                    className="text-red-400 cursor-pointer hover:scale-125"/>
               {/* <Image
                  src="/eye-locked.jpg"
                  width={25}
                  height={25}
                  alt="eye-locked.jpg"
                    onClick={onLockClick}
                    className="cursor-pointer hover:scale-125"
                /> */}
            </div>
            )}
            {!lockState && (
              <div className="flex">
                <FaLockOpen onClick={onLockClick}
                    className="cursor-pointer hover:scale-125"/>
               {/* <Image
                  src="/eye-unlocked.jpg"
                  width={25}
                  height={25}
                  alt="eye-locked.jpg"
                    onClick={onLockClick}
                    className="cursor-pointer hover:scale-125"
                /> */}
                 </div>
            )}
          </span>
          {/* eye-open-closw */}
          <span className="">
            {eyeState && (
              <VscEye
                className="cursor-pointer hover:scale-125"
                onClick={onClick}
              />
            )}
            {!eyeState && (
              <VscEyeClosed
                className="cursor-pointer hover:scale-125"
                onClick={onClick}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LayerVisibleLockDiv;
