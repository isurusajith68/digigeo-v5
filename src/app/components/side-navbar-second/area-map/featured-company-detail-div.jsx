"use client"

// components/Accordion.js

import  { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import AreaFCompanyPopup from "./area-fcompany-popup";
import { setpopupFcompanyId } from "../../../../store/area-map/area-map-slice";
import { useDispatch } from "react-redux";


const FeaturedCompanyDetailDiv = ({ companyid, title, children, onClick }) => {
  // const [isPopupOpen, setIsPopup]
 // console.log("companyid",companyid)
  const [isOpenIn, setIsOpenIn] = useState();
  const dispatch = useDispatch();
 

  return (
    <div>
      <div className="relative items-center flex pl-4 border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2  focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in">
        <span className="mr-2">{children}</span>
        <h3
          style={{
            margin: 0,
            marginRight: "5px",
            overflow: "hidden",
            fontSize: "0.75rem",
          }}
        >
          {title}
        </h3>
        <div className="flex absolute right-0 mr-2 gap-4">
          {/* <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          <span className="">
            <MdInfoOutline
              className="cursor-pointer h-4 w-4 hover:scale-125"
              onClick={() => {
                dispatch(setpopupFcompanyId(companyid))
                // setIsOpenIn("y")}}
              }}
            />
          </span>
          {isOpenIn=="y" ? (
            <AreaFCompanyPopup
              isOpenIn={isOpenIn}
              // closePopup={closeDialog}
              titleIn={title}
              companyid={companyid}
               dialogStateCallBack={dialogStateCallBack}
              getDialogRef={getDialogRef}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCompanyDetailDiv;

//select working br
