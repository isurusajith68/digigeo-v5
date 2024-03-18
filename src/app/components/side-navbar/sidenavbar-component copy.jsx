// "use client";

// import { Button, Chip, Input } from "@nextui-org/react";
// import React, { useEffect, useState } from "react";
// import {
//   AiFillMinusSquare,
//   AiFillPlusSquare,
//   AiTwotoneGold,
// } from "react-icons/ai";
// import { BsFillArrowLeftSquareFill, BsFillBuildingsFill } from "react-icons/bs";
// import { GiEarthAmerica } from "react-icons/gi";
// import { FaFilter, FaSearch } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setIsSideNavOpen,
//   setSelectedMap,
//   setUrlUpdate,
// } from "../../../store/map-selector/map-selector-slice";
// import { useRouter, useSearchParams } from "next/navigation";
// import { MdLocationOn } from "react-icons/md";
// import AreaFilter from "../filter-popups/area-filters";
// import AreaBottomSideComp from "./bottom-components/area-bottom-side-component";
// import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";

// const SideNavbar = () => {
//   let pathname = "";
//   const dispatch = useDispatch();
//   const router = useRouter();
//   try {
//     pathname = window.location.href;
//   } catch (error) {}

//   if (pathname) {
//     const r = pathname.indexOf("/", 9);
//     if (r !== -1) {
//       pathname = pathname.substring(0, r);
//     }
//   }
//   const [isOpenIn, setIsOpenIn] = useState();

//   const selectedMap = useSelector(
//     (state) => state.mapSelectorReducer.selectedMap
//   );
//   const isSideNavOpen = useSelector(
//     (state) => state.mapSelectorReducer.isSideNavOpen
//   );
//   const areaLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
//   const areaZoomLevel = useSelector(
//     (state) => state.mapSelectorReducer.areaZoomLevel
//   );
//   const areaInitialCenter = useSelector(
//     (state) => state.mapSelectorReducer.areaInitialCenter
//   );

//   const isAreaSideNavOpen = useSelector(
//     (state) => state.areaMapReducer.isAreaSideNavOpen
//   );
//   const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);
//   const areaState = useSelector((state) => state.areaMapReducer.areaMiningArea);

//   const selectMapHandler = (selectedValue) => {
//     dispatch(setSelectedMap(selectedValue));
//     let newUrl;
//     if (selectedValue == "area") {
//       if (areaState == "") {
//         newUrl = `${window.location.pathname}?t=${selectedValue}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
//       } else {
//         newUrl = `${window.location.pathname}?t=${selectedValue}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaState}`;
//       }
//     }
//     window.history.replaceState({}, "", newUrl);
//   };

//   const closePopup = () => {
//     setIsOpenIn(false);
//   };

//   const openAreaNav = () => {
//     let newUrl;
//     if (areaState == "") {
//       newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
//     } else {
//       newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaState}`;
//     }
//     window.history.replaceState({}, "", newUrl);
//     dispatch(setIsAreaSideNavOpen(true));
//   };
//   return (
//     <section className="flex gap-6">
//       <div className={`duration-500 flex w-auto`}>
//         <div
//           className={`
//         ${
//           isSideNavOpen
//             ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
//             : ""
//         }
//         h-[90vh] ml-2 mt-2
//         ${isSideNavOpen ? "w-80 sm:w-72 mr-2" : "w-0"}
//         duration-500`}
//         >
//           <div
//             className={`${isSideNavOpen ? "py-0.1 flex flex-col " : "hidden"}`}
//           >
//             <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2">
//               <span className="font-bold">Overview</span>
//             </div>
//             <div className="m-2">
//               <Input
//                 // list={list}
//                 isClearable
//                 type="text"
//                 size={"sm"}
//                 variant="flat"
//                 placeholder="Search here..."
//                 onClear={() => console.log("input cleared")}
//                 className="w-full rounded-lg border border-blue-700"
//                 startContent={<FaSearch className="h-4 w-4 text-gray-400" />}
//               />
//             </div>
//             <div className="flex flex-col gap-2 w-full pb-2 pl-2 pr-2">
//               <div className="flex justify-center gap-1 w-full flex-col">
//                 <div className="flex justify-center gap-1 w-full">
//                   <button
//                     onClick={() => selectMapHandler("area")}
//                     className={`relative flex items-center border rounded-lg border-blue-700 focus:outline-none ${
//                       selectedMap === "area"
//                         ? " text-white bg-blue-900 w-10/12"
//                         : " text-blue-900 bg-white w-full"
//                     } text-sm sm:text-sm hover:bg-blue-500 py-2 transition duration-150 ease-in`}
//                   >
//                     <MdLocationOn className="h-6 w-6 ml-4" />
//                     <span className="uppercase ml-4 font-semibold">
//                       Exploration areas
//                     </span>
//                     {/* <FaFilter className="absolute right-0 h-4 w-4 mr-6" /> */}
//                   </button>
//                   {isOpenIn ? (
//                     <AreaFilter isOpenIn={isOpenIn} closePopup={closePopup} />
//                   ) : null}
//                   <button
//                     onClick={() => setIsOpenIn(true)}
//                     className={`relative flex items-center justify-center border rounded-lg border-blue-700 focus:outline-none ${
//                       selectedMap === "area"
//                         ? " text-white bg-blue-900 w-2/12"
//                         : " hidden"
//                     } text-sm sm:text-sm hover:bg-blue-500 py-2 transition duration-150 ease-in`}
//                   >
//                     <FaFilter className="h-4 w-4" />
//                   </button>
//                 </div>
//                 <div
//                   className={`${
//                     selectedMap === "area" &&
//                     !isAreaSideNavOpen &&
//                     areaCountry != "" &&
//                     areaState != ""
//                       ? "flex justify-between"
//                       : "hidden"
//                   } `}
//                 >
//                   <Chip
//                     color="default"
//                     variant="light"
//                     className="cursor-pointer"
//                     size="sm"
//                   >
//                     Reset
//                   </Chip>
//                   <Chip
//                     color="primary"
//                     variant="bordered"
//                     className="cursor-pointer hover:bg-gray-200"
//                     size="sm"
//                     onClick={openAreaNav}
//                   >
//                     View List
//                   </Chip>
//                 </div>
//                 {/* <button
//                   className={`relative flex items-center justify-center border rounded-lg border-blue-700 focus:outline-none ${
//                     selectedMap === "area"
//                       ? " text-white bg-blue-900 w-2/12"
//                       : " hidden"
//                   } text-sm sm:text-sm hover:bg-blue-500 py-2 transition duration-150 ease-in`}
//                 >
//                   <FaFilter className="h-4 w-4" />
//                 </button> */}
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => selectMapHandler("commodity")}
//                   className={`relative flex items-center border rounded-lg border-blue-700 focus:outline-none ${
//                     selectedMap === "commodity"
//                       ? " text-white bg-blue-900 "
//                       : " text-blue-900 bg-white "
//                   } text-sm sm:text-sm hover:bg-blue-500 py-2 w-full transition duration-150 ease-in`}
//                 >
//                   <BsFillBuildingsFill className="h-6 w-6 ml-4" />
//                   <span className="uppercase ml-4 font-semibold">
//                     Properties
//                   </span>
//                   {/* <FaFilter className="absolute right-0 h-4 w-4 mr-6" /> */}
//                 </button>
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   onClick={() => selectMapHandler("company")}
//                   className={`relative flex items-center border rounded-lg border-blue-700 focus:outline-none ${
//                     selectedMap === "company"
//                       ? " text-white bg-blue-900 "
//                       : " text-blue-900 bg-white "
//                   } text-sm sm:text-sm hover:bg-blue-500 py-2 w-full transition duration-150 ease-in`}
//                 >
//                   <AiTwotoneGold className="h-6 w-6 ml-4" />
//                   <span className="uppercase ml-4 font-semibold">
//                     Companies
//                   </span>
//                   {/* <FaFilter className="absolute right-0 h-4 w-4 mr-6" /> */}
//                 </button>
//               </div>
//             </div>
//             <div className="mt-4 mb-1 flex items-center justify-center">
//               <AreaBottomSideComp />
//             </div>
//             <div className="w-full pb-2 pl-2 pr-2 pt-2">
//               <div className="flex justify-center">
//                 <button
//                   // onClick={masterLoginEvent}
//                   className="relative flex items-center justify-center border rounded-lg border-blue-700 focus:outline-none bg-blue-900 text-white text-sm sm:text-sm hover:bg-blue-400 py-2 w-full transition duration-150 ease-in"
//                 >
//                   {/* <AiTwotoneGold className="h-6 w-6 ml-4" /> */}
//                   <span className="uppercase font-semibold">
//                     Reset all filters
//                   </span>
//                   {/* <FaFilter className="absolute right-0 h-4 w-4 mr-6" /> */}
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="mt-4 flex flex-col gap-4 relative"></div>
//         </div>
//         {/* <div className="w-12">
//           <div className="flex flex-col gap-4 mt-2">
//             <Button isIconOnly variant="bordered" className="bg-blue-900">
//               <BsFillArrowLeftSquareFill
//                 // size={26}
//                 className={`cursor-pointer text-white h-6 w-6 ${
//                   isSideNavOpen ? "" : "rotate-180"
//                 }`}
//                 onClick={() => collapsibleBtnHandler()}
//               />
//             </Button>
//             <Button isIconOnly variant="bordered" className="bg-blue-900">
//               <GiEarthAmerica className={`text-white cursor-pointer h-6 w-6`} />
//             </Button>
//             <Button isIconOnly variant="bordered" className="bg-blue-900">
//               <AiFillPlusSquare
//                 className={`text-white cursor-pointer h-6 w-6`}
//               />
//             </Button>
//             <Button isIconOnly variant="bordered" className="bg-blue-900">
//               <AiFillMinusSquare
//                 className={`text-white cursor-pointer h-6 w-6`}
//               />
//             </Button>
//           </div>
//         </div> */}
//       </div>
//     </section>
//   );
// };
// export default SideNavbar;
