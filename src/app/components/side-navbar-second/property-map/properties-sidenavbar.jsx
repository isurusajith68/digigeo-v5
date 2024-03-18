"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
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
  setIsPropertiesSideNavOpen,
  setSyncPropertyFeatures,
  setpropertyMapFpropLayerVisible,
  setsyncClaimLinkPropertyFeatures
} from "../../../../store/properties-map/properties-map-slice";
import TreeView from "../../common-comp/treeview";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import AreaTreeView from "../area-map/area-tree-view";
import PropertyFeaturedCompanyDetailDiv from "./property-featured-company-detail-div";
import PropertyTreeView from "./property-tree-view";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import PropertyFCompanyPopup from "./property-fcompany-popup";
import AccordionItemWithOutEye from "../../common-comp/accordion-without-eye";






const PropertiesSideNavbar = () => {
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

  const isPropertiesSideNavOpen = useSelector(
    (state) => state.propertiesMapReducer.isPropertiesSideNavOpen
  );
  const propertiesLyrs = useSelector(
    (state) => state.mapSelectorReducer.propertiesLyrs
  );
  const propertiesZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.propertiesZoomLevel
  );

  const propertiesInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.propertiesInitialCenter
  );

  const propertySearchQuery = useSelector(
    (state) => state.propertiesMapReducer.propertySearchQuery
  );

  // const propertyMapPropertyAssetIdCsv = useSelector((state) => state.propertiesMapReducer.propertyMapPropertyAssetIdCsv);

  const syncPropertyFeatures = useSelector(
    (state) => state.propertiesMapReducer.syncPropertyFeatures
  );
  // const companyId = useSelector((state) => state.companyMapReducer.companyId);
  // const companyStockcode = useSelector((state) => state.companyMapReducer.companyStockcode);

  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [selectedAssetTypes, setselectedAssetTypes] = useState("");
  const [selectedCommodities, setselectedCommodities] = useState("");

  //searchParam Redux

  const searchParamPropertyName = useSelector(
    (state) => state.propertiesMapReducer.searchParamPropertyName
  );
  const searchParamCountry = useSelector(
    (state) => state.propertiesMapReducer.searchParamCountry
  );
  const searchParamStateProv = useSelector(
    (state) => state.propertiesMapReducer.searchParamStateProv
  );
  const searchParamMiningArea = useSelector(
    (state) => state.propertiesMapReducer.searchParamMiningArea
  );
  const searchParamAssetTypeList = useSelector(
    (state) => state.propertiesMapReducer.searchParamAssetTypeList
  );
  const searchParamCommodityList = useSelector(
    (state) => state.propertiesMapReducer.searchParamCommodityList
  );

  useEffect(()=>{

    if(searchParamAssetTypeList?.length>0){
      setselectedAssetTypes(searchParamAssetTypeList.join(","))
    }

  },[searchParamAssetTypeList])

  useEffect(()=>{

    if(searchParamCommodityList?.length>0){

      setselectedCommodities(searchParamCommodityList.join(","))
    }

  },[searchParamCommodityList])
  //data load
  useEffect(() => {
   
      getFeaturedCompanyDetails();
      getSyncPropertiesGeometry();
      getClaimLinkPropertiesGeometry();
      getAssetsGeometry();
      getFeaturedPropertyGeom();
   
  }, [propertySearchQuery]);

  const closeSecondNavBar = () => {
    // setIsSecondSideOpen(false);
    let newUrl;
    newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=false&lyrs=${propertiesLyrs}&z=${propertiesZoomLevel}&c=${propertiesInitialCenter}`;

    window.history.replaceState({}, "", newUrl);
    dispatch(setIsPropertiesSideNavOpen(false));
  };

  const getFeaturedPropertyGeom = async () => {
    const f = async () => {
      if(propertySearchQuery){
          const res = await fetch(
            `https://atlas.ceyinfo.cloud/matlas/fpropertygeomuniversal/${propertySearchQuery}`,
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

         
          dispatch(setFPropertyFeatures(gj));
        
      } else {
          dispatch(setFPropertyFeatures({}));
        }
    };

    f().catch(console.error);
  };

  const getFeaturedCompanyDetails = async () => {
    const f = async () => {
      if(propertySearchQuery){
            const res = await fetch(
              `https://atlas.ceyinfo.cloud/matlas/hotplayfcompanylist_pmap/${propertySearchQuery}`,
              { cache: "no-store" }
            );
            const d = await res.json();
            

            setFeaturedCompanies(d.data);
      }
      else{
            setFeaturedCompanies([]);
      }
     
    };

    f().catch(console.error);
  };

  const getSyncPropertiesGeometry = async () => {
   
    const f = async () => {
       if(propertySearchQuery){
          const res = await fetch(
            `https://atlas.ceyinfo.cloud/matlas/propertygeomuniversal/${propertySearchQuery}`,
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
          dispatch(setSyncPropertyFeatures(gj));
        }else{
          dispatch(setSyncPropertyFeatures({}));
        }
    };
    f().catch(console.error);
  };
  const getAssetsGeometry = async () => {
    const f = async () => {
       if(propertySearchQuery){
            const res = await fetch(
              `https://atlas.ceyinfo.cloud/matlas/pmapassetgeomuniversal/${propertySearchQuery}`,
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
            dispatch(setAssetFeatures(gj));
          }else{
              dispatch(setAssetFeatures({}));
          }
      //console.log("gj", gj);
    };
    f().catch(console.error);
  };

  const getClaimLinkPropertiesGeometry = async () => {
    const f = async () => {
       if(propertySearchQuery){
          const res = await fetch(
            `https://atlas.ceyinfo.cloud/matlas/pmapclinkgeomuniversal/${propertySearchQuery}`,
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
          dispatch(setsyncClaimLinkPropertyFeatures(gj));
        }
        else{
           dispatch(setsyncClaimLinkPropertyFeatures({}));
        }
    };

    f().catch(console.error);
  };

  const propertyMapFpropLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapFpropLayerVisible
  );

  const setareaFpropLayerVisibility = (e) => {
    
    dispatch(setpropertyMapFpropLayerVisible(!propertyMapFpropLayerVisible));
  };

  const popupFcompanyId = useSelector(
  (state) => state.propertiesMapReducer.popupFcompanyId
  );

  return (
    <section className="flex gap-6">
      <div className={`duration-500 flex w-auto`}>
        <div
          className={`
        ${
          isPropertiesSideNavOpen && isSideNavOpen
            ? "bg-white dark:bg-black border-2 rounded-md border-blue-700"
            : ""
        } 
           
        ${
          isPropertiesSideNavOpen && isSideNavOpen ? "w-80 sm:w-72 mr-2" : "w-0"
        } 
        duration-500`}
        >
          <div
            className={`${
              isPropertiesSideNavOpen && isSideNavOpen
                ? "py-0.1 flex flex-col "
                : "hidden"
            }`}
          >
            <div className="ml-2 mr-2 mt-1 mb-1 flex items-center justify-center border-b-2 relative">
              <span className="font-bold">Property List </span>
              <AiOutlineCloseCircle
                onClick={closeSecondNavBar}
                className="h-6 w-6 text-blue-700 cursor-pointer absolute right-0"
              />
            </div>
          </div>
          <div>
            <span>Filters Applied:</span>
            <Breadcrumbs
              separator="/"
              itemClasses={{
                separator: "px-2",
              }}
            >
              {searchParamPropertyName != "" &&
                searchParamPropertyName != null && (
                  <BreadcrumbItem>
                    {"Property Name Like:" + searchParamPropertyName}
                  </BreadcrumbItem>
                )}
              {searchParamCountry != "" && (
                <BreadcrumbItem>
                  {"Country:" + searchParamCountry}
                </BreadcrumbItem>
              )}
              {searchParamStateProv != "" && (
                <BreadcrumbItem>
                  {"State/Province:" + searchParamStateProv}
                </BreadcrumbItem>
              )}
              {searchParamMiningArea != "" && (
                <BreadcrumbItem>
                  {"Area:" + searchParamMiningArea}
                </BreadcrumbItem>
              )}
              {searchParamAssetTypeList.length > 0 && (
                <BreadcrumbItem>
                  {"Asset Types:" + selectedAssetTypes}
                </BreadcrumbItem>
              )}
              {searchParamCommodityList.length > 0 && (
                <BreadcrumbItem>
                  {"Commodities:" + selectedCommodities}
                </BreadcrumbItem>
              )}
            </Breadcrumbs>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            <Accordion>
              <div className="flex flex-col gap-6">
                <AccordionItemWithEye
                  title="Featured Companies"
                  onClick={setareaFpropLayerVisibility}
                  eyeState={propertyMapFpropLayerVisible}
                >
                  <div className="flex flex-col gap-1 overflow-y-auto max-h-[40vh]">
                    {featuredCompanies?.map((i) => (
                      <PropertyFeaturedCompanyDetailDiv
                        key={i.colour}
                        title={i.company2}
                        companyid={i.companyid}
                        // onClick={() => console.log(featuredCompanies)}
                      >
                        <div
                          className={`w-4 h-4`}
                          style={{ backgroundColor: `${i.colour}` }}
                        ></div>
                      </PropertyFeaturedCompanyDetailDiv>
                    ))}
                  </div>
                </AccordionItemWithEye>
                <AccordionItemWithOutEye title="All Properties">
                  <div className="overflow-y-auto max-h-[25vh]">
                    <PropertyTreeView syncPropFeatures={syncPropertyFeatures} />
                  </div>
                </AccordionItemWithOutEye>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
      {popupFcompanyId > 0 && <PropertyFCompanyPopup />}
    </section>
  );
};
export default PropertiesSideNavbar;
