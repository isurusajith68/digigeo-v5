"use client";

import { useDispatch, useSelector } from "react-redux";
import { WorkspanSelector } from "../map-workspans/workspan-selector";
import SideNavbar from "../side-navbar/sidenavbar-component";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  setAreaInitialCenter,
  setAreaLyrs,
  setAreaZoomLevel,
  setCompanyInitialCenter,
  setCompanyLyrs,
  setCompanyZoomLevel,
  setIsSideNavOpen,
  setPropertiesInitialCenter,
  setPropertiesLyrs,
  setPropertiesZoomLevel,
  setSelectedMap,
  setmapViewMode,
} from "../../../store/map-selector/map-selector-slice";
import {
  setAreaCountry,
  setAreaMiningArea,
  setAreaZoomMode,
  setIsAreaSideNavOpen,
  setareaSelectedAreaId,
} from "../../../store/area-map/area-map-slice";
// import { setIsPropertiesSideNavOpen } from "@/store/properties-map/properties-map-slice";
import { setIsPropertiesSideNavOpen } from "../../../store/properties-map/properties-map-slice";
import { setIsCompanySideNavOpen } from "../../../store/company-map/company-map-slice";
import { fetchmapViewScales } from "@/store/map-view-settings/map-view-setting-slice";
import { MapViewMode } from "@/store/types";
import { useMediaQuery } from 'react-responsive'


 

export const LandingPage = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) { }

  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const mapType = searchParams.get("t");
  const isNavOpen = searchParams.get("sn");
  const isSecondNavOpen = searchParams.get("sn2");
  const mapLyrs = searchParams.get("lyrs");
  const mapZoom = searchParams.get("z");
  const mapCenter = searchParams.get("c");
  const areaName = searchParams.get("ma");
  const areaCountry = searchParams.get("co");
  const areaid = searchParams.get("aid");
  const mapViewMode = searchParams.get("mvm") ?? "HEADED";
  // const mapViewMode = searchParams.get("mvm") ?? MapViewMode.HEADLESS;

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })


  useEffect(() => {

    updateMapSelectorStore();
    dispatch(fetchmapViewScales());
    console.log("mapViewMode",mapViewMode,)
  }, []);

  const updateMapSelectorStore = async () => {
    console.log("mapType",mapType,)
    if (mapType) {

      dispatch(setareaSelectedAreaId(areaid));
      dispatch(setAreaZoomMode("custom"));
      dispatch(setSelectedMap(mapType));
      dispatch(setmapViewMode(mapViewMode));

      switch (mapType) {
        case "area":
          dispatch(
            setIsSideNavOpen(String(isNavOpen).toLowerCase() === "true")
          );
          dispatch(
            setIsAreaSideNavOpen(
              String(isSecondNavOpen).toLowerCase() === "true"
            )
          );
          dispatch(setAreaLyrs(mapLyrs));
          dispatch(setAreaZoomLevel(mapZoom));
          const tmpMapCenter1 = mapCenter.split(",").map(Number);
          dispatch(setAreaInitialCenter(tmpMapCenter1));
          dispatch(setAreaCountry(areaCountry ? areaCountry : ""));
          dispatch(setAreaMiningArea(areaName ? areaName : ""));
          break;
        case "company":
          dispatch(
            setIsSideNavOpen(String(isNavOpen).toLowerCase() === "true")
          );
          dispatch(
            setIsCompanySideNavOpen(
              String(isSecondNavOpen).toLowerCase() === "true"
            )
          );
          dispatch(setCompanyLyrs(mapLyrs));
          dispatch(setCompanyZoomLevel(mapZoom));
          const tmpMapCenter3 = mapCenter.split(",").map(Number);
          dispatch(setCompanyInitialCenter(tmpMapCenter3));

          break;
        case "properties":
          dispatch(
            setIsSideNavOpen(String(isNavOpen).toLowerCase() === "true")
          );
          dispatch(
            setIsPropertiesSideNavOpen(
              String(isSecondNavOpen).toLowerCase() === "true"
            )
          );
          dispatch(setPropertiesLyrs(mapLyrs));
          dispatch(setPropertiesZoomLevel(mapZoom));
          const tmpMapCenter2 = mapCenter.split(",").map(Number);
          dispatch(setPropertiesInitialCenter(tmpMapCenter2));

          break;

        default:
          console.log("isTabletOrMobile",isTabletOrMobile,)
          if (isTabletOrMobile) {
            dispatch(
              setIsSideNavOpen(String(isNavOpen).toLowerCase() === "false")
            );
            dispatch(
              setIsPropertiesSideNavOpen(
                String(isSecondNavOpen).toLowerCase() === "false"
              )
            );
          } else {
            dispatch(
              setIsSideNavOpen(String(isNavOpen).toLowerCase() === "true")
            );
            dispatch(
              setIsPropertiesSideNavOpen(
                String(isSecondNavOpen).toLowerCase() === "true"
              )
            );
          }

          dispatch(setPropertiesLyrs(mapLyrs));
          dispatch(setPropertiesZoomLevel(mapZoom));
          const tmpMapCenter4 = mapCenter.split(",").map(Number);
          dispatch(setPropertiesInitialCenter(tmpMapCenter4));
          break;
      }
      // const newUrl = `${window.location.pathname}?t=${mapType}&sn=${isNavOpen}&sn2=${isSecondNavOpen}&lyrs=${mapLyrs}&z=${mapZoom}&c=${mapCenter}`;
      // window.history.replaceState({}, "", newUrl);
    } else {
      if (isTabletOrMobile) {
        dispatch(
          setIsSideNavOpen(String(isNavOpen).toLowerCase() === "false")
        );
        dispatch(
          setIsPropertiesSideNavOpen(
            String(isSecondNavOpen).toLowerCase() === "false"
          )
        );
      }
    }
  };

  return (
    <div className="w-full flex bg-white   h-[90vh]">
      <div className={`${isSideNavOpen ? "z-10 h-full" : "fixed top-15 left-0 z-10"}    ${mapViewMode == "HEADED" ? "block" : "hidden"}`}>
        <SideNavbar />
      </div>
      <div className="z-0">
        <WorkspanSelector />
      </div>
    </div>
  );
};
