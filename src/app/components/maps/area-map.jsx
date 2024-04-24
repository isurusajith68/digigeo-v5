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
  setIsSideNavOpen,
} from "../../../store/map-selector/map-selector-slice";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import AreaSideNavbar from "../side-navbar-second/area-map/area-sidenavbar";
import {
  setIsAreaSideNavOpen,
  setclickassetObject,
  setclickclaimObject,
  setclickfPropertyObject,
  setclicksyncPropertyObject,
  setareaCurrentScale,
  setareaMapViewScales
} from "../../../store/area-map/area-map-slice";
import GeoJSON from "ol/format/GeoJSON";

import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Circle,
  Text,
} from "ol/style";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";
// import { areaMapAssetVectorLayerStyleFunction } from "./asset-styles";
import { all, bbox, bbox as bboxStrategy } from "ol/loadingstrategy";
import { flyTo } from "./fly";

import AreaMapClickPopup from "./area-map-popup/area-map-click-popup";
import {
  areaMApPropertyVectorRendererFuncV2Highlight,
  areaMApPropertyVectorRendererFuncV2_labels,
  areaMapAssetVectorLayerStyleFunctionHighlited,
  areaMap_tbl_syncProperty_VectorLayerStyleFunctionHighLited,
  areaMap_tbl_sync_claimlink_VectorLayerStyleFunctionHighLight,
  styleFunctionClaimHighlight,
} from "./area-map-styles/area-map-styles";
import { toLonLat } from "ol/proj";
import { METERS_PER_UNIT } from "ol/proj/Units";
import { updateWindowsHistoryAmap } from "@/app/utils/helpers/window-history-replace";
// import Image from 'next/image'
import GetTopAds from './../advertisements/get-top-ads';
import GetRightAds from './../advertisements/get-right-ads';
import { MapViewMode, ZoomMode } from "@/store/types";
import { Tooltip } from "@nextui-org/react";
import { usePathname } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Style, Icon, Stroke, Fill, Circle, Text } from "ol/style";



export const svgZone = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="19.8px" height="19.8x">
<style type="text/css">
	.st0{fill:#221F1F;}
	.st1{fill:#FFFFFF;stroke:#221F1F;stroke-width:0.1607;stroke-miterlimit:10;}
</style>
<g>
	<circle class="st0" cx="9.9" cy="10" r="9.9"/>
	<circle class="st1" cx="9.8" cy="10.9" r="3.5"/>
	<polygon class="st1" points="13.7,8.6 17.3,15.6 10.2,15.6 	"/>
	<polygon class="st1" points="9.8,0.9 13.4,7.8 6.2,7.8 	"/>
	<polygon class="st1" points="2.3,15.6 5.9,8.6 9.5,15.6 	"/>
</g>
</svg>
`;

const svgDeposit = `<?xml version="1.0" encoding="utf-8"?>
 <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="20px" height="20x">
<style type="text/css">
	.st0{fill:#231F20;}
	.st1{fill:#FFFFFF;}
</style>
<path class="st0" d="M17.3,20H2.7C1.2,20,0,18.8,0,17.3V2.7C0,1.2,1.2,0,2.7,0h14.5C18.8,0,20,1.2,20,2.7v14.5
	C20,18.8,18.8,20,17.3,20z"/>
<path d="M17.8,16.7"/>
<path d="M2.5,1.4"/>
<g>
	<g>
		<path class="st1" d="M17.7,10.2c0,1.9-0.7,3.6-1.9,4.9c0.2,0.2,0.4,0.6,0.8,1c1.5-1.5,2.4-3.6,2.4-5.9c0-2.4-1-4.6-2.7-6.2
			c-0.4,0.2-0.8,0.4-1.2,0.6C16.6,6,17.7,8,17.7,10.2z"/>
		<path class="st1" d="M13.9,16.6c-1,0.5-2.2,0.9-3.4,0.9c-3.1,0-5.8-2-6.8-4.7c-0.3,0.3-0.6,0.7-0.9,1c0,0,0,0,0,0
			c1.3,2.9,4.3,4.9,7.7,4.9c1.5,0,2.9-0.4,4.2-1.1C14.3,17.1,14,16.8,13.9,16.6z"/>
		<path class="st1" d="M3.2,10.6c0-0.1,0-0.3,0-0.4c0-4,3.2-7.2,7.2-7.2c1.1,0,2.1,0.2,3,0.6c0.5-0.2,1-0.4,1.6-0.6
			c-1.3-0.8-2.9-1.3-4.5-1.3C5.8,1.7,2,5.5,2,10.2c0,0.6,0.1,1.1,0.2,1.6C2.5,11.5,2.8,11,3.2,10.6z"/>
	</g>
	<path class="st1" d="M11,9.3c-0.5,0.3-0.9,0.7-1.4,1c5.4,7.2,3,4,6.3,8.4H18C13.7,12.9,16.7,17,11,9.3z"/>
	<path class="st1" d="M0.9,14.1c0.6,0,1.1,0,1.5-0.6c1.2-1.4,2.5-2.6,4-3.7c0.5-0.4,1-0.6,1.6-0.1c0,0,0.1,0,0.2,0.1
		C7.8,9.1,7.4,8.5,6.9,8C5.4,8.7,1.7,12.5,0.9,14.1z"/>
	<path class="st1" d="M9,6C8.3,6.5,7.7,7,7,7.5c0.7,0.9,1.4,1.8,2.1,2.7c0.7-0.5,1.3-1,2-1.5C10.4,7.8,9.7,6.9,9,6z"/>
	<path class="st1" d="M18.2,2.7C15,3,12.3,4.4,9.6,6.2c0.3,0.4,0.6,0.8,0.8,1.1C12.9,5.4,15.4,3.9,18.2,2.7z"/>
	<path class="st1" d="M8.4,5.9C8.3,5.8,8.2,5.6,8.1,5.5c-0.5,0.3-0.9,0.7-1.4,1C6.9,6.6,7,6.8,7.1,6.9C7.6,6.6,8,6.3,8.4,5.9z"/>
</g>
</svg>
  `;

const svgOpMine = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="19.9px" height="19.9x">
<style type="text/css">
	.st0{fill:#221F1F;}
	.st1{fill:#FFFFFF;stroke:#221F1F;stroke-width:0.1607;stroke-miterlimit:10;}
</style>
<g>
	<path class="st0" d="M2.7,0l14.5,0c1.5,0,2.7,1.2,2.7,2.7v14.5c0,1.5-1.2,2.7-2.7,2.7H2.7c-1.5,0-2.7-1.2-2.7-2.7L0,2.7   C0,1.2,1.2,0,2.7,0z"></path>
	<path class="st1" d="M9.3,11.8c-0.3-0.3-0.6-0.6-0.8-0.8c2.3-2.2,4.4-4.7,7.2-6.4c-1.4,0.4-2.6,1-3.7,1.9c-0.5-0.5-1-1-1.5-1.5   c0.4-0.3,0.7-0.7,1.1-1c0.8-0.7,1.6-1.2,2.6-1.7c1.2-0.5,2.5-0.6,3.8-0.5c0.2,0,0.3,0,0.6,0.1c0,0.6,0.1,1.3,0.1,1.9   c0,1.6-0.7,3-1.7,4.3c-0.5,0.6-1,1.2-1.5,1.7c-0.7-0.7-1.4-1.4-2-2L9.3,11.8z"></path>
	<g>
		<path class="st1" d="M8.9,9.8C8.1,9,7.4,8.3,6.6,7.5C6.9,7.2,7.2,7,7.5,6.7C8.2,7.5,9,8.3,9.8,9L8.9,9.8z"></path>
		<path class="st1" d="M6.9,5.5c0.2,0.2,0.4,0.4,0.5,0.6C6.9,6.6,6.5,7,6,7.5C5.8,7.4,5.6,7.2,5.4,7c-1.6,1.6-3.1,3.1-4.6,4.6    c0,0,0,0,0,0c0-0.2,0.1-0.3,0.1-0.5c0.4-1.2,1.1-2.4,1.8-3.4c0.4-0.6,0.9-1.2,1.4-1.9C4,5.8,3.9,5.7,3.8,5.6    C4.4,5,4.9,4.4,5.5,3.9C5.6,4,5.7,4.1,5.8,4.2c1.7-1.5,3.5-2.8,5.8-3.3C10,2.4,8.5,3.9,6.9,5.5z"></path>
	</g>
	<path class="st1" d="M1.7,14.8c1.1-1.4,2.5-2,4.1-2.3c0.1,0,0.2,0,0.3,0c0.4,0,0.7-0.2,0.9-0.5c0.2-0.2,0.4-0.4,0.6-0.6   c0.3,0.3,0.7,0.7,1,1c-0.3,0.3-0.6,0.6-0.9,0.9c-0.1,0.1-0.1,0.2-0.1,0.3c-0.1,0.6-0.2,1.2-0.4,1.9c-0.2,0.9-0.7,1.7-1.4,2.4   c-0.2,0.2-0.4,0.4-0.6,0.6C4.1,17.3,2.9,16,1.7,14.8z M5.9,16.6c0.6-1,0.8-2,0.9-3.1c0-0.1-0.1-0.1-0.1-0.1   c-0.4,0.1-0.8,0.1-1.2,0.2c-0.7,0.1-1.3,0.4-1.8,0.7C4.4,15,5.1,15.8,5.9,16.6z"></path>
	<path class="st1" d="M18.4,17.7c-0.2,0.2-0.5,0.5-0.8,0.8c-2-2-5.2-5.2-7.2-7.2c0.2-0.2,0.5-0.5,0.8-0.8   C13.2,12.5,16.4,15.7,18.4,17.7z"></path>
	<path d="M1.7,1.7"></path>
	<path d="M18.5,18.5"></path>
</g>
</svg>
  `;

const svgHisMine = `<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve" width="19.9px" height="19.8x">
<style type="text/css">
	.st0{fill:#221F1F;}
	.st1{fill:#FFFFFF;stroke:#221F1F;stroke-width:0.1607;stroke-miterlimit:10;}
</style>
<g>
	<path class="st0" d="M17.2,19.9H2.8c-1.5,0-2.7-1.2-2.7-2.7V2.8c0-1.5,1.2-2.7,2.7-2.7h14.5c1.5,0,2.7,1.2,2.7,2.7v14.5   C19.9,18.7,18.7,19.9,17.2,19.9z"></path>
	<path class="st1" d="M10.7,8.2C11,8.5,11.2,8.7,11.5,9c-2.3,2.2-4.4,4.7-7.2,6.4c1.4-0.4,2.6-1,3.7-1.9c0.5,0.5,1,1,1.5,1.5   c-0.4,0.3-0.7,0.6-1.1,1c-0.8,0.7-1.6,1.2-2.6,1.7c-1.2,0.5-2.5,0.6-3.8,0.5c-0.2,0-0.3,0-0.6-0.1c0-0.6-0.1-1.3-0.1-1.9   c0-1.6,0.7-3,1.7-4.3c0.5-0.6,1-1.1,1.5-1.7c0.7,0.7,1.4,1.4,2,2L10.7,8.2z"></path>
	<g>
		<path class="st1" d="M11,10.1c0.8,0.8,1.5,1.5,2.3,2.2c-0.3,0.3-0.5,0.5-0.8,0.8c-0.8-0.8-1.5-1.5-2.3-2.3L11,10.1z"></path>
		<path class="st1" d="M13,14.4c-0.2-0.2-0.4-0.4-0.5-0.6c0.5-0.5,0.9-0.9,1.4-1.4c0.2,0.1,0.4,0.3,0.6,0.5c1.5-1.5,3.1-3.1,4.6-4.6    c0,0,0,0,0,0c0,0.2-0.1,0.3-0.1,0.5c-0.4,1.2-1.1,2.4-1.8,3.4c-0.4,0.6-0.9,1.2-1.4,1.9c0.1,0.1,0.2,0.2,0.3,0.3    c-0.6,0.6-1.1,1.1-1.7,1.7c-0.1-0.1-0.2-0.2-0.3-0.3c-1.7,1.5-3.5,2.8-5.8,3.3C9.9,17.5,11.5,16,13,14.4z"></path>
	</g>
	<path class="st1" d="M18.2,5.1c-1,1.3-2.5,2-4.1,2.2c-0.1,0-0.2,0-0.3,0c-0.4,0-0.7,0.2-0.9,0.5c-0.2,0.2-0.4,0.4-0.6,0.6   c-0.3-0.3-0.7-0.7-1-1c0.3-0.3,0.6-0.6,0.9-0.9c0.1-0.1,0.1-0.2,0.1-0.3c0.1-0.6,0.2-1.2,0.4-1.9c0.2-0.9,0.7-1.7,1.4-2.4   c0.2-0.2,0.4-0.4,0.6-0.6C15.8,2.7,17,3.9,18.2,5.1z M14,3.4c-0.6,1-0.8,2-0.9,3.1c0,0.1,0.1,0.1,0.1,0.1c0.4-0.1,0.8-0.1,1.2-0.2   c0.7-0.1,1.3-0.4,1.8-0.7C15.6,4.9,14.8,4.1,14,3.4z"></path>
	<path class="st1" d="M1.5,2.2C1.8,2,2,1.7,2.3,1.4c2,2,5.2,5.2,7.2,7.2C9.3,8.9,9,9.2,8.8,9.4C6.8,7.4,3.5,4.2,1.5,2.2z"></path>
	<path d="M18.2,18.2"></path>
	<path d="M1.5,1.4"></path>
</g>
</svg>
  `;

const svgOccurence = `<?xml version="1.0" encoding="utf-8"?>
  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 4990 4990"
    preserveAspectRatio="xMidYMid meet">
    <g id="layer101" fill="#21201e" stroke="none">
        <path d="M0 2495 l0 -2495 2495 0 2495 0 0 2495 0 2495 -2495 0 -2495 0 0 -2495z" />
    </g>
    <g id="layer102" fill="#fefefe" stroke="none">
        <path
            d="M1 3813 c1 -707 5 -1142 10 -1088 76 821 550 1546 1276 1953 282 158 627 267 931 293 65 6 122 12 127 14 6 2 -520 4 -1167 4 l-1178 1 1 -1177z" />
        <path
            d="M2730 4979 c1123 -107 2039 -959 2225 -2069 9 -52 20 -133 24 -180 5 -49 9 413 10 1088 l1 1172 -1172 -1 c-675 -1 -1137 -5 -1088 -10z" />
        <path
            d="M1484 3656 c-57 -18 -102 -54 -132 -106 l-27 -45 -3 -984 c-3 -1106 -6 -1057 68 -1131 74 -74 25 -71 1131 -68 l984 3 46 27 c54 32 94 86 109 148 8 32 10 337 8 1026 l-3 981 -30 49 c-19 30 -49 60 -79 79 l-49 30 -991 2 c-786 1 -999 -1 -1032 -11z" />
        <path
            d="M4977 2303 c-19 -471 -217 -972 -546 -1380 -94 -118 -296 -315 -406 -400 -389 -295 -828 -468 -1300 -512 -54 -5 381 -9 1088 -10 l1177 -1 0 1220 c0 671 -2 1220 -4 1220 -2 0 -6 -62 -9 -137z" />
        <path
            d="M2 1178 l-2 -1178 1223 2 c699 0 1162 4 1082 9 -468 25 -949 210 -1345 517 -117 91 -306 277 -401 395 -232 288 -391 602 -483 958 -24 94 -62 327 -69 424 -2 28 -4 -480 -5 -1127z" />
    </g>

</svg>`

const getText = function (feature, resolution) {
  // const type = dom.text.value;
  const maxResolution = 1000;
  let text = feature.get("asset_name");
  //console.log(text);
  if (text == undefined) {
    //console.log("asset_name is und");
    text = feature.get("howner_ref");
    //console.log("owner ref hot p", text);
  }
  if (resolution > maxResolution) {
    text = "";
  }
  // else if (type == "hide") {

  //   text = "";
  // } else if (type == "shorten") {
  //   text = text.trunc(12);
  // } else if (
  //   type == "wrap" &&
  //   (!dom.placement || dom.placement.value != "line")
  // ) {
  //   text = stringDivider(text, 16, "\n");
  // }

  return text;
};

const createTextStyle = function (feature, resolution) {
  // const font = 600 + " " + 65 + "/" + 65 + " " + "Sans Serif";


  return new Text({
    font: "bold 14px serif",
    text: getText(feature, resolution),

    offsetX: 0,
    offsetY: +25,
  });
};

export const assetTypesColorMappings = [
  { type: "Occurrence", color: "blue", src: "" },
  { type: "Zone", color: "red", src: "svgicons/zone_black.svg" },
  { type: "Refinery", color: "grey", src: "" },
  { type: "Mill", color: "cyan", src: "" },
  { type: "Deposit", color: "pink", src: "svgicons/deposit_black.svg" },
  { type: "Smelter", color: "orange", src: "" },
  { type: "Plant", color: "darkmagenta", src: "" },
  { type: "Tailings", color: "brown", src: "" },
  {
    type: "Operating Mine",
    color: "black",
    src: "svgicons/producing_black.svg",
  },
  {
    type: "Historical Mine",
    color: "green",
    src: "svgicons/past_producer_black.svg",
  },
];



const fill = new Fill();
const stroke = new Stroke({
  color: "rgba(0,0,0,0.8)",
  width: 2,
});

const areaMApPropertyVectorRendererFuncV2 = (pixelCoordinates, state) => {
  //  console.log("sssss", state);
  const context = state.context;
  const geometry = state.geometry.clone();
  geometry.setCoordinates(pixelCoordinates);
  const extent = geometry.getExtent();
  const width = getWidth(extent);
  const height = getHeight(extent);
  //new code
  const svgtext2 = state.feature.get("hatch");
  //  const img = new Image();

  // img.onload = function () {
  //   feature.set("flag", img);
  // };

  // img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);

  //end new code
  const flag = state.feature.get("flag");
  // const flag = img
  //   console.log("flag",flag)
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
  // console.log("featurexd:", feature);
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
const DOTS_PER_INCH = 72;
const INCHES_PER_METRE = 39.37;

function inchesPreUnit(unit) {
  return METERS_PER_UNIT[unit] * INCHES_PER_METRE;
}
function mapRatioScale({ map, toRound = true }) {
  const resolution = map.getView().getResolution();
  const unit = map.getView().getProjection().getUnits();

  let scale = resolution * inchesPreUnit(unit) * DOTS_PER_INCH;
  return toRound ? Math.round(scale) : scale;
}
const getMapResolution = (scale, unit) => {
  return scale / (inchesPreUnit(unit) * DOTS_PER_INCH);
};

export const AreaMap = () => {
  let pathname = "";
  try {
    pathname = window.location.href;
  } catch (error) { }
  //  useSelector
  const router = useRouter();
  const [center, setCenter] = useState("");
  const [zoom, setZoom] = useState("");
  const [prevSelAreaFeature, setprevSelAreaFeature] = useState();

  const [clickDataLoaded, setclickDataLoaded] = useState(false);

  const mapRef = useRef();
  const mapViewRef = useRef();
  const selectedFPropRef = useRef();
  const selectedAssetRef = useRef();
  const selectedSynPropRef = useRef();
  const selectedSynOutLineRef = useRef();
  const selectedClaimRef = useRef();
  const navigatedFPropertyRef = useRef();

  const dispatch = useDispatch();

  const areaFlyToLocation = useSelector(
    (state) => state.areaMapReducer.areaFlyToLocation
  );
  const navigatedFPropId = useSelector(
    (state) => state.areaMapReducer.navigatedFPropId
  );
  const areaSyncPropLayerAlwaysVisible = useSelector(
    (state) => state.areaMapReducer.areaSyncPropLayerAlwaysVisible
  );
  const areaAssetLayerAlwaysVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetLayerAlwaysVisible
  );

  const areaMapViewScales = useSelector(
    (state) => state.areaMapReducer.areaMapViewScales
  );
  const areaSelectedAreaId = useSelector(
    (state) => state.areaMapReducer.areaSelectedAreaId
  );
  const areaZoomMode = useSelector(
    (state) => state.areaMapReducer.areaZoomMode
  );

  const mapViewMode = useSelector((state) => state.mapSelectorReducer.mapViewMode);



  //
  const [coordinates, setCoordinates] = useState(undefined);
  const [popup, setPopup] = useState();
  const [clickedOnFeature, setclickedOnFeature] = useState(false);
  const [mapScale, setmapScale] = useState(0);
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);

  const [assetObject, setassetObject] = useState();
  const [fPropertyObject, setfPropertyObject] = useState();
  const [syncPropertyObject, setsyncPropertyObject] = useState();
  const [claimObject, setclaimObject] = useState();
  const [mapUnits, setmapUnits] = useState("m");
  const [mapViewScales, setmapViewScales] = useState([]);

  // const pathname2 = usePathname()

  useEffect(() => {
    if (navigatedFPropertyRef.current) {
      const fp = navigatedFPropertyRef.current.find(
        (f) => f.get("id") == navigatedFPropId
      );

      const selectStyle = new Style({ zIndex: 1 });
      selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);

      fp?.setStyle(selectStyle);
    }
  }, [navigatedFPropId]);

  useEffect(() => {
    dispatch(setclickassetObject(assetObject));
  }, [assetObject]);

  useEffect(() => {
    dispatch(setclicksyncPropertyObject(syncPropertyObject));
  }, [syncPropertyObject]);

  useEffect(() => {
    dispatch(setclickfPropertyObject(fPropertyObject));
  }, [fPropertyObject]);

  useEffect(() => {
    dispatch(setclickclaimObject(claimObject));
  }, [claimObject]);

  const onSingleclick = useCallback((evt) => {
    const { coordinate } = evt;
    setCoordinates(coordinate);
  }, []);

  const onPointerMove = useCallback((e) => {
    //console.log("pm-1",evt)

    // curAMapResolution = areaView.getResolution();

    const coordinate1 = mapRef.current.getCoordinateFromPixel(e.pixel);
    const c = toLonLat(coordinate1);
    // araemap_status_bar_lon.innerHTML = c[0].toFixed(4);
    // araemap_status_bar_lat.innerHTML = c[1].toFixed(4);
    setlong(c[0].toFixed(4));
    setlat(c[1].toFixed(4));

    // console.log("pmov-zoom end-cal started-1");
    if (selectedFPropRef.current) {
      // console.log("pmov-remove applied style-4-1-x1");
      selectedFPropRef.current.setStyle(undefined);
      selectedFPropRef.current = null;
    }
    if (selectedClaimRef.current) {
      selectedClaimRef.current.setStyle(undefined);
      selectedClaimRef.current = null;
    }
    if (selectedAssetRef.current) {
      selectedAssetRef.current.setStyle(undefined);
      selectedAssetRef.current = null;
    }

    if (selectedSynPropRef.current) {
      selectedSynPropRef.current.setStyle(undefined);
      selectedSynPropRef.current = null;
    }
    if (selectedSynOutLineRef.current) {
      selectedSynOutLineRef.current.setStyle(undefined);
      selectedSynOutLineRef.current = null;
    }
    // let fcount = 0;
    mapRef.current.forEachFeatureAtPixel(e.pixel, function (f, layer) {
      //  fcount++;

      //  console.log("pmov-features@pixel-loop-init-2");
      // console.log("layer", layer.get("id1"));
      let fill; //

      // if (layer.get("id1") == "boundary") {
      if (f.get("ft") == 0) {
        //   console.log("bo");
        //  fill = new Fill({
        //    color: "rgba(255, 255, 255, 0)",
        //  });
        // const selectStyleArea = new Style({
        //   text: new Text({
        //     text: f.get("area_name"),
        //     fill: new Fill({ color: "#0000FF" }),
        //     offsetX: 0,
        //     offsetY: 0,
        //   }),
        //   fill,
        //   stroke: new Stroke({
        //     color: "rgba(0, 0,255, 1.0)",
        //     width: 5,
        //   }),
        // });
        // selectedArea = f;
        // //selectStyle.getFill().setColor("rgba(255, 255, 255, 0)"); f.get("ft"== 1
        // //layer.get("id1") == "fproperty_areamap"
        // f.setStyle(selectStyleArea);
        // } else if (layer.get("id1") == "fproperty_areamap") {
      } else if (f.get("ft") == 1) {
        // console.log("pmov-fp found-3-0");
        //f is a area boundary
        //  console.log("qwerty");
        //  if (selectedFProp && !(selectedFProp === f)) {
        //    console.log("pmov-remove applied style-4-2");
        //   //  console.log("a");
        //    if (selectedFProp !== null) {
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        //  } else {
        //console.log("pmov-apply new style-4-1");
        //  console.log("b");
        const selectStyle = new Style({ zIndex: 1 });
        selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);
        f.setStyle(selectStyle);
        selectedFPropRef.current = f;
        // }
      } else if (f.get("ft") == 2) {
        // console.log("pmov-sync prop found-3-1");

        f.setStyle(areaMap_tbl_syncProperty_VectorLayerStyleFunctionHighLited);
        selectedSynPropRef.current = f;

        //  if (selectedFProp !== null) {
        //       console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        //  console.log("spt");
      } else if (f.get("ft") == 3) {
        f.setStyle(
          areaMap_tbl_sync_claimlink_VectorLayerStyleFunctionHighLight
        );
        selectedSynOutLineRef.current = f;
        //  if (selectedFProp !== null) {
        //       console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        // console.log("spo");
      } else if (f.get("ft") == 4) {
        //  if (selectedFProp !== null) {
        //       console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //  }

        // console.log("assetf");
        //  const selectStyle = new Style({});
        //  selectStyle.setRenderer(
        //    areaMapAssetVectorLayerStyleFunctionHighlited
        //  );
        f.setStyle(areaMapAssetVectorLayerStyleFunctionHighlited);
        selectedAssetRef.current = f;
        // const selectStyle = new Style({}); areaMapAssetVectorLayerStyleFunctionHighlited
        // selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);
        // f.setStyle(selectStyle);
        // selectedFProp = f;
      } else if (f.get("ft") == 5) {
        f.setStyle(styleFunctionClaimHighlight);
        selectedClaimRef.current = f;
      } else {
        // console.log("pmov-other layer found-5");
        // console.log("layer", layer.get("id1"));
        // console.log("xx");
        //fproperty_areamap_labels
        //  if (layer.get("id1") != "fproperty_areamap_labels") {
        //    if (selectedFProp !== null) {
        //      console.log("pmov-remove applied style-4-1-x1");
        //      selectedFProp.setStyle(undefined);
        //      selectedFProp = null;
        //    }
        //  }
      }

      //      const selectStyle = new Style({
      //        stroke: new Stroke({
      //          color: "rgba(0, 0,255, 1.0)",
      //          width: 5,
      //        }),
      //      });
      //      selectedFProp = f;
      //      //selectStyle.getFill().setColor("rgba(255, 255, 255, 0)");
      //      f.setStyle(selectStyle);
      //   selectedFProp = f;

      // change cursor
      // var viewport = map.getViewport();

      //  if (f && f.getGeometry().getType() === "Polygon") {
      //    // console.log("ffff",f.get("area_name"));
      //    if (areaSearchInput.value != f.get("area_name")) {
      //      // Check if the mouse pointer is inside the polygon
      //      const coordinate = map.getCoordinateFromPixel(e.pixel);
      //      const geometry = f.getGeometry();
      //      if (geometry.intersectsCoordinate(coordinate)) {
      //        // Add the 'inside-polygon-cursor' class to the viewport
      //        viewport.classList.add("inside-polygon-cursor");
      //        return;
      //      } else {
      //        viewport.classList.remove("inside-polygon-cursor");
      //      }
      //    } else {
      //      // console.log("f.id_.slice(0, 5) ",f.id_.slice(0, 5)  )
      //      viewport.classList.remove("inside-polygon-cursor");
      //    }
      //  } else {
      //    // console.log("dddddd-f.id_.slice", f.id_.slice(0, 5));
      //    viewport.classList.add("inside-polygon-cursor");
      //  }

      return true;
    });
    //console.log("fcount", fcount);

    // console.log("pmove- end fun",)
  });

  const onViewChange = useCallback((e) => {
    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
    dispatch(setareaCurrentScale(scale));

    //  console.log("areaCurrentScale-map",scale)
  });

  useEffect(() => {
    if (mapViewRef.current) {
      const scale = mapRatioScale({ map: mapRef.current });
      setmapScale(scale.toLocaleString());

    }
  }, [mapViewRef.current]);

  useEffect(() => {
    if (areaFlyToLocation?.length > 0)
      flyTo(mapViewRef?.current, areaFlyToLocation, () => { });
  }, [areaFlyToLocation]);

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
  const fPropSourceLabelRef = useRef(null);
  const fPropVectorLayerLabelRef = useRef(null);
  const assetSourceRef = useRef(null);
  const assetLayerRef = useRef(null);
  const claimLinkSourceRef = useRef(null);
  const claimLinkVectorLayerRef = useRef(null);
  const claimVectorImgSourceRef = useRef(null);
  const claimVectorImgLayerRef = useRef(null);
  const areaBoundaryImgSourceRef = useRef(null);
  const areaBoundaryImgLayerRef = useRef(null);
  // const allSyncPropVectorLayerRef = useRef(null);
  // const allSyncPropSourceRef = useRef(null);

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

  const mapViewScaleReducer = useSelector((state) => state.mapViewScaleReducer);

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);

  const amapFpropLableVisible = useSelector(
    (state) => state.areaMapReducer.amapFpropLableVisible
  );

  //set styles
  useEffect(() => {
    const style = new Style({});
    style.setRenderer(areaMApPropertyVectorRendererFuncV2);

    fPropVectorLayerRef.current?.setStyle(style);
  }, [fPropVectorLayerRef.current]);

  useEffect(() => {
    const style = new Style({});
    if (amapFpropLableVisible) {
      style.setRenderer(areaMApPropertyVectorRendererFuncV2_labels);
      fPropVectorLayerLabelRef.current?.setStyle(style);
    }
    else {
      fPropVectorLayerLabelRef.current?.setStyle(style);
    }
  }, [fPropVectorLayerLabelRef.current, amapFpropLableVisible]);

  useEffect(() => {
    // const style = new Style({});
    // style.setRenderer(areaMApPropertyVectorRendererFuncV2);
    claimLinkVectorLayerRef.current?.setOpacity(0.2);
    claimLinkVectorLayerRef.current?.setStyle(
      areaMap_tbl_sync_claimlink_VectorLayerStyleFunction
    );
  }, [claimLinkVectorLayerRef.current]);

  useEffect(() => {
    claimVectorImgLayerRef.current?.setOpacity(0.5);
  }, [claimVectorImgLayerRef.current]);

  useEffect(() => {
    syncPropSourceRef?.current?.clear();
    if (syncPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(syncPropertyFeatures);

      syncPropSourceRef?.current?.addFeatures(e);
    }

    if (syncPropSourceRef.current) {

      if (areaZoomMode == ZoomMode.ExTENT) {
        const p1 = syncPropSourceRef.current.getExtent();
        if (p1[0] != Infinity) {
          if (syncPropSourceRef.current?.getFeatures().length > 0) {
            mapRef.current?.getView()?.fit(p1, {
              padding: [100, 100, 100, 100],
              duration: 3000,
            });
          }

        }
      } else { //fixed zoom
       
          mapRef.current?.getView()?.setZoom(areaZoomLevel);
        
      }
    }
  }, [syncPropertyFeatures]);

  useEffect(() => {
    fPropSourceRef?.current?.clear();
    if (featuredPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);
      navigatedFPropertyRef.current = e;
      fPropSourceRef?.current?.addFeatures(e);
      fPropSourceLabelRef?.current?.addFeatures(e);

      if (!syncPropSourceRef?.current?.getFeatures().length) {
        const p2 = fPropSourceRef.current?.getExtent()
        if (p2[0] != Infinity) {
          mapRef.current?.getView()?.fit(p2, {
            padding: [100, 100, 100, 100],
            duration: 3000,
          });

        }
      }

    }

    //  if (fPropSourceRef.current) {
    //    const p1= fPropSourceRef.current?.getExtent()[0]
    //    if (p1 != Infinity) {
    //      mapRef.current?.getView()?.fit(fPropSourceRef.current?.getExtent(), {
    //        padding: [200, 200, 200, 200],
    //        duration: 3000,
    //      });
    //    }

    //  }
  }, [featuredPropertyFeatures]);

  useEffect(() => {
    claimLinkSourceRef?.current?.clear();
    if (syncClaimLinkPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(syncClaimLinkPropertyFeatures);

      claimLinkSourceRef?.current?.addFeatures(e);
    }
    // if (claimLinkSourceRef.current) {
    //   const p1 = claimLinkSourceRef.current?.getExtent()[0]
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(claimLinkSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }

    // }
  }, [syncClaimLinkPropertyFeatures]);

  useEffect(() => {
    assetSourceRef?.current?.clear();
    if (assetFeatures?.features) {
      const e = new GeoJSON().readFeatures(assetFeatures);

      assetSourceRef?.current?.addFeatures(e);
    }

    // if (assetSourceRef.current) {
    //   const p1 = assetSourceRef.current?.getExtent()[0]
    //   if (p1 != Infinity) {
    //     mapRef.current?.getView()?.fit(assetSourceRef.current?.getExtent(), {
    //       padding: [200, 200, 200, 200],
    //       duration: 3000,
    //     });
    //   }

    // }
  }, [assetFeatures]);

  //init useeffect
  useEffect(() => {

    mouseScrollEvent();

    console.log("mapViewMode-amap", mapViewMode,)

  }, []);

  useEffect(() => {
    fPropVectorLayerRef?.current
      ?.getSource()
      .on("addfeature", function (event) {
        const feature = event.feature;
        const svgtext2 = feature.get("hatch");
        const img = new Image();

        img.onload = function () {
          feature.set("flag", img);
        };

        img.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgtext2);
      });
  }, [fPropVectorLayerRef?.current]);

  useEffect(() => {
    //console.log("yy-mew-areaSelectedAreaId",areaSelectedAreaId)

    if (areaSelectedAreaId) {
      // console.log("yy-yy")
      updateWindowsHistoryAmap({ isSideNavOpen, areaLyrs: mapLyrs, areaZoomLevel: zoom, areaInitialCenter: center, country: areaCountry, miningArea: areaName, areaId: areaSelectedAreaId });
    } else {
      //console.log("yy-xx")
    }

    // let newUrl;
    // if (areaName == "") {
    //   newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${zoom}&c=${center}`;
    // } else {
    //   newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${zoom}&c=${center}&co=${areaCountry}&ma=${areaName}`;
    // }
    //  updateWindowsHistory(newUrl);
  }, [zoom, center]);
  const handleMoveEnd = useCallback(() => {
    const map = mapRef.current;

    const tmpZoomLevel = map.getView().getZoom();
    const tmpinitialCenter = map.getView().getCenter();
    dispatch(setAreaZoomLevel(tmpZoomLevel));
    dispatch(setAreaInitialCenter(tmpinitialCenter));
    setZoom(tmpZoomLevel);
    setCenter(tmpinitialCenter);

    // let newUrl;



  }, [])


  const mouseScrollEvent = useCallback((event) => {
    const map = mapRef.current;
    // console.log("yy-yy1")
    // console.log("mapRef", mapRef.current?.getZoom());


    map?.on("moveend", handleMoveEnd);

    return () => {
      map?.un("moveend", handleMoveEnd);
    };
  }, []);

  // const collapsibleBtnHandler = () => {
  //   const tmpValue = String(isSideNavOpen).toLowerCase() === "true";
  //   dispatch(setIsSideNavOpen(!tmpValue));
  //   const newUrl = `${
  //     window.location.pathname
  //   }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
  //   window.history.replaceState({}, "", newUrl);
  //   // dispatch(setUrlUpdate());
  // };

  const collapsibleBtnHandler = () => {
    const tmpValue = String(isSideNavOpen).toLowerCase() === "true";
    dispatch(setIsSideNavOpen(!tmpValue));
    //let newUrl;
    // if (areaName == "") {
    //   newUrl = `${
    //     window.location.pathname
    //   }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    // } else {
    //   newUrl = `${
    //     window.location.pathname
    //   }?t=${selectedMap}&sn=${!tmpValue}&sn2=${isAreaSideNavOpen}&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaName}`;
    // }
    updateWindowsHistoryAmap({ isAreaSideNavOpen, isSideNavOpen, areaLyrs: mapLyrs, areaZoomLevel, areaInitialCenter, country: areaCountry, miningArea: areaName, areaId: areaSelectedAreaId });

    // window.history.replaceState({}, "", newUrl);
    // dispatch(setUrlUpdate());
  };

  const notify = () => toast.success("Copied Url to Clipboard");

  const copyMapUrl = () => {

    //alert("ppp" + pathname)
    navigator.clipboard.writeText(pathname + "&mvm=HEADLESS");
    notify()
  }

  const setLyrs = (lyrs) => {
    dispatch(setAreaLyrs(lyrs));
    let newUrl;
    if (areaName == "") {
      newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${lyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
      updateWindowsHistoryAmap({ isAreaSideNavOpen, isSideNavOpen, areaLyrs: lyrs, areaZoomLevel, areaInitialCenter, country: areaCountry, miningArea: areaName, areaId: areaSelectedAreaId });

    } else {
      //newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${isAreaSideNavOpen}&lyrs=${lyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${areaCountry}&ma=${areaName}`;
      updateWindowsHistoryAmap({ isAreaSideNavOpen, isSideNavOpen, areaLyrs: lyrs, areaZoomLevel, areaInitialCenter, country: areaCountry, miningArea: areaName, areaId: areaSelectedAreaId });

    }
    window.history.replaceState({}, "", newUrl);
  };
  const openAreaNav = () => {
    //const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${mapLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}`;
    // window.history.replaceState({}, "", newUrl);
    //updateWindowsHistory(newUrl);
    updateWindowsHistoryAmap({ isSideNavOpen, areaLyrs: mapLyrs, areaZoomLevel, areaInitialCenter, country: areaCountry, miningArea: areaName, areaId: areaSelectedAreaId });

    dispatch(setIsAreaSideNavOpen(true));
  };

  const image = new Icon({
    src: "./sync-prop.svg",
    scale: 1,
  });

  // const styleFunctionSyncProperties = (feature) => {
  //   // console.log("s");
  //   const s = new Style({
  //     image,
  //     stroke: new Stroke({
  //       color: "red",
  //       width: 2,
  //     }),
  //     fill: new Fill({
  //       color: "rgba(255,23,0,0.2)",
  //     }),
  //   });

  //   return s;
  // };

  const amapsyncPropLableVisible = useSelector(
    (state) => state.areaMapReducer.amapsyncPropLableVisible
  );

  //label visiblty
  const amapClaimLableVisible = useSelector(
    (state) => state.areaMapReducer.amapClaimLableVisible
  );

  const styleFunctionSyncProperties = (feature, resolution) => {
    //console.log("resolution",resolution)
    let t = "";
    if (resolution < 300)
      t =
        feature.get("prop_name") +
        (feature.get("prop_alias") ? "/" + feature.get("prop_alias") : "") ??
        "";
    const s = new Style({
      text: new Text({
        text: amapsyncPropLableVisible ? t.toString():"",
        // text: feature.get("propertyid") ??"", prop_name, prop_alias
        offsetX: 0,
        offsetY: -10,
        font: "14px serif",
      }),
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

  //layer visibilty redux states
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
  const areaClaimLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaClaimLayerVisible
  );
  const areaAreaBoundaryLayerVisible = useSelector(
    (state) => state.areaMapReducer.areaAreaBoundaryLayerVisible
  );

  //asset type visibilty redux states
  const areaAssetOpMineVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetOpMineVisible
  );
  const areaAssetDepositsVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetDepositsVisible
  );
  const areaAssetZoneVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetZoneVisible
  );
  const areaAssetHistoricalVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetHistoricalVisible
  );
  const areaAssetOccurrenceVisible = useSelector(
    (state) => state.areaMapReducer.areaAssetOccurrenceVisible
  );

  //layer visibility useEffects
  useEffect(() => {
    fPropVectorLayerRef?.current?.setVisible(areaFpropLayerVisible);
    fPropVectorLayerLabelRef?.current?.setVisible(areaFpropLayerVisible);

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
  useEffect(() => {
    claimVectorImgLayerRef?.current?.setVisible(areaClaimLayerVisible);
  }, [areaClaimLayerVisible]);
  useEffect(() => {
    areaBoundaryImgLayerRef?.current?.setVisible(areaAreaBoundaryLayerVisible);
  }, [areaAreaBoundaryLayerVisible]);

  //asset type visibility useEffects
  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (areaAssetOpMineVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Operating Mine") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Operating Mine") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [areaAssetOpMineVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (areaAssetDepositsVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Deposit") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Deposit") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [areaAssetDepositsVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (areaAssetZoneVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Zone") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Zone") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [areaAssetZoneVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (areaAssetHistoricalVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Historical Mine") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Historical Mine") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [areaAssetHistoricalVisible]);

  useEffect(() => {
    const fs = assetSourceRef?.current?.getFeatures();
    if (fs) {
      if (areaAssetOccurrenceVisible) {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Occurrence") {
            f.setStyle(null);
          }
        });
      } else {
        fs.forEach((f) => {
          if (f.get("asset_type") == "Occurrence") {
            f.setStyle(new Style({}));
          }
        });
      }
    }
  }, [areaAssetOccurrenceVisible]);

  //claim loader
  // const claimLoaderFunc1 = (extent, resolution, projection)=> {
  //  // console.log("hit claims",extent)
  //   const url =
  //     `https://atlas.ceyinfo.cloud/matlas/view_tbl01_claims_bb` +
  //     `/${extent.join("/")}`;
  //  // console.log("url", url);
  //   fetch(url, {
  //     method: "GET", // *GET, POST, PUT, DELETE, etc.
  //     mode: "cors", // no-cors, *cors, same-origin
  //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: "same-origin", // include, *same-origin, omit
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //         console.log("hit claims2.0",json)
  //       if (json.data) {
  //            //console.log("hit claims2.1")
  //         if (json.data[0].json_build_object.features) {
  //           const features = new GeoJSON().readFeatures(
  //             json.data[0].json_build_object
  //           );
  //             //console.log("hit claims3")
  //           claimVectorImgSourceRef.current.addFeatures(features);

  //           //console.log("bbsync uni tbl01_claims   features count", features.count);
  //         }
  //       }
  //     });
  // }

  const styleFunctionAreaBoundary = (feature, resolution) => {
    
    
    
    let txtObjAreaName
    if (resolution < 3000) {
      txtObjAreaName = new Text({
        //       // textAlign: align == "" ? undefined : align,
        //       // textBaseline: baseline,
        font:  "18px serif",
        text: amapAreaLableVisible ? feature.get("area_name") :"",
        fill: new Fill({ color: "red" }),
        // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
        offsetX: 0,
        offsetY: 0,
        // placement: placement,
        // maxAngle: maxAngle,
        overflow: true,
        // rotation: rotation,
      })
    }  

   


    const s = new Style({
      stroke: new Stroke({
        color: "blue",
        width: 1,
      }),
      text: txtObjAreaName,
    });

    return s;
  };

  const amapAreaLableVisible = useSelector(
    (state) => state.areaMapReducer.amapAreaLableVisible
  );

  const areaLoaderFunc = useCallback((extent, resolution, projection) => {
    const url = `https://atlas.ceyinfo.cloud/matlas/view_tbl40mapareas`;
    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data[0].json_build_object.features) {
          const features = new GeoJSON().readFeatures(
            json.data[0].json_build_object
          );

          areaBoundaryImgSourceRef.current.addFeatures(features);

          // console.log("mapCommodityTbl40Source", features );
        } else {
          console.log("else area map area boundry not loading ");
        }
      });
  }, []);

  const styleFunctionClaim = (feature, resolution) => {
    // console.log("sf claims")
    const colour = "#D3D3D3"; //feature.values_.colour;
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
    let fill = new Fill({
      // color: `rgba(${r},${g},${b},1)`,

      color: colour,
      opacity: 1,
    });

    // const stroke = new Stroke({
    //   color: "#8B4513",
    //   width: 1.25,
    // });

    // let image;
    // let text;

    // image = new Circle({
    //   radius: 9,
    //   fill: new Fill({ color: colour }),
    //   // stroke: new Stroke({ color: "#8B4513", width: 3 }),
    // });

    let textObj;

    const claimno = feature.get("claimno");
    textObj = new Text({
      //       // textAlign: align == "" ? undefined : align,
      //       // textBaseline: baseline,
      font: "10px serif",
      text: amapClaimLableVisible ? claimno :"",
      // fill: new Fill({ color: fillColor }),
      // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
      offsetX: 2,
      offsetY: -13,
      // placement: placement,
      // maxAngle: maxAngle,
      // overflow: overflow,
      // rotation: rotation,
    });

    const style = new Style({
      stroke: new Stroke({
        color: "#707070",
        width: 1,
      }),

      text: textObj,
      fill,
    });

    return style;
  };

  const claimLoaderFunc = useCallback((extent, resolution, projection) => {
    // console.log("yy-extent1", extent, resolution,areaMapViewScales.claimscale)
    // if(!areaMapViewScales.claimscale) return
    // if(getMapResolution( areaMapViewScales.claimscale,mapUnits) < resolution){
    //   return
    // }
    //  console.log("yy-extent2", extent, resolution,areaMapViewScales.claimscale)
    const url =
      `https://atlas.ceyinfo.cloud/matlas/view_tbl01_claims_bb` +
      `/${extent.join("/")}`;
    fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-store", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.data) {
          if (json.data[0].json_build_object.features) {
            const features = new GeoJSON().readFeatures(
              json.data[0].json_build_object
            );
            claimVectorImgSourceRef.current.addFeatures(features);
          }
        }
      });
  }, []);

  //single click -
  useEffect(() => {
    let clickedOnFeatureTmp = false;
    const fetchData = async () => {
      let extentDim;
      const viewResolution = mapViewRef?.current?.getResolution();
      if (viewResolution < 15) {
        extentDim = 100;
      } else if (viewResolution < 50) {
        extentDim = 500;
      } else if (viewResolution < 150) {
        extentDim = 1000;
      } else if (viewResolution < 250) {
        extentDim = 1500;
      } else if (viewResolution < 400) {
        extentDim = 2500;
      } else {
        extentDim = 3000;
      }

      const ext = [
        coordinates[0] - extentDim,
        coordinates[1] - extentDim,
        coordinates[0] + extentDim,
        coordinates[1] + extentDim,
      ];
      //first look for asset features
      const selAssetFeatures =
        assetSourceRef?.current?.getFeaturesInExtent(ext) ?? [];

      if (selAssetFeatures.length > 0) {
        clickedOnFeatureTmp = true;
        let asset_name = selAssetFeatures?.[0]?.get("asset_name") ?? "";
        let assetalias = selAssetFeatures?.[0]?.get("assetalias") ?? "";
        let asset_type = selAssetFeatures?.[0]?.get("asset_type") ?? "";
        let commodities = selAssetFeatures?.[0]?.get("commodities") ?? "";
        let area = selAssetFeatures?.[0]?.get("area") ?? "";
        let stateProv = selAssetFeatures?.[0]?.get("state_prov") ?? "";
        let country = selAssetFeatures?.[0]?.get("country") ?? "";
        let region = selAssetFeatures?.[0]?.get("region") ?? "";
        const assetObject1 = {
          asset_name,
          assetalias,
          asset_type,
          commodities,
          area,
          stateProv,
          country,
          region,
        };
        setassetObject(assetObject1);
      } else {
        dispatch(setclickassetObject(undefined));
      }
      const selFPropertyFeatures =
        fPropSourceRef?.current?.getFeaturesAtCoordinate(coordinates) ?? [];
      if (selFPropertyFeatures.length > 0) {
        //console.log("fprop found")
        clickedOnFeatureTmp = true;
        // console.log("selFPropertyFeatures", selFPropertyFeatures);
        let prop_name = selFPropertyFeatures?.[0]?.get("prop_name") ?? "";

        let propertyid = selFPropertyFeatures?.[0]?.get("propertyid") ?? "";
        let hotplayid = selFPropertyFeatures?.[0]?.get("id") ?? 0;

        // const sponsoredowners = await getSponsorListFromRESTAPI(
        //   features[0].get("id")
        // );

        const getData = async (hotplayid) => {
          const url =
            "https://atlas.ceyinfo.cloud/matlas/getownersbyhotplayid/" +
            hotplayid;
          //load data from api - changed to return array

          let sponsors = await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
            .then((response) => response.json())
            .then((res) => {
              // let sponsors = "";
              // res.data.forEach((element) => {
              //   sponsors += element.sponsor + "/";
              // });
              return res.data;
            });

          // sponsors = sponsors.slice(0, -1);
          // console.log("sponsors", sponsors);
          return sponsors;
        };
        //console.log("hotplayid",hotplayid)
        const dd = await getData(hotplayid);
        //console.log("dd",dd)
        const d = dd?.[0];

        const sponsoredowners = d?.sponsor ?? "";
        let commo_ref = d?.commo_ref ?? "";
        let assets = d?.assets ?? "";
        let resources = d?.resources ?? "";
        let map_area = d?.map_area ?? "";
        let owners = d?.owners ?? "";
        let prop_exturl = d?.prop_exturl ?? "";
        let sale_name = d?.sale_name ?? "";
        let profile = d?.profile ?? "";

        const fPropertyObject1 = {
          sponsoredowners,
          prop_name,
          commo_ref,
          assets,
          resources,
          map_area,
          owners,
          prop_exturl,
          sale_name,
          propertyid,
          profile,
        };
        setfPropertyObject(fPropertyObject1);
      } else {
        dispatch(setclickfPropertyObject(undefined));
      }
      // const selBoundaryFeatures =
      //   boundarySource?.getFeaturesAtCoordinate(evt.coordinate) ?? [];

      const selSyncPropFeatures =
        syncPropSourceRef?.current?.getFeaturesInExtent(ext) ?? [];

      // console.log("selSyncPropFeatures?.[0]", selSyncPropFeatures?.[0]);
      if (selSyncPropFeatures.length > 0) {
        clickedOnFeatureTmp = true;
        const prop_name = selSyncPropFeatures?.[0]?.get("prop_name") ?? "";
        const owners = selSyncPropFeatures?.[0]?.get("owners") ?? "";
        let name1 = selSyncPropFeatures?.[0]?.get("name") ?? "";
        const stateProv = selSyncPropFeatures?.[0]?.get("state_prov") ?? "";
        const country = selSyncPropFeatures?.[0]?.get("country") ?? "";
        const area = selSyncPropFeatures?.[0]?.get("area") ?? "";
        // const selSynClaimLinkFeatures =
        //   sync_claimLinkLayerSource?.getFeaturesAtCoordinate(evt.coordinate) ?? [];
        const syncPropertyObject1 = {
          prop_name,
          owners,
          name: name1,
          stateProv,
          country,
          area,
        };
        setsyncPropertyObject(syncPropertyObject1);
      } else {
        dispatch(setclicksyncPropertyObject(undefined));
      }
      const claimFeatures =
        claimVectorImgSourceRef?.current?.getFeaturesAtCoordinate(
          coordinates
        ) ?? [];
      if (claimFeatures.length > 0) {
        clickedOnFeatureTmp = true;
        let ownerref = claimFeatures?.[0]?.get("ownerref") ?? "";
        const claimno = claimFeatures?.[0]?.get("claimno") ?? "";
        const claimObject1 = { ownerref, claimno };
        setclaimObject(claimObject1);
      } else {
        dispatch(setclickclaimObject(undefined));
      }
    };

    if (coordinates) {
      fetchData();
      setclickedOnFeature(clickedOnFeatureTmp);
      if (clickedOnFeatureTmp) {
        setclickDataLoaded(true);
      }
      //  console.log("222")
    }
  }, [coordinates]);

  const onClickViewPlusZoom = () => {
    const curZoom = mapViewRef.current.getZoom();
    mapViewRef.current.setZoom(curZoom + 1);
    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
  };
  const onClickViewMinusZoom = () => {
    const curZoom = mapViewRef.current.getZoom();
    mapViewRef.current.setZoom(curZoom - 1);
    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
  };

  const onClickViewInitZoom = () => {
    mapViewRef.current.setZoom(3.25);
    mapViewRef.current.setCenter([-10694872.010699773, 7434223.337137634]);
    const scale = mapRatioScale({ map: mapRef.current });
    setmapScale(scale.toLocaleString());
  };

  useEffect(() => {

    if (mapViewScaleReducer?.mapViewScales?.length > 0) {
      setmapViewScales(mapViewScaleReducer.mapViewScales)
    }
  }, [mapViewScaleReducer.mapViewScales])


  useEffect(() => {
    // console.log("xx-0- ue-areaSelectedAreaId-setareaMapViewScales ",areaSelectedAreaId)
    if (areaSelectedAreaId != undefined && areaSelectedAreaId != 0) {
      const mapViewScale1 = mapViewScales.find(a => a.area_id == areaSelectedAreaId)

      if (mapViewScale1) {
        // console.log("xx-88if-amap- setareaMapViewScales ",mapViewScale1)
        dispatch(setareaMapViewScales(mapViewScale1));
      }
      else {
        // console.log("xx-crit- no aid yy-else",mapViewScales)
        dispatch(setareaMapViewScales(mapViewScales[0]))
      }

      //console.log("xx-99mapViewScale1-set",mapViewScale1)

      //set style of selected area
      const afs = areaBoundaryImgSourceRef.current?.getFeatures();
      console.log("ww1-afs", afs)
      const selAreaF = afs?.find(af => af.get("area_id") == areaSelectedAreaId)

      if (selAreaF) {
        // const geometry = selAreaF.getGeometry()
        // const extent =  geometry.getExtent()
        // const center  = getCenter(extent)
        // const topcenterxOffset = (extent[0] + extent[2]) / 2 - center[0]
        // const topcenteryOffset = extent[4]  - center[1]
        
        

        const s = new Style({
          stroke: new Stroke({
            color: "black",
            width: 6,
          }),
          text: new Text({
            //       // textAlign: align == "" ? undefined : align,
            //       // textBaseline: baseline,
            font: "45px serif",
            text: selAreaF.get("area_name"),
            fill: new Fill({ color: "black" }),
            // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
            offsetX: 0,
            offsetY: -20,
            placement:"line",
            // placement: placement,
            // maxAngle: maxAngle,
            // overflow: overflow,
            // rotation: rotation,
          }),
        });

        //clear prev style
        if (prevSelAreaFeature) {
          prevSelAreaFeature.setStyle(undefined)
        }
        setprevSelAreaFeature(selAreaF)
        selAreaF.setStyle(s);

      }

    } else {
      console.log("xx-xxnotmapViewScale1-set", areaSelectedAreaId)
    }

  }, [areaSelectedAreaId, mapViewScales])



  const copyRight = `©2024 DigiGeoData`

  const amapAssetLableVisible = useSelector(
    (state) => state.areaMapReducer.amapAssetLableVisible
  );

  const areaMapAssetVectorLayerStyleFunction = (feature, resolution) => {


    const colour = feature.values_.colour;

    const fill = new Fill({
      color: colour,
      opacity: 1,
    });

    const stroke = new Stroke({
      color: "#3399CC",
      width: 1.25,
    });

    let svgScale = 0;
    let radius = 0;

    if (resolution > 1000) {
      svgScale = 0.5;
      radius = 2;
    } else if (resolution > 937.5) {
      svgScale = 0.562;
      radius = 5;
    } else if (resolution > 875) {
      svgScale = 0.625;
      radius = 5;
    } else if (resolution > 750) {
      svgScale = 0.75;
      radius = 5;
    } else if (resolution > 625) {
      svgScale = 0.875;
      radius = 5;
    } else if (resolution > 500) {
      svgScale = 1;
      radius = 5;
    } else if (resolution > 375) {
      svgScale = 1.125;
      radius = 5;
    } else if (resolution > 250) {
      svgScale = 1.25;
      radius = 5;
    } else if (resolution > 125) {
      svgScale = 1.375;
      radius = 5;

    } else {
      svgScale = 1.5;
      radius = 10;
    }
    let image;
    let text;


    if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
        scale: svgScale,
      });
    } else if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
      image = new Icon({
        src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOccurence),
        scale: svgScale,
      });
    }


    //set text Style

    text = createTextStyle(feature, resolution);

    const st = new Style({
      stroke: new Stroke({
        color: "#021691",
        width: 2,
      }),
      image,
      text: amapAssetLableVisible ? text : undefined,
      fill,
    });

    return st;
  };

  return (
    <div className="flex">
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AreaSideNavbar className={`   ${mapViewMode == "HEADED" ? "block" : "hidden"}`} />
      <div className="relative">
        <div className="w-12 absolute left-0 top-0 z-50 ml-2">
          <div className="flex flex-col gap-4 mt-2">
            <Button isIconOnly variant="bordered" className={`bg-blue-900 ${mapViewMode == "HEADED" ? "flex" : "hidden"}`}>
              <BsFillArrowLeftSquareFill
                // size={26}
                className={`cursor-pointer text-white h-6 w-6 ${isSideNavOpen ? "" : "rotate-180"
                  }`}
                onClick={() => collapsibleBtnHandler()}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <GiEarthAmerica
                className={`text-white cursor-pointer h-6 w-6`}
                onClick={onClickViewInitZoom}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <AiFillPlusSquare
                className={`text-white cursor-pointer h-6 w-6`}
                onClick={onClickViewPlusZoom}
              />
            </Button>
            <Button isIconOnly variant="bordered" className="bg-blue-900">
              <AiFillMinusSquare
                className={`text-white cursor-pointer h-6 w-6`}
                onClick={onClickViewMinusZoom}
              />
            </Button>
            {/* <Tooltip
              content={
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Copy Map View Url</div>
                  <div className="text-tiny">Copies headless map url to clipboard</div>
                </div>
              }
            > */}
            {/* <Button isIconOnly variant="bordered" className={`bg-blue-900 ${mapViewMode == "HEADED" ? "flex" : "hidden"}`} onClick={() => copyMapUrl()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="WHITE" className="bi bi-copy" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                className={`cursor-pointer text-white h-6 w-6 ${isSideNavOpen ? "" : "rotate-180"
                  }`}
                
              </svg>
               
              </Button> */}
            {/* </Tooltip> */}
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
        <div className="flex items-end fixed   bottom-1 z-50  " >
          <ButtonGroup
            variant="faded"
            // className="fixed  bottom-1 z-50  "
            color="primary"
          >
            <Button
              onClick={() => setLyrs("m")}
              className={`${mapLyrs == "m"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
                }  w-22`}
            >
              Map
            </Button>
            <Button
              onClick={() => setLyrs("s")}
              className={`${mapLyrs == "s"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
                }  w-22`}
            >
              Satellite
            </Button>
            <Button
              onClick={() => setLyrs("p")}
              className={`${mapLyrs == "p"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
                }  w-22`}
            >
              Terrain
            </Button>
            {/* <Button
            onClick={() => setLyrs("p")}
            className={`${
              mapLyrs == "p"
                ? "bg-blue-900 text-white"
                : "bg-blue-700 text-white"
            }  w-22`}
          >
            {areaSelectedAreaId}
          </Button> */}
          </ButtonGroup>
          <div><p>{copyRight}</p></div>
        </div>
        <ButtonGroup
          variant="faded"
          className="fixed right-[85px] bottom-1 z-50 "
          color="primary"
        >
          <Button className={`w-36 bg-blue-700 text-white`}>
            {`Scale:${mapScale}`}
          </Button>
          <Button className={`w-36 bg-blue-700 text-white`}>
            {`Lat:${lat}`}
          </Button>
          <Button className={`w-36 bg-blue-700 text-white`}>
            {`Long:${long}`}
          </Button>
        </ButtonGroup>

        <div
          ref={setPopup}
          style={{
            textDecoration: "none",
            position: "absolute",
            top: "2px",
            right: "8px",
            backgroundColor: "white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
            padding: "15px",
            borderRadius: "10px",
            border: "1px solid #cccccc",
            minWidth: "400px",
            color: "black",
          }}
        >
          <button
            type="button"
            onClick={(e) => {
              setCoordinates(undefined);
              e.target.blur();
              return false;
            }}
            style={{
              textDecoration: "none",
              position: "absolute",
              top: "2px",
              right: "8px",
            }}
          >
            ✖
          </button>
          <div id="popup-contenta">
            {/* <p>Info:</p> */}
            {clickDataLoaded && (
              <AreaMapClickPopup
                claimObj={claimObject}
                fpropObj={fPropertyObject}
                assetObj={assetObject}
                syncPropObj={syncPropertyObject}
              />
            )}
          </div>
        </div>
        {/* <div  className="absolute top-0  z-50 w-full h-min-[500] bg-red-200"> 
        {GetTopAds()}
         
        </div>
        <div  className="absolute top-0 right-0  z-50 h-full w-min-[500] bg-green-200"> 
        {GetRightAds()}
         
        </div> */}
        <Map
          ref={mapRef}
          style={{
            width: isSideNavOpen
              ? isAreaSideNavOpen
                ? mapViewMode == "HEADED" ? "65vw" : "100vw"
                : mapViewMode == "HEADED" ? "83vw" : "100vw"
              : "100vw",

            height: mapViewMode == "HEADED" ? "90vh" : "100vh",
          }}
          // style={{
          //   width: isSideNavOpen
          //     ? isAreaSideNavOpen
          //       ?  "65vw"
          //       : "83vw"
          //     : "100vw",

          //   height: "90vh",
          // }}
          controls={[]}
          onSingleclick={onSingleclick}
          onPointermove={onPointerMove}
        >
          {popup && clickedOnFeature ? (
            <olOverlay
              element={popup}
              position={coordinates}
              autoPan
              autoPanAnimation={{
                duration: 250,
              }}
            />
          ) : null}
          <olView
            ref={mapViewRef}
            initialCenter={[0, 0]}
            center={areaInitialCenter}
            initialZoom={2}
            zoom={areaZoomLevel}
            onchange={onViewChange}
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
          <olLayerVectorImage
            ref={areaBoundaryImgLayerRef}
            style={styleFunctionAreaBoundary}
          >
            <olSourceVector
              ref={areaBoundaryImgSourceRef}
              // format={new GeoJSON()}
              strategy={all}
              loader={areaLoaderFunc}
            ></olSourceVector>
          </olLayerVectorImage>
          <olLayerVector ref={claimLinkVectorLayerRef}>
            {syncClaimLinkPropertyFeatures && (
              <olSourceVector
                ref={claimLinkSourceRef}
              // style={areaMap_tbl_sync_claimlink_VectorLayerStyleFunction}
              ></olSourceVector>
            )}
          </olLayerVector>
          <olLayerVectorImage
            ref={claimVectorImgLayerRef}
            style={styleFunctionClaim}
            minResolution={0}
            maxResolution={getMapResolution(areaMapViewScales?.claimscale ?? 350000, mapUnits) ?? 150}
          >
            <olSourceVector
              ref={claimVectorImgSourceRef}
              strategy={bbox}
              loader={claimLoaderFunc}
            ></olSourceVector>
          </olLayerVectorImage>

          <olLayerVector ref={fPropVectorLayerRef}>
            <olSourceVector ref={fPropSourceRef}></olSourceVector>
          </olLayerVector>
          <olLayerVector ref={fPropVectorLayerLabelRef}>
            <olSourceVector ref={fPropSourceLabelRef}></olSourceVector>
          </olLayerVector>

          <olLayerVector
            ref={assetLayerRef}
            style={areaMapAssetVectorLayerStyleFunction}
            minResolution={0}
            maxResolution={areaAssetLayerAlwaysVisible ? 40075016 : getMapResolution(areaMapViewScales?.assetscale ?? 450000, mapUnits) ?? 150}
          >
            <olSourceVector ref={assetSourceRef}></olSourceVector>
          </olLayerVector>
          <olLayerVector
            ref={syncPropVectorLayerRef}
            style={styleFunctionSyncProperties}
            minResolution={0}
            maxResolution={areaSyncPropLayerAlwaysVisible ? 40075016 : getMapResolution(areaMapViewScales?.proplayerscale ?? 950000, mapUnits) ?? 150}
          >
            <olSourceVector ref={syncPropSourceRef}></olSourceVector>
          </olLayerVector>
        </Map>
      </div>
    </div>
  );
};

//     <olSourceXYZ args={{ url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}", }} > map=m terr=p satt=s
//   </olSourceXYZ>
// </olLayerTile> */}
