// components/Accordion.js
import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import PropertyFCompanyPopup from "./property-fcompany-popup";
import { setpopupFcompanyId } from "../../../../store/properties-map/properties-map-slice";
import { useDispatch } from "react-redux";


const PropertyFeaturedCompanyDetailDiv = ({ companyid, title, children, onClick }) => {
  // const [isPopupOpen, setIsPopup]
  const [isOpenIn, setIsOpenIn] = useState();
  const dispatch = useDispatch();
  const closePopup = () => {
    setIsOpenIn(false);
  };

  return (
    <div>
      <div
        style={{ alignItems: "center" }}
        className="relative item-center flex pl-4 border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2 focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in"
      >
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
              // onClick={() => setIsOpenIn(true)}
                 onClick={() => {
                dispatch(setpopupFcompanyId(companyid))
                // setIsOpenIn("y")}}
              }}
            />
          </span>
          {isOpenIn ? (
            <PropertyFCompanyPopup
              isOpenIn={isOpenIn}
              closePopup={closePopup}
              titleIn={title}
              companyid={companyid}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PropertyFeaturedCompanyDetailDiv;

//select working br
