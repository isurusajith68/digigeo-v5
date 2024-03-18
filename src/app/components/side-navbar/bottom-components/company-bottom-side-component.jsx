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
import { setcompanyAreaBoundaryLayerVisible, setcompanyAssetDepositsVisible, setcompanyAssetHistoricalVisible, setcompanyAssetLayerVisible, setcompanyAssetOccurrenceVisible, setcompanyAssetOpMineVisible, setcompanyAssetZoneVisible, setcompanyClaimLayerVisible, setcompanyFpropLayerVisible, setcompanySyncClaimLinkLayerVisible, setcompanySyncPropLayerVisible } from "@/store/company-map/company-map-slice";
import Image from "next/image";

const CompanyBottomSideComp = () => {
  let pathname = "";
  const dispatch = useDispatch();
  const router = useRouter();
  try {
    pathname = window.location.href;
  } catch (error) { }

  if (pathname) {
    const r = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  
  const [property_claimLinkGroupVisible, setproperty_claimLinkGroupVisible] = useState(true)


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


    useEffect(() => {

      if (companySyncPropLayerVisible && companySyncClaimLinkLayerVisible) {
        setproperty_claimLinkGroupVisible(true)
      } else {
        setproperty_claimLinkGroupVisible(false)
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
                onClick={setcompanyAssetLayerVisibility}
                eyeState={companyAssetLayerVisible}
              >
                <div className="flex flex-col gap-1">
                  <LayerVisibleDiv
                    title="Operating Mines"
                    onClick={setcompanyAssetOpMineVisibility}
                    eyeState={companyAssetOpMineVisible}
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
                    onClick={setcompanyAssetDepositVisibility}
                    eyeState={companyAssetDepositsVisible}
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
                    onClick={setcompanyAssetZoneVisibility}
                    eyeState={companyAssetZoneVisible}
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
                    onClick={setcompanyAssetHistoricalVisibility}
                    eyeState={companyAssetHistoricalVisible}
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
                    onClick={setcompanyAssetOccurrenceVisibility}
                    eyeState={companyAssetOccurrenceVisible}
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
                    onClick={setcompanySyncPropLayerVisibility}
                    eyeState={companySyncPropLayerVisible}
                  >
                    <Image
                      src="./sync-prop.svg"
                      width={25}
                      height={10}
                      alt="prop"
                    />
                  </LayerVisibleDiv>
                  <LayerVisibleDiv
                    onClick={setcompanySyncClaimLinkLayerVisibility}
                    title="Property Outlines"
                    eyeState={companySyncClaimLinkLayerVisible}
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
                onClick={setcompanyClaimLayerVisibility}
                eyeState={companyClaimLayerVisible}
              >
                <div className="flex flex-col gap-1">
                  <LayerVisibleDiv
                    title="Claims"
                    onClick={setcompanyClaimLayerVisibility}
                    eyeState={companyClaimLayerVisible}
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
