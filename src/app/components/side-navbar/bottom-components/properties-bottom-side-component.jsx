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
  
  setpropertyMapAreaBoundaryLayerVisible,
  setpropertyMapAssetLayerVisible,
  setpropertyMapClaimLayerVisible,
  setpropertyMapFpropLayerVisible,
  setpropertyMapSyncClaimLinkLayerVisible,
  setpropertyMapSyncPropLayerVisible,
  setpropertyMapAssetOpMineVisible,
  setpropertyMapAssetDepositsVisible,
  setpropertyMapAssetZoneVisible,
  setpropertyMapAssetHistoricalVisible,
  setpropertyMapAssetOccurrenceVisible,
} from "../../../../store/properties-map/properties-map-slice";
import Image from "next/image";
 


const PropertiesBottomSideComp = () => {

   

  let pathname = "";
  const dispatch = useDispatch();
  const [property_claimLinkGroupVisible, setproperty_claimLinkGroupVisible] = useState(true)

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
  const propertyMapFpropLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapFpropLayerVisible
  );
  const propertyMapAssetLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAssetLayerVisible
  );
  const propertyMapSyncPropLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapSyncPropLayerVisible
  );
  const propertyMapSyncClaimLinkLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapSyncClaimLinkLayerVisible
  );
  const propertyMapClaimLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapClaimLayerVisible
  );
  const propertyMapAreaBoundaryLayerVisible = useSelector(
    (state) => state.propertiesMapReducer.propertyMapAreaBoundaryLayerVisible
  );
  //layer visibility functions
  const setareaFpropLayerVisibility = (e) => {
    dispatch(setpropertyMapFpropLayerVisible(!propertyMapFpropLayerVisible));
  };
  const setpropertyMapAssetLayerVisibility = (e) => {
    dispatch(setpropertyMapAssetLayerVisible(!propertyMapAssetLayerVisible));
  };
  const setpropertyMapSyncPropLayerVisibility = (e) => {
    dispatch(setpropertyMapSyncPropLayerVisible(!propertyMapSyncPropLayerVisible));
  };
  const setpropertyMapSyncClaimLinkLayerVisibility = (e) => {
    dispatch(setpropertyMapSyncClaimLinkLayerVisible(!propertyMapSyncClaimLinkLayerVisible));
  };
  const setpropertyMapClaimLayerVisibility = (e) => {
    dispatch(setpropertyMapClaimLayerVisible(!propertyMapClaimLayerVisible));
  };
  const setpropertyMapAreaBoundaryLayerVisibility = (e) => {
    dispatch(setpropertyMapAreaBoundaryLayerVisible(!propertyMapAreaBoundaryLayerVisible));
  };

//asset visibility redux states 
    const propertyMapAssetOpMineVisible = useSelector(
      (state) => state.propertiesMapReducer.propertyMapAssetOpMineVisible
    );
    const propertyMapAssetDepositsVisible = useSelector(
      (state) => state.propertiesMapReducer.propertyMapAssetDepositsVisible
    );
    const propertyMapAssetZoneVisible = useSelector(
      (state) => state.propertiesMapReducer.propertyMapAssetZoneVisible
    );
    const propertyMapAssetHistoricalVisible = useSelector(
      (state) => state.propertiesMapReducer.propertyMapAssetHistoricalVisible
    );
    const propertyMapAssetOccurrenceVisible = useSelector(
      (state) => state.propertiesMapReducer.propertyMapAssetOccurrenceVisible
    );

    //asset type visibility functions
    const setpropertyMapAssetOpMineVisibility = (e) => {
      dispatch(setpropertyMapAssetOpMineVisible(!propertyMapAssetOpMineVisible));
    }
    const setpropertyMapAssetDepositVisibility = (e) => {
      dispatch(setpropertyMapAssetDepositsVisible(!propertyMapAssetDepositsVisible));
    }
    const setpropertyMapAssetZoneVisibility = (e) => {
      dispatch(setpropertyMapAssetZoneVisible(!propertyMapAssetZoneVisible));
    }
    const setpropertyMapAssetHistoricalVisibility = (e) => {
      dispatch(setpropertyMapAssetHistoricalVisible(!propertyMapAssetHistoricalVisible));
    }
    const setpropertyMapAssetOccurrenceVisibility = (e) => {
      dispatch(setpropertyMapAssetOccurrenceVisible(!propertyMapAssetOccurrenceVisible));
    }


  useEffect(() => {
    if (propertyMapSyncPropLayerVisible && propertyMapSyncClaimLinkLayerVisible) {
      setproperty_claimLinkGroupVisible(true);
    } else {
      setproperty_claimLinkGroupVisible(false);
    }
  }, [propertyMapSyncPropLayerVisible, propertyMapSyncClaimLinkLayerVisible]);

    //handle Properties Group Eye
  const setPropertiesGroupEye = () => {
    if (propertyMapSyncPropLayerVisible || propertyMapSyncClaimLinkLayerVisible) {
      dispatch(setpropertyMapSyncPropLayerVisible(false));
      dispatch(setpropertyMapSyncClaimLinkLayerVisible(false));
    } else {
      dispatch(setpropertyMapSyncPropLayerVisible(true));
      dispatch(setpropertyMapSyncClaimLinkLayerVisible(true));
    }
  };

  return (
    <div className="flex flex-col w-full  h-full grow">
      <div className="ml-2 mr-2  flex items-center justify-center border-b-2">
        <span className="font-bold">Map Layers</span>
      </div>
      <div className="overflow-y-auto max-h-[52vh]">
        <Accordion>
          <div className="flex flex-col gap-1">
            <AccordionItemWithEye
              title="Assets"
              onClick={setpropertyMapAssetLayerVisibility}
              eyeState={propertyMapAssetLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Operating Mines"
                  onClick={setpropertyMapAssetOpMineVisibility}
                  eyeState={propertyMapAssetOpMineVisible}
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
                  onClick={setpropertyMapAssetDepositVisibility}
                  eyeState={propertyMapAssetDepositsVisible}
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
                  onClick={setpropertyMapAssetZoneVisibility}
                  eyeState={propertyMapAssetZoneVisible}
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
                  onClick={setpropertyMapAssetHistoricalVisibility}
                  eyeState={propertyMapAssetHistoricalVisible}
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
                  onClick={setpropertyMapAssetOccurrenceVisibility}
                  eyeState={propertyMapAssetOccurrenceVisible}
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
                  onClick={setpropertyMapSyncPropLayerVisibility}
                  eyeState={propertyMapSyncPropLayerVisible}
                >
                  <Image
                    src="./sync-prop.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleDiv>
                <LayerVisibleDiv
                  onClick={setpropertyMapSyncClaimLinkLayerVisibility}
                  title="Property Outlines"
                  eyeState={propertyMapSyncClaimLinkLayerVisible}
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
              onClick={setpropertyMapClaimLayerVisibility}
              eyeState={propertyMapClaimLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleDiv
                  title="Claims"
                  onClick={setpropertyMapClaimLayerVisibility}
                  eyeState={propertyMapClaimLayerVisible}
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
                  onClick={setpropertyMapAreaBoundaryLayerVisibility}
                  eyeState={propertyMapAreaBoundaryLayerVisible}
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
      {/* <Accordion variant="splitted" className="w-full">
        <AccordionItem
        key="1"
          aria-label="Accordion 1"
          title="Accordion 1"
          className="w-full bg-blue-900"
          
          >
          <span className="font-bold w-full">Map Layers 1</span>
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          <span className="font-bold">Map Layers 2</span>
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          <span className="font-bold">Map Layers 3</span>
        </AccordionItem>
      </Accordion> */}
    </div>
  );
};
export default PropertiesBottomSideComp;
