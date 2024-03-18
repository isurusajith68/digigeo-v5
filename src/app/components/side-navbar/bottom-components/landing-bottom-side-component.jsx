"use client";

// import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { GiEarthAmerica } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Accordion from "../../common-comp/accordion";
import AccordionItemWithEye from "../../common-comp/accordion-eye";
import LayerVisibleDiv from "../../common-comp/layer-visible-eye";
import { AiFillAppstore } from "react-icons/ai";
import {
  setlandingMapAreaBoundaryLayerVisible,
  setlandingMapAssetDepositsVisible,
  setlandingMapAssetHistoricalVisible,
  setlandingMapAssetLayerVisible,
  setlandingMapAssetOccurrenceVisible,
  setlandingMapAssetOpMineVisible,
  setlandingMapAssetZoneVisible,
  setlandingMapClaimLayerVisible,
  setlandingMapFpropLayerVisible,
  setlandingMapSyncClaimLinkLayerVisible,
  setlandingMapSyncPropLayerVisible,
} from "@/store/landing-map/landing-map-slice";
import Image from "next/image";

const LandingBottomSideComp = () => {
  let pathname = "";
  const dispatch = useDispatch();

  const [property_claimLinkGroupVisible, setproperty_claimLinkGroupVisible] =
    useState(true);

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

 
  const accordionItems = [
    {
      title: "Assets",
      content: "Content for Accordion Item 1",
    },
    {
      title: "Properties",
      content: "Content for Accordion Item 2",
    },
    {
      title: "Claims",
      content: "Content for Accordion Item 3",
    },
  ];

  //layer visibility redux states
  const landingMapFpropLayerVisible = useSelector(
    (state) => state.landingMapReducer.landingMapFpropLayerVisible
  );
  const landingMapAssetLayerVisible = useSelector(
    (state) => state.landingMapReducer.landingMapAssetLayerVisible
  );
  const landingMapSyncPropLayerVisible = useSelector(
    (state) => state.landingMapReducer.landingMapSyncPropLayerVisible
  );
  const landingMapSyncClaimLinkLayerVisible = useSelector(
    (state) => state.landingMapReducer.landingMapSyncClaimLinkLayerVisible
  );
  const landingMapClaimLayerVisible = useSelector(
    (state) => state.landingMapReducer.landingMapClaimLayerVisible
  );
  const landingMapAreaBoundaryLayerVisible = useSelector(
    (state) => state.landingMapReducer.landingMapAreaBoundaryLayerVisible
  );
  //layer visibility functions
  const setlandingMapFpropLayerVisibility = (e) => {
    dispatch(setlandingMapFpropLayerVisible(!landingMapFpropLayerVisible));
  };
  const setlandingMapAssetLayerVisibility = (e) => {
    dispatch(setlandingMapAssetLayerVisible(!landingMapAssetLayerVisible));
  };
  const setlandingMapSyncPropLayerVisibility = (e) => {
    dispatch(setlandingMapSyncPropLayerVisible(!landingMapSyncPropLayerVisible));
  };
  const setlandingMapSyncClaimLinkLayerVisibility = (e) => {
    dispatch(setlandingMapSyncClaimLinkLayerVisible(!landingMapSyncClaimLinkLayerVisible));
  };
  const setlandingMapClaimLayerVisibility = (e) => {
    dispatch(setlandingMapClaimLayerVisible(!landingMapClaimLayerVisible));
  };
  const setlandingMapAreaBoundaryLayerVisibility = (e) => {
    dispatch(setlandingMapAreaBoundaryLayerVisible(!landingMapAreaBoundaryLayerVisible));
  };

  //asset visibility redux states
  const landingMapAssetOpMineVisible = useSelector(
    (state) => state.landingMapReducer.landingMapAssetOpMineVisible
  );
  const landingMapAssetDepositsVisible = useSelector(
    (state) => state.landingMapReducer.landingMapAssetDepositsVisible
  );
  const landingMapAssetZoneVisible = useSelector(
    (state) => state.landingMapReducer.landingMapAssetZoneVisible
  );
  const landingMapAssetHistoricalVisible = useSelector(
    (state) => state.landingMapReducer.landingMapAssetHistoricalVisible
  );
  const landingMapAssetOccurrenceVisible = useSelector(
    (state) => state.landingMapReducer.landingMapAssetOccurrenceVisible
  );

  //asset type visibility functions
  const setlandingMapAssetOpMineVisibility = (e) => {
    dispatch(setlandingMapAssetOpMineVisible(!landingMapAssetOpMineVisible));
  };
  const setlandingMapAssetDepositVisibility = (e) => {
    dispatch(setlandingMapAssetDepositsVisible(!landingMapAssetDepositsVisible));
  };
  const setlandingMapAssetZoneVisibility = (e) => {
    dispatch(setlandingMapAssetZoneVisible(!landingMapAssetZoneVisible));
  };
  const setlandingMapAssetHistoricalVisibility = (e) => {
    dispatch(setlandingMapAssetHistoricalVisible(!landingMapAssetHistoricalVisible));
  };
  const setlandingMapAssetOccurrenceVisibility = (e) => {
    dispatch(setlandingMapAssetOccurrenceVisible(!landingMapAssetOccurrenceVisible));
  };

  useEffect(() => {
    if (landingMapSyncPropLayerVisible && landingMapSyncClaimLinkLayerVisible) {
      setproperty_claimLinkGroupVisible(true);
    } else {
      setproperty_claimLinkGroupVisible(false);
    }
  }, [landingMapSyncPropLayerVisible, landingMapSyncClaimLinkLayerVisible]);

  //handle Properties Group Eye
  const setPropertiesGroupEye = () => {
    if (landingMapSyncPropLayerVisible || landingMapSyncClaimLinkLayerVisible) {
      dispatch(setlandingMapSyncPropLayerVisible(false));
      dispatch(setlandingMapSyncClaimLinkLayerVisible(false));
    } else {
      dispatch(setlandingMapSyncPropLayerVisible(true));
      dispatch(setlandingMapSyncClaimLinkLayerVisible(true));
    }
  };

  //handle Asset Group Eye
  const setAssetGroupEye = () => {
    if (
      landingMapAssetOpMineVisible ||
      landingMapAssetDepositsVisible ||
      landingMapAssetZoneVisible ||
      landingMapAssetHistoricalVisible ||
      landingMapAssetOccurrenceVisible
    ) {
      dispatch(setlandingMapAssetDepositsVisible(false));
      dispatch(setlandingMapAssetOpMineVisible(false));
      dispatch(setlandingMapAssetZoneVisible(false));
      dispatch(setlandingMapAssetHistoricalVisible(false));
      dispatch(setlandingMapAssetOccurrenceVisible(false));
    } else {
      dispatch(setlandingMapAssetDepositsVisible(true));
      dispatch(setlandingMapAssetOpMineVisible(true));
      dispatch(setlandingMapAssetZoneVisible(true));
      dispatch(setlandingMapAssetHistoricalVisible(true));
      dispatch(setlandingMapAssetOccurrenceVisible(true));
    }
  };

  return (
    <div className="flex flex-col w-full h-full grow">
      <div className="ml-2 mr-2 flex items-center justify-center border-b-2">
        <span className="font-bold">Map Layers</span>
      </div>
      <div className="overflow-y-auto max-h-[53vh]">
        <Accordion>
          <div className="flex flex-col gap-1">
            <AccordionItemWithEye
              title="Assets"
              onClick={setlandingMapAssetLayerVisibility}
              eyeState={landingMapAssetLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Operating Mines"
                  onClick={setlandingMapAssetOpMineVisibility}
                  eyeState={landingMapAssetOpMineVisible}
                >
                  <Image
                    src="./asset-opmine.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Deposits"
                  onClick={setlandingMapAssetDepositVisibility}
                  eyeState={landingMapAssetDepositsVisible}
                >
                  <Image
                    src="./asset-deposit.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Zone"
                  onClick={setlandingMapAssetZoneVisibility}
                  eyeState={landingMapAssetZoneVisible}
                >
                  <Image
                    src="./asset-zone.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Historical Mines"
                  onClick={setlandingMapAssetHistoricalVisibility}
                  eyeState={landingMapAssetHistoricalVisible}
                >
                  <Image
                    src="./asset-historical.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Occurrences"
                  onClick={setlandingMapAssetOccurrenceVisibility}
                  eyeState={landingMapAssetOccurrenceVisible}
                >
                  <Image
                    src="./asset-occurrence.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
            <AccordionItemWithEye
              title="Properties"
              onClick={setPropertiesGroupEye}
              eyeState={property_claimLinkGroupVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Property Points"
                  onClick={setlandingMapSyncPropLayerVisibility}
                  eyeState={landingMapSyncPropLayerVisible}
                >
                  <Image
                    src="./sync-prop.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  onClick={setlandingMapSyncClaimLinkLayerVisibility}
                  title="Property Outlines"
                  eyeState={landingMapSyncClaimLinkLayerVisible}
                >
                  <Image
                    src="./sync-prop-outline.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
            <AccordionItemWithEye
              title="Claims"
              onClick={setlandingMapClaimLayerVisibility}
              eyeState={landingMapClaimLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Claims"
                  onClick={setlandingMapClaimLayerVisibility}
                  eyeState={landingMapClaimLayerVisible}
                >
                  <Image
                    src="./claims-layer.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  title="Mining Areas"
                  onClick={setlandingMapAreaBoundaryLayerVisibility}
                  eyeState={landingMapAreaBoundaryLayerVisible}
                >
                  <Image
                    src="./minning-areas-layer.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
              </div>
            </AccordionItemWithEye>
          </div>
        </Accordion>
      </div>
    </div>
  );
};
export default LandingBottomSideComp;
