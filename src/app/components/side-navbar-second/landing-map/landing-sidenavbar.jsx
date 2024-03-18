"use client";

import { Button, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  AiFillAppstore,
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineCloseCircle,
  AiTwotoneGold,
} from "react-icons/ai";
import { BsFillArrowLeftSquareFill, BsFillBuildingsFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsSideNavOpen,
  setSelectedMap,
  setUrlUpdate,
} from "../../../../store/map-selector/map-selector-slice";
import { useRouter, useSearchParams } from "next/navigation";
import { MdLocationOn } from "react-icons/md";
import AreaFilter from "../../filter-popups/area-filters";
 
import {
  setIsLandingMapSideNavOpen,
 
  setlandingMapFpropLayerVisible,
 
} from "../../../../store/landing-map/landing-map-slice";
// import TreeView from "../../common-comp/treeview";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
// import AreaTreeView from "./area-tree-view";
import LmapFeaturedCompanyDetailDiv from "./featured-company-detail-div";
import GeoJSON from "ol/format/GeoJSON";
import LmapFCompanyPopup from "./lmap-fcompany-popup";

const LandingMapSideNavbar = () => {
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
  
  const [isSecondSideOpen, setIsSecondSideOpen] = useState(false);
  const [treeViewData, settreeViewData] = useState();
  
  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );
  const isLandingMapSideNavOpen = useSelector(
    (state) => state.landingMapReducer.isLandingMapSideNavOpen
  );
  
  const landingMapLyrs = useSelector(
    (state) => state.mapSelectorReducer.landingMapLyrs
  );
  const landingMapZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.landingMapZoomLevel
  );

  const landingMapInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.landingMapInitialCenter
  );

  //   const areaName = useSelector((state) => state.landingMapReducer.areaMiningArea);
  //   const areaCountry = useSelector((state) => state.landingMapReducer.areaCountry);

  const syncPropertyFeatures = useSelector(
    (state) => state.landingMapReducer.syncPropertyFeatures
  );

   const featuredPropertyFeatures = useSelector(
     (state) => state.landingMapReducer.featuredPropertyFeatures
  );


  

   const [featuredCompanies, setFeaturedCompanies] = useState([]);

   useEffect(()=>{
     if (featuredPropertyFeatures) {
       const result = Object.groupBy(featuredPropertyFeatures, ({ companyid }) => companyid);
       //console.log("result11", result);
       const a = Object.keys(result).map(k => result[k][0]);
       console.log("result12", a);
       setFeaturedCompanies(a);
     }
    // console.log("ppo",featuredPropertyFeatures)
   },[featuredPropertyFeatures])
  //areal load
  //   useEffect(() => {
  //     if (areaName) {
  //       getFeaturedCompanyDetails();
  //       getSyncPropertiesGeometry();
  //       getFeaturedCompanyGeometry();
  //       getClaimLinkPropertiesGeometry();
  //       getAssetsGeometry();
  //     } else {
  //       setFeaturedCompanies([]);
  //       dispatch(setSyncPropertyFeatures({}));
  //       dispatch(setFPropertyFeatures({}));
  //       dispatch(setAssetFeatures({}));
  //       dispatch(setsyncClaimLinkPropertyFeatures({}));
  //     }
  //   }, [areaName]);

  const closeSecondNavBar = () => {
    // setIsSecondSideOpen(false);
    let newUrl;
    if (areaName == "") {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${landingMapLyrs}&z=${landingMapZoomLevel}&c=${landingMapInitialCenter}`;
    } else {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${landingMapLyrs}&z=${landingMapZoomLevel}&c=${landingMapInitialCenter}&co=${areaCountry}&ma=${areaName}`;
    }
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsLandingMapSideNavOpen(false));
  };

  // const getFeaturedCompanyDetails = async () => {
  //   const f = async () => {
  //     console.log("areaName", areaName);
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/hotplayfcompanylist/${areaName}`,
  //       { cache: "no-store" }
  //     );
  //     const d = await res.json();
  //     // console.log("fps", d);

  //     setFeaturedCompanies(d.data);
  //     // d.data[0].json_build_object.features.map((i) =>
  //     //   console.log("i", i.properties.colour) featuredPropertyFeatures
  //     // );
  //   };

  //   f().catch(console.error);
  // };

  // const getClaimLinkPropertiesGeometry = async () => {
  //   const f = async () => {
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/tbl_sync_claimlink/${areaName}`,
  //       { cache: "no-store" }
  //     );
  //     const d = await res.json();
  //     // console.log("fps", d);

  //     const gj = {
  //       type: "FeatureCollection",
  //       crs: {
  //         type: "name",
  //         properties: {
  //           name: "EPSG:3857",
  //         },
  //       },
  //       features: d.data[0].json_build_object.features,
  //     };
  //     dispatch(setsyncClaimLinkPropertyFeatures(gj));
  //   };

  //   f().catch(console.error);
  // };
  // const getFeaturedCompanyGeometry = async () => {
  //   //view_hotplay_table_with_sponsor_prop
  //   const f = async () => {
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/view_hotplay_table_with_sponsor/${areaName}`,
  //       { cache: "no-store" }
  //     );
  //     const d = await res.json();

  //     const gj = {
  //       type: "FeatureCollection",
  //       crs: {
  //         type: "name",
  //         properties: {
  //           name: "EPSG:3857",
  //         },
  //       },
  //       features: d.data[0].json_build_object.features,
  //     };

  //     // const e =   new GeoJSON().readFeatures(gj)

  //     dispatch(setFPropertyFeatures(gj));
  //   };

  //   f().catch(console.error);
  // };
  // const getSyncPropertiesGeometry = async () => {
  //   const f = async () => {
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/tbl_sync_property_area/${areaName}`,
  //       { cache: "no-store" }
  //     );
  //     const d = await res.json();
    

  //     const gj = {
  //       type: "FeatureCollection",
  //       crs: {
  //         type: "name",
  //         properties: {
  //           name: "EPSG:3857",
  //         },
  //       },
  //       features: d.data[0].json_build_object.features,
  //     };
  //     dispatch(setSyncPropertyFeatures(gj));
  //     console.log("gj", gj);
  //   };
  //   f().catch(console.error);
  // };
  // const getAssetsGeometry = async () => {
  //   const f = async () => {
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/assetgeomsbyarea/${areaName}`,
  //       { cache: "no-store" }
  //     );
  //     const d = await res.json();
  //     // console.log("fps", d);
  //     console.log("assets", d.data);

     

  //     const gj = {
  //       type: "FeatureCollection",
  //       crs: {
  //         type: "name",
  //         properties: {
  //           name: "EPSG:3857",
  //         },
  //       },
  //       features: d.data[0].json_build_object.features,
  //     };
  //     dispatch(setAssetFeatures(gj));
  //     //console.log("gj", gj);
  //   };
  //   f().catch(console.error);
  // };

  const landingMapFpropLayerVisible = useSelector(
    (state) => state.landingMapReducer.landingMapFpropLayerVisible
  );

  const setlandingMapFpropLayerVisibility = (e) => {
    console.log("setareaFpropLayerVisibility");
    dispatch(setlandingMapFpropLayerVisible(!landingMapFpropLayerVisible));
  };

  const popupFcompanyId = useSelector(
    (state) => state.landingMapReducer.popupFcompanyId
  );

  // useEffect(()=>{

  // },[featuredPropertyFeatures])

  return (
    <section className="flex gap-6 h-[90vh]">
      <div className={`duration-500 flex w-auto h-full`}>
        <div
          className={`
          ${
            isLandingMapSideNavOpen && isSideNavOpen
              ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
              : ""
          } 
            
          ${
            isLandingMapSideNavOpen && isSideNavOpen
              ? "w-80 sm:w-72 mr-2"
              : "w-0"
          } 
          duration-500`}
        >
          <div
            className={`${
              isLandingMapSideNavOpen && isSideNavOpen
                ? "py-0.1 flex flex-col  "
                : "hidden"
            }`}
          >
            <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2 relative">
              <div className="flex flex-col">
                {/* {areaCountry && (
                  <span className="font-bold block">
                    {areaName}/{areaCountry}
                  </span>
                )} */}
                <span className="font-bold block">Exploration Activities</span>
              </div>
              {/* <AiOutlineCloseCircle
                onClick={closeSecondNavBar}
                className="h-6 w-6 text-blue-700 cursor-pointer absolute right-0"
              /> */}
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative h-full">
            {/* <TreeView data={treeData} /> */}
            <div>
              <Accordion>
                <div className="flex flex-col gap-6 ">
                  <AccordionItemWithEye
                    title="Featured Companies"
                    onClick={setlandingMapFpropLayerVisibility}
                    eyeState={landingMapFpropLayerVisible}
                  >
                    <div className="flex flex-col gap-1 overflow-y-scroll h-[75vh] mb-1">
                      {featuredCompanies?.map((i) => (
                        <LmapFeaturedCompanyDetailDiv
                          key={i.id}
                          title={i.company2 + i.companyid + "-" +i.id }
                          companyid={i.companyid}
                          // onClick={() => console.log(featuredCompanies)}
                        >
                          <div
                            className={`w-4 h-4`}
                            style={{ backgroundColor: `${i.colour}` }}
                          ></div>
                        </LmapFeaturedCompanyDetailDiv>
                      ))}
                    </div>
                  </AccordionItemWithEye>
                  {/* <AccordionItemWithEye title="All Companies">
                    <div className="overflow-y-auto max-h-[25vh]">
                       <AreaTreeView syncPropFeatues={syncPropertyFeatures} /> 
                    </div>
                  </AccordionItemWithEye> */}
                  {/* <AccordionItemWithEye title="All Companies">
                      {JSON.stringify(syncPropertyFeatures)}
                    </AccordionItemWithEye> */}
                </div>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      {popupFcompanyId > 0 && <LmapFCompanyPopup />}
    </section>
  );
};
export default LandingMapSideNavbar;
