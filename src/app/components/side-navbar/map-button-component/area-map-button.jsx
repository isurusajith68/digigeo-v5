"use client";

// import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
// import { setIsAreaSideNavOpen } from "../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import LayerVisibleDiv from "../../common-comp/layer-visible-eye";
import { AiFillAppstore } from "react-icons/ai";
import { setIsAreaSideNavOpen,setAreaCountry, setAreaMiningArea} from "../../../../store/area-map/area-map-slice";
import { MdLocationOn } from "react-icons/md";
import AreaFilter from "../../filter-popups/area-filters";
import { FaFilter } from "react-icons/fa";
import { Chip } from "@nextui-org/react";

const AreaMapButton = ({ onClick }) => {
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
  const isAreaSideNavOpen = useSelector(
    (state) => state.areaMapReducer.isAreaSideNavOpen
  );
  const areaLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);
  const areaState = useSelector((state) => state.areaMapReducer.areaMiningArea);

  const [isOpenIn, setIsOpenIn] = useState();

  const closePopup = () => {
    setIsOpenIn(false);
  };

  const resetFilters=()=>{
    dispatch(setAreaCountry(""));
    dispatch(setAreaMiningArea(""));
  }

  const openAreaNav = () => {
    let newUrl;
    if (areaState == "") {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    } else {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaState}`;
    }
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsAreaSideNavOpen(true));
  };

  // useEffect(()=>{
  //   if(!areaState){
  //      setIsOpenIn(true)
  //   }
  // },[]);

  const onClickLocal=()=>{
       if(!areaState){
       setIsOpenIn(true)
    }
    onClick()
  }

  return (
    <div className="flex justify-center gap-1 w-full flex-col">
      <div className="flex justify-center gap-1 w-full">
        <button
          onClick={onClickLocal}
          className={`relative flex items-center  border rounded-lg border-amber-800 focus:outline-none ${
            selectedMap === "area"
              ? "  bg-amber-300 w-10/12 "
              : "  bg-amber-200 w-full"
          } text-sm sm:text-sm hover:bg-blue-900 hover:text-white py-2 transition duration-150 ease-in`}
        >
          <MdLocationOn className="h-6 w-6 ml-2" />
          <span className="uppercase ml-2 font-semibold">
            Exploration areas
          </span>
        </button>
        {isOpenIn ? (
          <AreaFilter isOpenIn={isOpenIn} closePopup={closePopup} />
        ) : null}
        <button
          onClick={() => setIsOpenIn(true)}
          className={`relative flex items-center justify-center border rounded-lg border-blue-700 focus:outline-none ${
            selectedMap === "area"
              ? " text-white bg-blue-900 w-2/12"
              : " hidden"
          } text-sm sm:text-sm hover:bg-blue-500 py-2 transition duration-150 ease-in`}
        >
          <FaFilter className="h-4 w-4" />
        </button>
      </div>
      <div
        className={`${
          selectedMap === "area" &&
          !isAreaSideNavOpen &&
          areaCountry != "" &&
          areaState != ""
            ? "flex justify-between"
            : "hidden"
        } `}
      >
        
        <Chip
          color="default"
          variant="light"
          className="cursor-pointer"
          size="sm"
          onClick={resetFilters}
        >
          Reset
        </Chip>
       
        <Chip
          color="primary"
          variant="bordered"
          className="cursor-pointer hover:bg-gray-200"
          size="sm"
          onClick={openAreaNav}
        >
          View List
        </Chip>
      </div>
    </div>
  );
};
export default AreaMapButton;
