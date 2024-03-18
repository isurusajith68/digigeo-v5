"use client";

// import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiTwotoneGold,
} from "react-icons/ai";
import { BsFillArrowLeftSquareFill, BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
// import { setIsAreaSideNavOpen } from "../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import LayerVisibleDiv from "../../common-comp/layer-visible-eye";
import { AiFillAppstore } from "react-icons/ai";
import { setIsAreaSideNavOpen } from "../../../../store/area-map/area-map-slice";
import { MdLocationOn } from "react-icons/md";
import AreaFilter from "../../filter-popups/area-filters";
import { FaFilter } from "react-icons/fa";
import { Chip } from "@nextui-org/react";
import PropertiesFilter from "../../filter-popups/properties-filters";
import CompanyFilter from "../../filter-popups/company-filters";
import { setIsCompanySideNavOpen,setcompanyId,setcompanyName, setcompanyStockcode} from "../../../../store/company-map/company-map-slice";

const CompanyMapButton = ({ onClick }) => {
  let pathname = "";
  const dispatch = useDispatch();
  const router = useRouter();
  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );

  const companyLyrs = useSelector(
    (state) => state.mapSelectorReducer.companyLyrs
  );
  const companyZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.companyZoomLevel
  );
  const companyInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.companyInitialCenter
  );
  const isCompanySideNavOpen = useSelector(
    (state) => state.companyMapReducer.isCompanySideNavOpen
  );
  const companyId = useSelector(
    (state) => state.companyMapReducer.companyId
  );

  const [isOpenIn, setIsOpenIn] = useState();

  const closePopup = () => {
    setIsOpenIn(false);
  };

    const resetFilters=()=>{
    dispatch(setcompanyId(0));
    dispatch(setcompanyName(""));
    dispatch(setcompanyStockcode(""));
  }


  const openCompanyNav = () => {
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${companyLyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsCompanySideNavOpen(true));
  };
    const onClickLocal=()=>{
       if(!companyId){
       setIsOpenIn(true)
    }
    onClick()
  }

  return (
    <div className="flex justify-center gap-1 w-full flex-col">
      <div className="flex justify-center gap-1 w-full">
        <button
          onClick={onClickLocal}
          className={`relative flex items-center border rounded-lg border-blue-700 focus:outline-none ${
            selectedMap === "company"
              ? "  bg-amber-300 w-10/12"
              : "   bg-amber-200 w-full"
          } text-sm sm:text-sm hover:bg-blue-900 hover:text-white py-2 transition duration-150 ease-in`}
        >
          <AiTwotoneGold className="h-6 w-6 ml-2" />
          <span className="uppercase ml-2 font-semibold">Companies</span>
        </button>
        {isOpenIn ? (
          <CompanyFilter isOpenIn={isOpenIn} closePopup={closePopup} />
        ) : null}
        <button
          onClick={() => setIsOpenIn(true)}
          className={`relative flex items-center justify-center border rounded-lg border-blue-700 focus:outline-none ${
            selectedMap === "company"
              ? " text-white bg-blue-900 w-2/12"
              : " hidden"
          } text-sm sm:text-sm hover:bg-blue-500 py-2 transition duration-150 ease-in`}
        >
          <FaFilter className="h-4 w-4" />
        </button>
      </div>
      <div
        className={`${
          selectedMap === "company" && !isCompanySideNavOpen && companyId
            ? // &&
              // areaCountry != "" &&
              // areaState != ""
              "flex justify-between"
            : "hidden"
        } `}
      >
        <div>
          <Chip
            color="default"
            variant="light"
            className="cursor-pointer"
            size="sm"
            onClick={resetFilters}
          >
            Reset
          </Chip>
        </div>
        <Chip
          color="primary"
          variant="bordered"
          className="cursor-pointer hover:bg-gray-200"
          size="sm"
          onClick={openCompanyNav}
        >
          View List
        </Chip>
      </div>
    </div>
  );
};
export default CompanyMapButton;
