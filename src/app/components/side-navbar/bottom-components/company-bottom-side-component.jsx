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
import { setcompanyAreaBoundaryLayerVisible, 
  setcompanyAssetDepositsVisible,
   setcompanyAssetHistoricalVisible, 
   setcompanyAssetLayerVisible,
   setcompanyAssetOccurrenceVisible,
    setcompanyAssetOpMineVisible,
     setcompanyAssetZoneVisible, 
     setcompanyClaimLayerVisible, 
     setcompanyFpropLayerVisible, 
     setcompanySyncClaimLinkLayerVisible,
     setcompanySyncPropLayerVisible,
     setcompanySyncPropLayerAlwaysVisible,
     setcompanyAssetLayerAlwaysVisible,
     } from "@/store/company-map/company-map-slice";
import Image from "next/image";

import LayerVisibleVisibilityStateDiv from './../../common-comp/layer-visible-eye-visibility-state';
import LayerVisibleLockVisibilityDiv from './../../common-comp/layer-visible-eye-with-lock-with-visibility';
import AccordionItemWithEyeWithLockVisibility from './../../common-comp/accordion-eye-with-lock-with-visibilty';



const CompanyBottomSideComp = () => {
  let pathname = "";
  const dispatch = useDispatch();
 
  const [claimsVisibilityState, setclaimsVisibilityState] =  useState(true);
  const [propertyOutLineVisibilityState, setpropertyOutLineVisibilityState] =  useState(false);
  const [propertyPointLineVisibilityState, setpropertyPointLineVisibilityState] =  useState(false);
  const [assetVisibilityState, setassetVisibilityState] =  useState(true);

  const [company_claimLinkGroupVisible, setcompany_claimLinkGroupVisible] =
    useState(true);

  try {
    pathname = window.location.href;
  } catch (error) { }

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
  const companyFpropLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyFpropLayerVisible
  );
  const companyAssetLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetLayerVisible
  );
    const setareaAssetLayerAlwaysVisibility = (e) => {
    dispatch(setareaAssetLayerAlwaysVisible(!areaAssetLayerAlwaysVisible));
  };
  
  const companySyncPropLayerVisible = useSelector(
    (state) => state.companyMapReducer.companySyncPropLayerVisible
  );
  const companySyncClaimLinkLayerVisible = useSelector(
    (state) => state.companyMapReducer.companySyncClaimLinkLayerVisible
  );
  const companyClaimLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyClaimLayerVisible
  );
  const companyAreaBoundaryLayerVisible = useSelector(
    (state) => state.companyMapReducer.companyAreaBoundaryLayerVisible
  );
  //layer visibility functions
  const setcompanyFpropLayerVisibility = (e) => {
    dispatch(setcompanyFpropLayerVisible(!companyFpropLayerVisible));
  }
  const setcompanyAssetLayerVisibility = (e) => {
    dispatch(setcompanyAssetLayerVisible(!companyAssetLayerVisible));
   
  }
  const setcompanySyncPropLayerVisibility = (e) => {
    dispatch(setcompanySyncPropLayerVisible(!companySyncPropLayerVisible));
  }
  const setcompanySyncClaimLinkLayerVisibility = (e) => {
    dispatch(setcompanySyncClaimLinkLayerVisible(!companySyncClaimLinkLayerVisible));
  }
  const setcompanyClaimLayerVisibility = (e) => {
    dispatch(setcompanyClaimLayerVisible(!companyClaimLayerVisible));
  }
  const setcompanyAreaBoundaryLayerVisibility = (e) => {
    dispatch(setcompanyAreaBoundaryLayerVisible(!companyAreaBoundaryLayerVisible)); 
  }
    //asset visibility redux states 
    const companyAssetOpMineVisible = useSelector(
      (state) => state.companyMapReducer.companyAssetOpMineVisible
    );
    const companyAssetDepositsVisible = useSelector(
      (state) => state.companyMapReducer.companyAssetDepositsVisible
    );
    const companyAssetZoneVisible = useSelector(
      (state) => state.companyMapReducer.companyAssetZoneVisible
    );
    const companyAssetHistoricalVisible = useSelector(
      (state) => state.companyMapReducer.companyAssetHistoricalVisible
    );
    const companyAssetOccurrenceVisible = useSelector(
      (state) => state.companyMapReducer.companyAssetOccurrenceVisible
    );

        const companyAssetLayerAlwaysVisible = useSelector(
    (state) => state.companyMapReducer.companyAssetLayerAlwaysVisible
  );

    //asset type visibility functions
    const setcompanyAssetOpMineVisibility = (e) => {
      dispatch(setcompanyAssetOpMineVisible(!companyAssetOpMineVisible));
    }
    const setcompanyAssetDepositVisibility = (e) => {
      dispatch(setcompanyAssetDepositsVisible(!companyAssetDepositsVisible));
    }
    const setcompanyAssetZoneVisibility = (e) => {
      dispatch(setcompanyAssetZoneVisible(!companyAssetZoneVisible));
    }
    const setcompanyAssetHistoricalVisibility = (e) => {
      dispatch(setcompanyAssetHistoricalVisible(!companyAssetHistoricalVisible));
    }
    const setcompanyAssetOccurrenceVisibility = (e) => {
      dispatch(setcompanyAssetOccurrenceVisible(!companyAssetOccurrenceVisible));
    }
    const setcompanyAssetLayerAlwaysVisibility = (e) => {
    dispatch(setcompanyAssetLayerAlwaysVisible(!companyAssetLayerAlwaysVisible));
    };


    useEffect(() => {

      if (companySyncPropLayerVisible && companySyncClaimLinkLayerVisible) {
        setcompany_claimLinkGroupVisible(true)
      } else {
        setcompany_claimLinkGroupVisible(false)
      }
    
  
  
    }, [companySyncPropLayerVisible, companySyncClaimLinkLayerVisible])
  

    //handle Properties Group Eye
    const setPropertiesGroupEye = () => {

      if (companySyncPropLayerVisible || companySyncClaimLinkLayerVisible) {

        dispatch(setcompanySyncPropLayerVisible(false));
        dispatch(setcompanySyncClaimLinkLayerVisible(false));
      } else {
        dispatch(setcompanySyncPropLayerVisible(true));
        dispatch(setcompanySyncClaimLinkLayerVisible(true));
      }
    }

  
    //handle Asset Group Eye
    const setAssetGroupEye = () => {

      if (companyAssetOpMineVisible || companyAssetDepositsVisible || companyAssetZoneVisible || companyAssetHistoricalVisible || companyAssetOccurrenceVisible) {

        dispatch(setcompanyAssetOpMineVisible(false));
        dispatch(setcompanyAssetDepositsVisible(false));
        dispatch(setcompanyAssetZoneVisible(false));
        dispatch(setcompanyAssetHistoricalVisible(false));
        dispatch(setcompanyAssetOccurrenceVisible(false));
      } else {
        dispatch(setcompanyAssetOpMineVisible(true));
        dispatch(setcompanyAssetDepositsVisible(true));
        dispatch(setcompanyAssetZoneVisible(true));
        dispatch(setcompanyAssetHistoricalVisible(true));
        dispatch(setcompanyAssetOccurrenceVisible(true));
      }
    }

      useEffect(() => {
    if (companySyncPropLayerVisible && companySyncClaimLinkLayerVisible) {
      setcompany_claimLinkGroupVisible(true);
    } else {
      setcompany_claimLinkGroupVisible(false);
    }
  }, [companySyncPropLayerVisible, companySyncClaimLinkLayerVisible]);

    
    const companyCurrentScale = useSelector(
    (state) => state.companyMapReducer.companyCurrentScale
  );
    const companyMapViewScales = useSelector(
    (state) => state.companyMapReducer.companyMapViewScales
  );

  useEffect(() => {
    console.log("qq-landingCurrentScale", companyCurrentScale, companyMapViewScales)
    // mapViewScaleReducer.mapViewScales?.[0]?.claimscale > areaCurrentScale ?  setclaimsVisibilityState(true): setclaimsVisibilityState(false)
    if (companyMapViewScales) {
      //console.log("xx-if bot-compo-landingMapViewScales")
      companyMapViewScales.claimscale > companyCurrentScale ? setclaimsVisibilityState(true) : setclaimsVisibilityState(false)
      companyMapViewScales.propoutlinescale > companyCurrentScale ? setpropertyOutLineVisibilityState(true) : setpropertyOutLineVisibilityState(false)
      companyMapViewScales.proplayerscale > companyCurrentScale ? setpropertyPointLineVisibilityState(true) : setpropertyPointLineVisibilityState(false)
      companyMapViewScales.assetscale > companyCurrentScale ? setassetVisibilityState(true) : setassetVisibilityState(false)
    }

    // console.log("areaCurrentScale-mapViewScaleReducer ",mapViewScaleReducer.mapViewScales?.[0]?.claimscale)

  }, [companyCurrentScale, companyMapViewScales])

  
    
    return (
      <div className="flex flex-col w-full  h-full grow">
        <div className="ml-2 mr-2  flex items-center justify-center border-b-2">
          <span className="font-bold">Map Layers</span>
        </div>
        <div className="overflow-y-auto max-h-[52vh]">
          <Accordion>
            <div className="flex flex-col gap-1">
              <AccordionItemWithEyeWithLockVisibility
                title="Assets"
                onClick={setcompanyAssetLayerVisibility}
                eyeState={companyAssetLayerVisible}
               onLockClick={setcompanyAssetLayerAlwaysVisibility}
              lockState={companyAssetLayerAlwaysVisible}
              visibilityState={assetVisibilityState}
              >
                <div className="flex flex-col gap-1">
                  <LayerVisibleVisibilityStateDiv
                    title="Operating Mines"
                    onClick={setcompanyAssetOpMineVisibility}
                    eyeState={companyAssetOpMineVisible}
                    visibilityState={assetVisibilityState}
                  >
                    <Image
                      src="./asset-opmine.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                  <LayerVisibleVisibilityStateDiv
                    title="Deposits"
                    onClick={setcompanyAssetDepositVisibility}
                    eyeState={companyAssetDepositsVisible}
                    visibilityState={assetVisibilityState}
                  >
                    <Image
                      src="./asset-deposit.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                  <LayerVisibleVisibilityStateDiv
                    title="Zone"
                    onClick={setcompanyAssetZoneVisibility}
                    eyeState={companyAssetZoneVisible}
                    visibilityState={assetVisibilityState}
                  >
                    <Image
                      src="./asset-zone.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                  <LayerVisibleVisibilityStateDiv
                    title="Historical Mines"
                    onClick={setcompanyAssetHistoricalVisibility}
                    eyeState={companyAssetHistoricalVisible}
                    visibilityState={assetVisibilityState}
                  >
                    <Image
                      src="./asset-historical.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                  <LayerVisibleVisibilityStateDiv
                    title="Occurrences"
                    onClick={setcompanyAssetOccurrenceVisibility}
                    eyeState={companyAssetOccurrenceVisible}
                    visibilityState={assetVisibilityState}
                  >
                    <Image
                      src="./asset-occurrence.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                </div>
              </AccordionItemWithEyeWithLockVisibility>
              <AccordionItemWithEye
                title="Properties"
                onClick={setPropertiesGroupEye}
                eyeState={company_claimLinkGroupVisible}
              >
                <div className="flex flex-col gap-1">
                  <LayerVisibleVisibilityStateDiv
                    title="Property Points"
                    onClick={setcompanySyncPropLayerVisibility}
                    eyeState={companySyncPropLayerVisible}
                    visibilityState={propertyPointLineVisibilityState}
                  >
                    <Image
                      src="./sync-prop.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                  <LayerVisibleVisibilityStateDiv
                    onClick={setcompanySyncClaimLinkLayerVisibility}
                    title="Property Outlines"
                    eyeState={companySyncClaimLinkLayerVisible}
                     visibilityState={propertyOutLineVisibilityState}
                  >
                    <Image
                      src="./sync-prop-outline.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                </div>
              </AccordionItemWithEye>
              <AccordionItemWithEye
                title="Base Layers"
                onClick={setcompanyClaimLayerVisibility}
                eyeState={companyClaimLayerVisible}
              >
                <div className="flex flex-col gap-1">
                  <LayerVisibleVisibilityStateDiv
                    title="Claims"
                    onClick={setcompanyClaimLayerVisibility}
                    eyeState={companyClaimLayerVisible}
                     visibilityState={claimsVisibilityState}
                  >
                    <Image
                      src="./claims-layer.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleVisibilityStateDiv>
                  <LayerVisibleDiv
                    title="Mining Areas"
                    onClick={setcompanyAreaBoundaryLayerVisibility}
                    eyeState={companyAreaBoundaryLayerVisible}
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
  
}

export default CompanyBottomSideComp;
