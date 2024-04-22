"use client";

import { Button, Input } from "@nextui-org/react";
import   { useEffect, useState } from "react";
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
  setAssetFeatures,
  setFPropertyFeatures,
  setIsAreaSideNavOpen,
  setSyncPropertyFeatures,
   setamapFpropLableVisible,
   setareaFpropLayerVisible,
  setsyncClaimLinkPropertyFeatures,
} from "../../../../store/area-map/area-map-slice";
import TreeView from "../../common-comp/treeview";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import AccordionItemWithOutEye from "../../common-comp/accordion-without-eye";
import AreaTreeView from "./area-tree-view";
import FeaturedCompanyDetailDiv from "./featured-company-detail-div";
import GeoJSON from "ol/format/GeoJSON";
import AreaFCompanyPopup from "./area-fcompany-popup";
import { updateWindowsHistory } from "@/app/utils/helpers/window-history-replace";
import AccordionItemWithEyeLabel from "../../common-comp/accordion-eye-label";

const AreaSideNavbar = () => {
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

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);

  
  const syncPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.syncPropertyFeatures
  );

  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  //areal load
  useEffect(() => {
    if (areaName) {
      getFeaturedCompanyDetails();
      getSyncPropertiesGeometry();
      getFeaturedCompanyGeometry();
      getClaimLinkPropertiesGeometry();
      getAssetsGeometry();
    }
    else {
      setFeaturedCompanies([]);
      dispatch(setSyncPropertyFeatures({}));
      dispatch(setFPropertyFeatures({}));
       dispatch(setAssetFeatures({}));
        dispatch(setsyncClaimLinkPropertyFeatures({}));
    }
  }, [areaName]);

  const closeSecondNavBar = () => {
    // setIsSecondSideOpen(false);
    let newUrl;
    if (areaName == "") {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    } else {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaName}`;
    }
    // window.history.replaceState({}, "", newUrl);
     updateWindowsHistory(newUrl);
    dispatch(setIsAreaSideNavOpen(false));
  };
  const getFeaturedCompanyDetails = async () => {
    const f = async () => {
      console.log("areaName",areaName,)
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/hotplayfcompanylist/${areaName}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d);
      
      setFeaturedCompanies(d.data);
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // );
    };

    f().catch(console.error);
  };
  
      const getClaimLinkPropertiesGeometry = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/tbl_sync_claimlink/${areaName}`,
        { cache: "no-store" }
      );
     const d = await res.json();
      // console.log("fps", d);
       
      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      dispatch(setsyncClaimLinkPropertyFeatures(gj));
    };

    f().catch(console.error);
  };
  const getFeaturedCompanyGeometry = async () => {
        //view_hotplay_table_with_sponsor_prop
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/view_hotplay_table_with_sponsor/${areaName}`,
        { cache: "no-store" }
      );
     const d = await res.json();
     
      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };

     // const e =   new GeoJSON().readFeatures(gj)

      dispatch(setFPropertyFeatures(gj));
    };

    f().catch(console.error);
  };
  const getSyncPropertiesGeometry = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/tbl_sync_property_area/${areaName}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d);
      // console.log("fps", d.data);

      // setFeaturedCompanies(d.data);
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // ); setSyncPropertyFeatures

      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      dispatch(setSyncPropertyFeatures(gj));
      console.log("gj", gj);
    };
    f().catch(console.error);
  };
  const getAssetsGeometry = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/assetgeomsbyarea/${areaName}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      // console.log("fps", d);
      console.log("assets", d.data);

      // setFeaturedCompanies(d.data);
      // d.data[0].json_build_object.features.map((i) =>
      //   console.log("i", i.properties.colour)
      // ); setSyncPropertyFeatures

      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
      dispatch(setAssetFeatures(gj));
      //console.log("gj", gj);
    };
    f().catch(console.error);
  };

    const areaFpropLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaFpropLayerVisible
  );

    const setareaFpropLayerVisibility = (e) => {
     console.log("setareaFpropLayerVisibility")
      dispatch(setareaFpropLayerVisible(!areaFpropLayerVisible));
  }

    const popupFcompanyId = useSelector(
      (state) => state.areaMapReducer.popupFcompanyId
    );

  
  const setFpropLableVisibility = (state) => {
    dispatch(setamapFpropLableVisible(state));
  };
  const amapFpropLableVisible = useSelector(
    (state) => state.areaMapReducer.amapFpropLableVisible
  );

  return (
    <>
      <div className={` flex `}>
        <div
          className={`
          ${
            isAreaSideNavOpen && isSideNavOpen
              ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
              : ""
          } 
            
          ${isAreaSideNavOpen && isSideNavOpen ? "w-80 sm:w-72 mr-2" : "w-0"} 
          duration-500`}
        >
          <div
            className={`${
              isAreaSideNavOpen && isSideNavOpen
                ? "py-0.1 flex flex-col  "
                : "hidden"
            }`}
          >
            <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2 relative dark:text-white text-black">
              <div className="flex flex-col">
                {areaCountry && (
                  <span className="font-bold block">
                    {areaName}/{areaCountry}
                  </span>
                )}
                <span className="font-bold block">Exploration Activities</span>
              </div>
              <AiOutlineCloseCircle
                onClick={closeSecondNavBar}
                className="h-6 w-6 text-blue-700 cursor-pointer absolute right-0"
              />
            </div>
          </div>
          {/* <div className="mt-4 flex flex-col justify-between gap-4 relative"> */}
            {/* <TreeView data={treeData} /> */}

            {/* <Accordion> */}
              <div className="flex flex-col gap-2 justify-between ">
            <AccordionItemWithEyeLabel
                  title="Featured Companies"
                  onClick={setareaFpropLayerVisibility}
              eyeState={areaFpropLayerVisible}
              labelState={amapFpropLableVisible}
              setLabelState={setFpropLableVisibility}
                >
                  <div className="flex flex-col gap-1 overflow-y-auto grow max-h-[50vh]">
                    {/* <div className="flex flex-col gap-1 overflow-y-auto max-h-[40vh]"> */}
                    {featuredCompanies.map((i) => (
                      <FeaturedCompanyDetailDiv
                        key={i.colour}
                        title={i.company2}
                        companyid={i.companyid}
                        // onClick={() => console.log(featuredCompanies)}
                      >
                        <div
                          className={`w-4 h-4`}
                          style={{ backgroundColor: `${i.colour}` }}
                        ></div>
                      </FeaturedCompanyDetailDiv>
                    ))}
                  </div>
            </AccordionItemWithEyeLabel>
                <AccordionItemWithOutEye title="All Companies">
                  <div className="overflow-y-auto grow max-h-[62vh]">
                    {/* <div className="overflow-y-auto max-h-[25vh]"> */}
                    <AreaTreeView syncPropFeatues={syncPropertyFeatures} />
                  </div>
                </AccordionItemWithOutEye>
              </div>
            {/* </Accordion> */}
          {/* </div> */}
        </div>
      </div>
      {popupFcompanyId > 0 && <AreaFCompanyPopup />}
    </>
  );
};
export default AreaSideNavbar;
