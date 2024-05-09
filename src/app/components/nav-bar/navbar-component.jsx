"use client";


import { Button } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { AiFillHome, AiFillQuestionCircle } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { ThemeSwitcher } from "../theme-switcher";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from 'next/image'
import DialogCommonComponent from "../../utils/dialog/dialog-common";
import { MapViewMode } from "@/store/types";


const HomeNavbar = () => {

  const [disclaimerStatus, setdisclaimerStatus] = useState(false)
  const [helpDialogStatus, sethelpDialogStatus] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //get pathname
  let pathname = "";

  try {
    pathname = window.location.href;
  } catch (error) { }

  if (pathname) {
    const r = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const currentRoute = usePathname();

  const router = useRouter();
  const mapLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const mapViewMode = useSelector((state) => state.mapSelectorReducer.mapViewMode);




  // useEffect(() => {
  //   const button = document.querySelector("#menu-button");
  //   const menu = document.querySelector("#menu");

  //   if (button && menu) {
  //     const clickHandler = () => {
  //       menu.classList.toggle("hidden");
  //     };

  //     button.addEventListener("click", clickHandler);

  //     // Clean up the event listener when the component unmounts
  //     return () => {
  //       button.removeEventListener("click", clickHandler);
  //     };
  //   }
  // }, []);

  // styles for all links
  const commonStyles = "md:p-4 py-2 block hover:font-bold text-indigo-800";
  const activeStyle =
    // commonStyles + " rounded-t-lg bg-blue-700 text-blue-900";
    commonStyles + " overline";
  const nonActiveStyle = commonStyles;

  //style for dropdown
  const dropCommonStyle = "hover:font-bold py-2 px-4 block whitespace-no-wrap ";
  const dropActiveStyle =
    dropCommonStyle +
    "bg-white text-xs p-4 border border-gray-100 shadow-md font-bold text-xs";
  const dropNonActiveStyle =
    dropCommonStyle + "bg-white text-xs p-4 border border-gray-100 shadow-md";

  const showDisclaimer = () => {
    console.log("PP1")
    setdisclaimerStatus(true)

  }
  const showHelp = () => {
    //InvestorMappingHelpFile.docx
    // router.push("/help/InvestorMappingHelpFile.docx.html")
    router.push("/help")
    sethelpDialogStatus(true)
  }

  const onMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex bg-black justify-between items-center w-full relative p-1 border-b-8  border-navbar-border ">
      <div id="left-tnm-logo flex items-center ">
        <Link href="https://northernminer.com" target="_blank" className="flex items-center hidden md:block ml-2">
          <Image
            src="/TNM_logo_large.webp"
            width={200}
            height={35}
            alt="log tnm"
          />
          {/* <span className="pl-1 mx-auto text-xl font-black leading-none text-white dark:text-white select-none  flex items-center justify-center">
                     DigiGeo<span className="text-white">Maps</span>
                   </span> */}
        </Link>
      </div>
      <div id="mid-text">
        <span className="font-bold text-3xl text-white">TNM MAPS</span>
      </div>

      <div id="right-menu-list" className="flex items-center">
        <Link href="https://digigeodata.com" target="_blank" className="flex items-center hidden md:block mr-8">
          <Image
            src="/DigiGeoData_powered_by_white.webp"
            width={140}
            height={55}
            alt="logo DigiGeoData"
          />
        </Link>
        <ul
          className={
              `pt-4
               text-base text-gray-700
               md:flex 
               md:justify-between 
               md:pt-0
               md:flex-row
               flex gap-6
               z-40
               ${isMenuOpen ? "flex-col absolute top-8 left-1 w-full text-center bg-black gap-2" : "hidden"}`}
        >
          <li className="hover:bg-gray-600">
            <Button
              className="hover:bg-gray-600"
              isIconOnly
              variant="light"
              color="primary"
              aria-label="Home"
              onClick={() =>
                router.push(
                  "/?t=area&sn=true&sn2=false&lyrs=m&z=3.25&c=-10694872.010699773,7434223.337137634"
                )
              }
            >
              <Link href="https://digigeodata.com/digigeomaps-landing-page" target="_blank">
                <AiFillHome className="h-6 w-6 dark:text-white text-white" />
              </Link>
            </Button>
          </li>
          <li className="hover:bg-gray-600">
            <Button
              
              isIconOnly
              variant="light"
              color="primary"
              aria-label="Like"
              onClick={showHelp}
            >
              <AiFillQuestionCircle className="h-6 w-6 dark:text-white text-white" />
            </Button>
          </li>
          <li className="hover:bg-gray-600">
            <Button
              
              isIconOnly
              variant="light"
              color="primary"
              aria-label="Like"
            >
              <Link href="https://digigeodata.com/contact/" target="_blank">
                <MdEmail className="h-6 w-6 dark:text-white text-white" />
              </Link>
            </Button>
          </li>
          <li className="hover:bg-gray-600">
            <Button  variant="light" color="primary" onClick={showDisclaimer}>
              <span className="font-semibold dark:text-white text-white">
                Disclaimer
              </span>
            </Button>
          </li>
          <li className="hover:bg-gray-600">
            <ThemeSwitcher />
          </li>
        </ul>
        <div id="hamburger" onClick={onMenuClick} className={`${isMenuOpen ? "hidden" : "block"} m-2`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="menu-button"
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <div id="hamburger" onClick={onMenuClick} className={`${isMenuOpen ? "block" : "hidden"} m-2`}>
          <svg className="h-6 w-6 cursor-pointer md:hidden block"  width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokWidth="0" ></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
              <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#f3f2f2" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"></path> </g> </g></svg>
        </div>
      </div>

    </div>
  )

  // return (

  //   <header className={`   ${mapViewMode == "HEADED" ? "block" : "hidden"} `}>
  //     <nav
  //       className="
  //         flex flex-wrap
  //         items-center
  //         justify-between
  //         w-full
  //         h-[12vh]
  //         text-lg text-white
  //         bg-black p-4  shadow-md
  //         dark:bg-black dark:border-gray-800
  //         border-b-8  border-navbar-border
  //       "
  //     >
  //       <div className="flex items-center gap-2">
  //         <div className="flex gap-4 justify-center">

  //           <Link href="https://northernminer.com" target="_blank" className="flex items-center hidden md:block">
  //             <Image
  //               src="/TNM_logo_large.webp"
  //               width={200}
  //               height={35}
  //               alt="log tnm"
  //             />
  //             {/* <span className="pl-1 mx-auto text-xl font-black leading-none text-white dark:text-white select-none  flex items-center justify-center">
  //             DigiGeo<span className="text-white">Maps</span>
  //           </span> */}
  //           </Link>
  //         </div>
  //         {/* <img src="/logo.png"></img> */}
  //       </div>
  //       <div className="font-bold text-3xl">{"TNM MAPS"}</div>

  //       <div className="flex">
  //         <Link href="https://digigeodata.com" target="_blank" className="flex items-center hidden md:block">
  //           <Image
  //             src="/DigiGeoData_powered_by_white.webp"
  //             width={140}
  //             height={55}
  //             alt="logo DigiGeoData"
  //           />

  //           {/* <span className="pl-1 mx-auto text-xl font-black leading-none text-white dark:text-white select-none  flex items-center justify-center">
  //             DigiGeo<span className="text-white">Maps</span>
  //           </span> */}
  //         </Link>
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           id="menu-button"
  //           className="h-6 w-6 cursor-pointer md:hidden block"
  //           fill="none"
  //           viewBox="0 0 24 24"
  //           stroke="currentColor"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M4 6h16M4 12h16M4 18h16"
  //           />
  //         </svg>

  //         <div
  //           className="ml-8 hidden w-full md:flex md:items-center md:w-auto"
  //           id="menu"
  //         >
  //           <ul
  //             className="
  //             pt-4
  //             text-base text-gray-700
  //             md:flex 
  //             md:justify-between 
  //             md:pt-0
  //             flex gap-6 "

  //           >
  //             <li>
  //               <Button
  //                 isIconOnly
  //                 variant="light"
  //                 color="primary"
  //                 aria-label="Home"
  //                 onClick={() =>
  //                   router.push(
  //                     "/?t=area&sn=true&sn2=false&lyrs=m&z=3.25&c=-10694872.010699773,7434223.337137634"
  //                   )
  //                 }
  //               >
  //                 <Link href="https://digigeodata.com/digigeomaps-landing-page" target="_blank">
  //                   <AiFillHome className="h-6 w-6 dark:text-white text-white" />
  //                 </Link>
  //               </Button>
  //             </li>
  //             <li>
  //               <Button
  //                 isIconOnly
  //                 variant="light"
  //                 color="primary"
  //                 aria-label="Like"
  //                 onClick={showHelp}
  //               >
  //                 <AiFillQuestionCircle className="h-6 w-6 dark:text-white text-white" />
  //               </Button>
  //             </li>
  //             <li>
  //               <Button
  //                 isIconOnly
  //                 variant="light"
  //                 color="primary"
  //                 aria-label="Like"
  //               >
  //                 <Link href="https://digigeodata.com/contact/" target="_blank">
  //                   <MdEmail className="h-6 w-6 dark:text-white text-white" />
  //                 </Link>
  //               </Button>
  //             </li>

  //             <li>
  //               <Button variant="light" color="primary" onClick={showDisclaimer}>
  //                 <span className="font-semibold dark:text-white text-white">
  //                   Disclaimer
  //                 </span>
  //               </Button>
  //             </li>
  //             <li>
  //               <ThemeSwitcher />
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //     {disclaimerStatus && (
  //       <DialogCommonComponent
  //         title={"Disclaimer"}
  //         onClose={setdisclaimerStatus}
  //         showDialog={disclaimerStatus}
  //         onOk={() => { }}
  //       >
  //         <span>
  //           {" "}
  //           The colours of the polygons on the interactive map and the legend
  //           correspond to the properties on the map that the companies have an
  //           interest in. If a property is striped with two col urs, then both
  //           companies represented by the colours have an interest of some type
  //           in that property. Any information that is used from this map should
  //           be verified by the user with the participating companies. This map
  //           has been produced from the most current information available to
  //           DigiGeoData. Every attempt has been made to ensure the content,
  //           accuracy and completeness of this map. DigiGeoData assumes no
  //           responsibility for any errors, omissions and inaccuracies in the
  //           information provided. This map is copyright by DigiGeoData and
  //           reprinting or any form of reproduction must have prior permission.
  //         </span>
  //       </DialogCommonComponent>
  //     )}
  //     {/* {helpDialogStatus && (
  //       <DialogCommonComponent
  //         title={"Help"}
  //         onClose={sethelpDialogStatus}
  //         showDialog={helpDialogStatus}
  //         onOk={() => {}}
  //       >
  //         <span> Stay tuned for our Help Center.</span>
  //       </DialogCommonComponent>
  //     )} */}
  //   </header>
  // );
};

export default HomeNavbar;
