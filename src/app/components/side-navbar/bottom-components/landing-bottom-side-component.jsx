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
  setlandingAssetLayerAlwaysVisible,
  setlmapClaimLableVisible,
  setlmapsyncPropLableVisible,
  setlmapAreaLableVisible,
  setlmapAssetLableVisible
} from "@/store/landing-map/landing-map-slice";
import Image from "next/image";

import LayerVisibleVisibilityStateDiv from './../../common-comp/layer-visible-eye-visibility-state';
import LayerVisibleLockVisibilityDiv from './../../common-comp/layer-visible-eye-with-lock-with-visibility';
import AccordionItemWithEyeWithLockVisibility from './../../common-comp/accordion-eye-with-lock-with-visibilty';
import AccordionItemWithEyeWithLockVisibilityLabel from "../../common-comp/accordion-eye-with-lock-with-visibilty-label";
import LayerVisibleWithLabelDiv from "../../common-comp/layer-visible-eye-with-label";
import LayerVisibleVisibilityStateLabelDiv from "../../common-comp/layer-visible-eye-visibility-state-label";



const LandingBottomSideComp = () => {
  let pathname = "";
  const dispatch = useDispatch();

  const [claimsVisibilityState, setclaimsVisibilityState] = useState(true);
  const [propertyOutLineVisibilityState, setpropertyOutLineVisibilityState] = useState(false);
  const [assetVisibilityState, setassetVisibilityState] = useState(true);



  const [landing_claimLinkGroupVisible, setlanding_claimLinkGroupVisible] =
    useState(true);

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

  const setlandingMapFPropLayerVisibility = (e) => {
    dispatch(setlandingMapFpropLayerVisible(!landingMapFpropLayerVisible));
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

  const landingAssetLayerAlwaysVisible = useSelector(
    (state) => state.landingMapReducer.landingAssetLayerAlwaysVisible
  );
  const isLandingMapSideNavOpen = useSelector(
    (state) => state.landingMapReducer.isLandingMapSideNavOpen
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
  const setlandingAssetLayerAlwaysVisibility = (e) => {
    dispatch(setlandingAssetLayerAlwaysVisible(!landingAssetLayerAlwaysVisible));
  };


  useEffect(() => {
    if (landingMapSyncPropLayerVisible && landingMapSyncClaimLinkLayerVisible) {
      setlanding_claimLinkGroupVisible(true);
    } else {
      setlanding_claimLinkGroupVisible(false);
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

  const landingCurrentScale = useSelector(
    (state) => state.landingMapReducer.landingCurrentScale
  );
  const landingMapViewScales = useSelector(
    (state) => state.landingMapReducer.landingMapViewScales
  );


  useEffect(() => {
    console.log("xx1-landingCurrentScale", landingCurrentScale, landingMapViewScales)
    // mapViewScaleReducer.mapViewScales?.[0]?.claimscale > areaCurrentScale ?  setclaimsVisibilityState(true): setclaimsVisibilityState(false)
    if (landingMapViewScales) {
      //console.log("xx-if bot-compo-landingMapViewScales")
      landingMapViewScales.claimscale > landingCurrentScale ? setclaimsVisibilityState(true) : setclaimsVisibilityState(false)
      landingMapViewScales.propoutlinescale > landingCurrentScale ? setpropertyOutLineVisibilityState(true) : setpropertyOutLineVisibilityState(false)
      landingMapViewScales.assetscale > landingCurrentScale ? setassetVisibilityState(true) : setassetVisibilityState(false)
    }

    // console.log("areaCurrentScale-mapViewScaleReducer ",mapViewScaleReducer.mapViewScales?.[0]?.claimscale)

  }, [landingCurrentScale, landingMapViewScales])

  const setClaimLabelVisibility = (state) => {
    dispatch(setlmapClaimLableVisible(state));
  };
  const lmapClaimLableVisible = useSelector(
    (state) => state.landingMapReducer.lmapClaimLableVisible
  );

  const setlmapsyncPropLableVisibility = (state) => {
    dispatch(setlmapsyncPropLableVisible(state));
  };
  const lmapsyncPropLableVisible = useSelector(
    (state) => state.landingMapReducer.lmapsyncPropLableVisible
  );

  const setlmapAreaLableVisibility = (state) => {
    dispatch(setlmapAreaLableVisible(state));
  };
  const lmapAreaLableVisible = useSelector(
    (state) => state.landingMapReducer.lmapAreaLableVisible
  );

  const setlmapAssetLableVisibility = (state) => {
    dispatch(setlmapAssetLableVisible(state));
  };
  const lmapAssetLableVisible = useSelector(
    (state) => state.landingMapReducer.lmapAssetLableVisible
  );

  return (
    <div className="flex flex-col w-full h-full grow">
      <div className="ml-2 mr-2 flex items-center justify-center border-b-2">
        <span className="font-bold dark:text-white text-black">Map Layers</span>
      </div>
      <div className="overflow-y-auto max-h-[53vh]">
        <Accordion>
          <div className="flex flex-col gap-1">
            <AccordionItemWithEyeWithLockVisibilityLabel
              title="Assets"
              onClick={setlandingMapAssetLayerVisibility}
              eyeState={landingMapAssetLayerVisible}
              onLockClick={setlandingAssetLayerAlwaysVisibility}
              lockState={landingAssetLayerAlwaysVisible}
              visibilityState={assetVisibilityState}
              labelState={lmapAssetLableVisible}
              setLabelState={setlmapAssetLableVisibility}

            >
              <div className="flex flex-col gap-1">
                <LayerVisibleVisibilityStateDiv
                  title="Operating Mines"
                  onClick={setlandingMapAssetOpMineVisibility}
                  eyeState={landingMapAssetOpMineVisible}
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
                  onClick={setlandingMapAssetDepositVisibility}
                  eyeState={landingMapAssetDepositsVisible}
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
                  onClick={setlandingMapAssetZoneVisibility}
                  eyeState={landingMapAssetZoneVisible}
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
                  onClick={setlandingMapAssetHistoricalVisibility}
                  eyeState={landingMapAssetHistoricalVisible}
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
                  onClick={setlandingMapAssetOccurrenceVisibility}
                  eyeState={landingMapAssetOccurrenceVisible}
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
            </AccordionItemWithEyeWithLockVisibilityLabel>
            <AccordionItemWithEye
              title="Properties"
              onClick={setPropertiesGroupEye}
              eyeState={landing_claimLinkGroupVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleWithLabelDiv
                  title="Property Points"
                  onClick={setlandingMapSyncPropLayerVisibility}
                  eyeState={landingMapSyncPropLayerVisible}
                  labelState={lmapsyncPropLableVisible}
                  setLabelState={setlmapsyncPropLableVisibility}
                >
                  <Image
                    src="./sync-prop.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleWithLabelDiv>
                <LayerVisibleVisibilityStateDiv
                  onClick={setlandingMapSyncClaimLinkLayerVisibility}
                  title="Property Outlines"
                  eyeState={landingMapSyncClaimLinkLayerVisible} //
                  visibilityState={propertyOutLineVisibilityState}
                >
                  <Image
                    src="./sync-prop-outline.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateDiv>
                {!landingMapFpropLayerVisible && !isLandingMapSideNavOpen && <LayerVisibleWithLabelDiv
                  title="Featured Properties"
                  onClick={setlandingMapFPropLayerVisibility}
                  eyeState={landingMapFpropLayerVisible}
                  labelState={lmapsyncPropLableVisible}
                  setLabelState={setlmapsyncPropLableVisibility}
                >
                  <Image
                    src="/fprops.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleWithLabelDiv>}
              </div>
            </AccordionItemWithEye>
            <AccordionItemWithEye
              title="Base Layers"
              onClick={setlandingMapClaimLayerVisibility}
              eyeState={landingMapClaimLayerVisible}
            >
              <div className="flex flex-col gap-1">
                <LayerVisibleVisibilityStateLabelDiv
                  title="Claims"
                  onClick={setlandingMapClaimLayerVisibility}
                  eyeState={landingMapClaimLayerVisible}
                  visibilityState={claimsVisibilityState}
                  labelState={lmapClaimLableVisible}
                  setLabelState={setClaimLabelVisibility}
                >
                  <Image
                    src="./claims-layer.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleVisibilityStateLabelDiv>
                <LayerVisibleWithLabelDiv
                  title="Mining Areas"
                  onClick={setlandingMapAreaBoundaryLayerVisibility}
                  eyeState={landingMapAreaBoundaryLayerVisible}
                  labelState={lmapAreaLableVisible}
                  setLabelState={setlmapAreaLableVisibility}
                >
                  <Image
                    src="./minning-areas-layer.svg"
                    width={25}
                    height={10}
                    alt="prop"
                  />
                </LayerVisibleWithLabelDiv>
              </div>
            </AccordionItemWithEye>
          </div>
        </Accordion>
      </div>
    </div>
  );
};
export default LandingBottomSideComp;
