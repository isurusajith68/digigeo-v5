"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import "ol/ol.css";
import { Map } from "@react-ol/fiber";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup } from "@nextui-org/react";
import {
  setAreaInitialCenter,
  setAreaLyrs,
  setAreaZoomLevel,
  setUrlUpdate,
  setIsSideNavOpen,
} from "../../../store/map-selector/map-selector-slice";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import AreaSideNavbar from "../side-navbar-second/area-sidenavbar";
import { FaChevronLeft, FaChevronUp } from "react-icons/fa";
import { setIsAreaSideNavOpen } from "../../../store/area-map/area-map-slice";
import GeoJSON from "ol/format/GeoJSON";

import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";
import { areaMapAssetVectorLayerStyleFunction } from "./asset-styles";

const AreaMap2 = () => {
  const fill = new Fill();
  const stroke = new Stroke({
    color: "rgba(0,0,0,0.8)",
    width: 2,
  });
  const areaMApPropertyVectorRendererFuncV2 = (pixelCoordinates, state) => {
    console.log("sssss", state);
    const context = state.context;
    const geometry = state.geometry.clone();
    geometry.setCoordinates(pixelCoordinates);
    const extent = geometry.getExtent();
    const width = getWidth(extent);
    const height = getHeight(extent);
    //new code
    const svgtext2 = state.feature.get("hatch");
    const img = new Image();

    // img.onload = function () {
    //   feature.set("flag", img);
    // };

    img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);

    //end new code
    //  const flag = state.feature.get("flag");
    const flag = img;
    if (!flag || height < 1 || width < 1) {
      return;
    }

    context.save();
    const renderContext = toContext(context, {
      pixelRatio: 1,
    });

    renderContext.setFillStrokeStyle(fill, stroke);
    renderContext.drawGeometry(geometry);

    context.clip();

    // Fill transparent country with the flag image
    const bottomLeft = getBottomLeft(extent);
    const left = bottomLeft[0];
    const bottom = bottomLeft[1];
    const hf = width / (height * 8);
    context.drawImage(flag, left, bottom, width * 20, height * hf * 20);

    context.restore();
  };

  const areaMap_tbl_sync_claimlink_VectorLayerStyleFunction = (
    feature,
    resolution
  ) => {
    //console.log("feature:", feature);
    //  let spanClaim1 = document.getElementById("spanClaimsLayerVisibility");
    //  spanClaim1.textContent = "visibility";
    // const r = Math.random() * 255;
    // const g = Math.random() * 255;
    // const b = Math.random() * 255;
    //console.log("fill", feature.values_.hatch);
    const colour = "#0000FF"; //feature.values_.colour;
    //console.log("colour", colour);
    // const fill = new Fill({
    //   color: `rgba(${r},${g},${b},1)`,
    //   opacity:1,
    // });
    // const fill = new Fill({
    //   // color: `rgba(${r},${g},${b},1)`,

    //   color:colour,
    //   opacity: 1,
    // });
    const fill = new Fill({
      // color: `rgba(${r},${g},${b},1)`,

      color: colour,
      opacity: 0.3,
    });

    const stroke = new Stroke({
      color: "darkblue",
      width: 1.25,
    });
    //console.log("res22", resolution);

    // let svgScale = 0;
    // let radius = 0;
    //  const spanClaim = document.getElementById("spanClaimsLayerVisibility");
    //  spanClaim.textContent = "visibility_off";
    // if (resolution > 1000) {
    //   svgScale = 0.5;
    //   radius = 2;
    // } else if (resolution > 937.5) {
    //   svgScale = 0.562;
    //   radius = 5;
    // } else if (resolution > 875) {
    //   svgScale = 0.625;
    //   radius = 5;
    // } else if (resolution > 750) {
    //   svgScale = 0.75;
    //   radius = 5;
    // } else if (resolution > 625) {
    //   svgScale = 0.875;
    //   radius = 5;
    // } else if (resolution > 500) {
    //   svgScale = 1;
    //   radius = 5;
    // } else if (resolution > 375) {
    //   svgScale = 1.125;
    //   radius = 5;
    // } else if (resolution > 250) {
    //   svgScale = 1.25;
    //   radius = 5;
    // } else if (resolution > 125) {
    //   svgScale = 1.375;
    //   radius = 5;
    //   // const spanClaim = document.getElementById("spanClaimsLayerVisibility");
    //   // spanClaim.textContent = "visibility";
    // } else {
    //   svgScale = 1.5;
    //   radius = 10;
    // }
    let image;
    let text;

    // if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[0].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[0].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
    //     scale: svgScale,
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[2].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[2].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[2].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[3].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[3].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[3].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
    //     scale: svgScale,
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[5].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[5].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[5].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[6].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[6].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[6].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[7].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[7].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[7].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
    //     scale: svgScale,
    //   });
    // } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
    //     scale: svgScale,
    //   });
    // }
    // else {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: "pink" }),
    //     stroke: new Stroke({ color: "pink", width: 3 }),
    //   });
    // }

    //set text Style

    // text = createTextStyle(feature, resolution);
    image = new Circle({
      radius: 2,
      fill: new Fill({ color: colour }),
      stroke: new Stroke({ color: colour, width: 1 }),
    });
    const st = new Style({
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
      image,
      // text,
      fill,
    });
    // console.log("st", st);
    return st;
  };

  ///////////////////////////////////
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) {}

  const router = useRouter();
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState("");

  const mapRef = useRef();
  const dispatch = useDispatch();

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );

  const mapLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );
  const isAreaSideNavOpen = useSelector(
    (state) => state.areaMapReducer.isAreaSideNavOpen
  );

  const syncPropSourceRef = useRef(null);
  const syncPropVectorLayerRef = useRef(null);
  const fPropSourceRef = useRef(null);
  const fPropVectorLayerRef = useRef(null);
  const assetSourceRef = useRef(null);
  const assetLayerRef = useRef(null);
  const claimLinkSourceRef = useRef(null);
  const claimLinkVectorLayerRef = useRef(null);

  const syncPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.syncPropertyFeatures
  );
  const featuredPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.featuredPropertyFeatures
  );
  const syncClaimLinkPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.syncClaimLinkPropertyFeatures
  );
  const assetFeatures = useSelector(
    (state) => state.areaMapReducer.assetFeatures
  );

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);

  const areaZoomMode = useSelector(
    (state) => state.areaMapReducer.areaZoomMode
  );

  useEffect(() => {
    console.log("ue2");
    //set style
    const style = new Style({});
    style.setRenderer(areaMApPropertyVectorRendererFuncV2);

    fPropVectorLayerRef.current?.setStyle(style);
  }, [fPropVectorLayerRef.current]);

  useEffect(() => {
    if (syncPropertyFeatures) {
      syncPropSourceRef?.current?.clear();
      const e = new GeoJSON().readFeatures(syncPropertyFeatures);

      syncPropSourceRef?.current?.addFeatures(e);
    }

    if (syncPropSourceRef.current) {
      const p1 = syncPropSourceRef.current?.getExtent()[0];
      if (p1 != Infinity) {
        mapRef.current?.getView()?.fit(syncPropSourceRef.current?.getExtent(), {
          padding: [200, 200, 200, 200],
          duration: 3000,
        });
      }
    }
  }, [syncPropertyFeatures]);

  useEffect(() => {
    if (featuredPropertyFeatures) {
      fPropSourceRef?.current?.clear();
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);

      fPropSourceRef?.current?.addFeatures(e);
    }

    // if (fPropSourceRef.current) {
    //   const p1 = fPropSourceRef.current?.getExtent()[0];
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(fPropSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }

    // }
  }, [featuredPropertyFeatures]);

  useEffect(() => {
    console.log("syncClaimLinkPropertyFeatures", syncClaimLinkPropertyFeatures);
    if (syncClaimLinkPropertyFeatures?.features) {
      claimLinkSourceRef?.current?.clear();
      const e = new GeoJSON().readFeatures(syncClaimLinkPropertyFeatures);

      claimLinkSourceRef?.current?.addFeatures(e);
    }
    //  if (claimLinkSourceRef.current) {
    //    const p1= claimLinkSourceRef.current?.getExtent()[0]
    //    if (p1 != Infinity) {
    //      mapRef.current?.getView()?.fit(claimLinkSourceRef.current?.getExtent(), {
    //        padding: [200, 200, 200, 200],
    //        duration: 3000,
    //      });
    //    }

    //  }
  }, [syncClaimLinkPropertyFeatures]);

  useEffect(() => {
    console.log("assetFeatures", assetFeatures);
    if (assetFeatures?.features) {
      assetSourceRef?.current?.clear();
      const e = new GeoJSON().readFeatures(assetFeatures);

      assetSourceRef?.current?.addFeatures(e);
    }

    // if (assetSourceRef.current) {
    //   const p1 = assetSourceRef.current?.getExtent()[0];
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(assetSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }

    // }
  }, [assetFeatures]);

  useEffect(() => {
    mouseScrollEvent();
  }, []);

  useEffect(() => {
    let newUrl;
    if (areaName == "") {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${zoom}&c=${center}`;
    } else {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${zoom}&c=${center}&co=${areaCountry}&ma=${areaName}`;
    }
    window.history.replaceState({}, "", newUrl);
  }, [zoom, center]);

  const mouseScrollEvent = useCallback((event) => {
    const map = mapRef.current;

    // console.log("mapRef", mapRef.current?.getZoom());
    const handleMoveEnd = () => {
      // console.log("map", map);
      const tmpZoomLevel = map.getView().getZoom();
      const tmpinitialCenter = map.getView().getCenter();
      dispatch(setAreaZoomLevel(tmpZoomLevel));
      dispatch(setAreaInitialCenter(tmpinitialCenter));
      setZoom(tmpZoomLevel);
      setCenter(tmpinitialCenter);
      // router.push(
      //   `/?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`
      // );
      // console.log("tmpinitialCenter", tmpinitialCenter);
      // const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&lyrs=${mapLyrs}&z=${tmpZoomLevel}&c=${tmpinitialCenter}`;
      // window.history.replaceState({}, "", newUrl);
    };

    map?.on("moveend", handleMoveEnd);

    return () => {
      map?.un("moveend", handleMoveEnd);
    };
  }, []);

  const collapsibleBtnHandler = () => {
    const tmpValue = String(isSideNavOpen).toLowerCase() === "true";
    dispatch(setIsSideNavOpen(!tmpValue));
    let newUrl;
    if (areaName == "") {
      newUrl = `${
        window.location.pathname
      }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    } else {
      newUrl = `${
        window.location.pathname
      }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaName}`;
    }
    window.history.replaceState({}, "", newUrl);
    // dispatch(setUrlUpdate());
  };

  const setLyrs = (lyrs) => {
    dispatch(setAreaLyrs(lyrs));
    let newUrl;
    if (areaName == "") {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${lyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    } else {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${lyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaName}`;
    }
    window.history.replaceState({}, "", newUrl);
  };

  const openAreaNav = () => {
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsAreaSideNavOpen(true));
  };

  const image = new Icon({
    src: "./sync-prop.svg",
    scale: 1,
  });

  const styleFunctionSyncProperties = (feature) => {
    console.log("s");
    const s = new Style({
      image,
      stroke: new Stroke({
        color: "red",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(255,23,0,0.2)",
      }),
    });

    return s;
  };

  const areaFpropLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaFpropLayerVisible
  );
  const areaAssetLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetLayerVisible
  );
  const areaSyncPropLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncPropLayerVisible
  );
  const areaSyncClaimLinkLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncClaimLinkLayerVisible
  );

  useEffect(() => {
    fPropVectorLayerRef?.current?.setVisible(areaFpropLayerVisible);
  }, [areaFpropLayerVisible]);
  useEffect(() => {
    claimLinkVectorLayerRef?.current?.setVisible(areaSyncClaimLinkLayerVisible);
  }, [areaSyncClaimLinkLayerVisible]);
  useEffect(() => {
    syncPropVectorLayerRef?.current?.setVisible(areaSyncPropLayerVisible);
  }, [areaSyncPropLayerVisible]);
  useEffect(() => {
    assetLayerRef?.current?.setVisible(areaAssetLayerVisible);
  }, [areaAssetLayerVisible]);

  return (
    <div className="flex">
      <AreaSideNavbar />
      <div className="relative">
        <div className="w-12 absolute left-0 top-0 z-50 ml-2">
          <div className="flex flex-col gap-4 mt-2">
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <BsFillArrowLeftSquareFill
                // size={26}
                className={`cursor-pointer text-white h-6 w-6 ${
                  isSideNavOpen ? "" : "rotate-180"
                }`}
                onClick={() => collapsibleBtnHandler()}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <GiEarthAmerica className={`text-white cursor-pointer h-6 w-6`} />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <AiFillPlusSquare
                className={`text-white cursor-pointer h-6 w-6`}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <AiFillMinusSquare
                className={`text-white cursor-pointer h-6 w-6`}
              />
            </Button>
            {/* {!isAreaSideNavOpen && isSideNavOpen ? (
              <Button
                variant="bordered"
                className="bg-blue-900 mt-12 -ml-5 rotate-90"
                onClick={openAreaNav}
              >
                <FaChevronUp className={`text-white cursor-pointer h-6 w-6`} />
              </Button>
            ) : null} */}
          </div>
        </div>
        <ButtonGroup
          variant="faded"
          className="absolute left-0 bottom-0 z-50 m-2"
          color="primary"
        >
          <Button
            onClick={() => setLyrs("m")}
            className={`${
              mapLyrs == "m"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Map
          </Button>
          <Button
            onClick={() => setLyrs("s")}
            className={`${
              mapLyrs == "s"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Satelite
          </Button>
          <Button
            onClick={() => setLyrs("p")}
            className={`${
              mapLyrs == "p"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            } `}
          >
            Terrain
          </Button>
        </ButtonGroup>
        <Map
          ref={mapRef}
          style={{
            width: isSideNavOpen ? "80vw" : "100vw",
            // width: `${isAreaSideNavOpen ? "75vw" : "100vw"}`,
            height: "90vh",
          }}
          controls={[]}
        >
          <olView
            // ref={mapRef}
            initialCenter={[0, 0]}
            center={areaInitialCenter}
            initialZoom={2}
            zoom={areaZoomLevel}
          />
          <olLayerTile preload={Infinity}>
            {/* <olSourceOSM /> */}
            <olSourceXYZ
              args={{
                url: `https://mt0.google.com/vt/lyrs=${mapLyrs}&hl=en&x={x}&y={y}&z={z}`,
                // url: `https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}`,
              }}
            ></olSourceXYZ>
          </olLayerTile>
          <olLayerVector ref={fPropVectorLayerRef}>
            {featuredPropertyFeatures && (
              <olSourceVector ref={fPropSourceRef}></olSourceVector>
            )}
          </olLayerVector>
          <olLayerVector ref={claimLinkVectorLayerRef}>
            {syncClaimLinkPropertyFeatures && (
              <olSourceVector
                ref={claimLinkSourceRef}
                style={areaMap_tbl_sync_claimlink_VectorLayerStyleFunction}
              ></olSourceVector>
            )}
          </olLayerVector>

          {/* <olLayerVector
            ref={syncPropVectorLayerRef}
            style={styleFunctionSyncProperties}
          >
            {syncPropertyFeatures && (
              <olSourceVector
                ref={syncPropSourceRef}
                
              >
               
              </olSourceVector>
            )}
          </olLayerVector> */}
          {/* <olLayerVector
            ref={assetLayerRef}
            style={areaMapAssetVectorLayerStyleFunction}
          >
            {assetFeatures && (
              <olSourceVector
                ref={assetSourceRef}
                // features={syncPropertyFeatures}
              >
             
              </olSourceVector>
            )}
          </olLayerVector> */}
        </Map>
      </div>
    </div>
  );
};
{
  /* <olLayerTile>
  {/* <olSourceOSM /> */
}
//     <olSourceXYZ args={{ url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}", }} > map=m terr=p satt=s
//   </olSourceXYZ>
// </olLayerTile> */}
