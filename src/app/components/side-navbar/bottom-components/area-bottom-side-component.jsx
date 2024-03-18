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
import {
  setareaAreaBoundaryLayerVisible,
  setareaAssetDepositsVisible,
  setareaAssetHistoricalVisible,
  setareaAssetLayerVisible,
  setareaAssetOccurrenceVisible,
  setareaAssetOpMineVisible,
  setareaAssetZoneVisible,
  setareaClaimLayerVisible,
  setareaFpropLayerVisible,
  setareaSyncClaimLinkLayerVisible,
  setareaSyncPropLayerVisible,
} from "@/store/area-map/area-map-slice";
import Image from "next/image";

const AreaBottomSideComp = () => {
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

  const isAreaSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isAreaSideNavOpen
  );
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
  //layer visibility functions
  const setareaFpropLayerVisibility = (e) => {
    dispatch(setareaFpropLayerVisible(!areaFpropLayerVisible));
  };
  const setareaAssetLayerVisibility = (e) => {
    dispatch(setareaAssetLayerVisible(!areaAssetLayerVisible));
  };
  const setareaSyncPropLayerVisibility = (e) => {
    dispatch(setareaSyncPropLayerVisible(!areaSyncPropLayerVisible));
  };
  const setareaSyncClaimLinkLayerVisibility = (e) => {
    dispatch(setareaSyncClaimLinkLayerVisible(!areaSyncClaimLinkLayerVisible));
  };
  const setareaClaimLayerVisibility = (e) => {
    dispatch(setareaClaimLayerVisible(!areaClaimLayerVisible));
  };
  const setareaAreaBoundaryLayerVisibility = (e) => {
    dispatch(setareaAreaBoundaryLayerVisible(!areaAreaBoundaryLayerVisible));
  };

  //asset visibility redux states
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

  //asset type visibility functions
  const setareaAssetOpMineVisibility = (e) => {
    dispatch(setareaAssetOpMineVisible(!areaAssetOpMineVisible));
  };
  const setareaAssetDepositVisibility = (e) => {
    dispatch(setareaAssetDepositsVisible(!areaAssetDepositsVisible));
  };
  const setareaAssetZoneVisibility = (e) => {
    dispatch(setareaAssetZoneVisible(!areaAssetZoneVisible));
  };
  const setareaAssetHistoricalVisibility = (e) => {
    dispatch(setareaAssetHistoricalVisible(!areaAssetHistoricalVisible));
  };
  const setareaAssetOccurrenceVisibility = (e) => {
    dispatch(setareaAssetOccurrenceVisible(!areaAssetOccurrenceVisible));
  };

  useEffect(() => {
    if (areaSyncPropLayerVisible && areaSyncClaimLinkLayerVisible) {
      setproperty_claimLinkGroupVisible(true);
    } else {
      setproperty_claimLinkGroupVisible(false);
    }
  }, [areaSyncPropLayerVisible, areaSyncClaimLinkLayerVisible]);

  //handle Properties Group Eye
  const setPropertiesGroupEye = () => {
    if (areaSyncPropLayerVisible || areaSyncClaimLinkLayerVisible) {
      dispatch(setareaSyncPropLayerVisible(false));
      dispatch(setareaSyncClaimLinkLayerVisible(false));
    } else {
      dispatch(setareaSyncPropLayerVisible(true));
      dispatch(setareaSyncClaimLinkLayerVisible(true));
    }
  };

  //handle Asset Group Eye
  const setAssetGroupEye = () => {
    if (
      areaAssetOpMineVisible ||
      areaAssetDepositsVisible ||
      areaAssetZoneVisible ||
      areaAssetHistoricalVisible ||
      areaAssetOccurrenceVisible
    ) {
      dispatch(setareaAssetOpMineVisible(false));
      dispatch(setareaAssetDepositsVisible(false));
      dispatch(setareaAssetZoneVisible(false));
      dispatch(setareaAssetHistoricalVisible(false));
      dispatch(setareaAssetOccurrenceVisible(false));
    } else {
      dispatch(setareaAssetOpMineVisible(true));
      dispatch(setareaAssetDepositsVisible(true));
      dispatch(setareaAssetZoneVisible(true));
      dispatch(setareaAssetHistoricalVisible(true));
      dispatch(setareaAssetOccurrenceVisible(true));
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
              onClick={setareaAssetLayerVisibility}
              eyeState={areaAssetLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Operating Mines"
                  onClick={setareaAssetOpMineVisibility}
                  eyeState={areaAssetOpMineVisible}
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
                  onClick={setareaAssetDepositVisibility}
                  eyeState={areaAssetDepositsVisible}
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
                  onClick={setareaAssetZoneVisibility}
                  eyeState={areaAssetZoneVisible}
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
                  onClick={setareaAssetHistoricalVisibility}
                  eyeState={areaAssetHistoricalVisible}
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
                  onClick={setareaAssetOccurrenceVisibility}
                  eyeState={areaAssetOccurrenceVisible}
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
                  onClick={setareaSyncPropLayerVisibility}
                  eyeState={areaSyncPropLayerVisible}
                >
                  <Image
                    src="./sync-prop.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  onClick={setareaSyncClaimLinkLayerVisibility}
                  title="Property Outlines"
                  eyeState={areaSyncClaimLinkLayerVisible}
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
              onClick={setareaClaimLayerVisibility}
              eyeState={areaClaimLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Claims"
                  onClick={setareaClaimLayerVisibility}
                  eyeState={areaClaimLayerVisible}
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
                  onClick={setareaAreaBoundaryLayerVisibility}
                  eyeState={areaAreaBoundaryLayerVisible}
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
export default AreaBottomSideComp;
