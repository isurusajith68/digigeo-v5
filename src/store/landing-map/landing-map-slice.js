import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isLandingMapSideNavOpen: false,
  landingMapCountry: "",
  landingMapMiningArea: "",
  syncPropertyFeatures: undefined,
  featuredPropertyFeatures: undefined,
  syncClaimLinkPropertyFeatures: undefined,
  assetFeatures: undefined,
  landingMapZoomMode: "custom",
  landingMapFpropLayerVisible: true,  
  landingMapAssetLayerVisible: true,
  landingMapSyncPropLayerVisible: true,
  landingMapSyncClaimLinkLayerVisible: true,
  landingMapClaimLayerVisible: true,
  landingMapAreaBoundaryLayerVisible: true,
  landingMapAssetOpMineVisible: true,
  landingMapAssetDepositsVisible: true,
  landingMapAssetZoneVisible: true,
  landingMapAssetHistoricalVisible: true,
  landingMapAssetOccurrenceVisible: true,
  landingMapFlyToLocation: [],
  clickclaimObject: undefined,
  clickfPropertyObject: undefined,
  clickassetObject: undefined,
  clicksyncPropertyObject: undefined,
  navigatedFPropId: 0,
  popupFcompanyId: 0,
  landingSyncPropLayerAlwaysVisible: false,
  landingAssetLayerAlwaysVisible: false,
  landingPropOutlineLayerAlwaysVisible: false,
  landingCurrentScale: 5,
  landingMapViewScales: {},
  lmapsyncPropLableVisible:true,
  lmapFpropLableVisible:true,
  lmapAssetLableVisible:true,
  lmapClaimLableVisible:true,
  lmapAreaLableVisible:true,
};

const landingMapMapSlice = createSlice({
  name: "LandingMap",
  initialState,
  reducers: {
    setIsLandingMapSideNavOpen: (state, action) => {
      state.isLandingMapSideNavOpen = action.payload;
    },
    setAreaCountry: (state, action) => {
      state.landingMapCountry = action.payload;
    },
    setAreaMiningArea: (state, action) => {
      state.landingMapMiningArea = action.payload;
    },
    setSyncPropertyFeatures: (state, action) => {
      state.syncPropertyFeatures = action.payload;
    },
    setFPropertyFeatures: (state, action) => {
      state.featuredPropertyFeatures = action.payload;
    },
    setsyncClaimLinkPropertyFeatures: (state, action) => {
      state.syncClaimLinkPropertyFeatures = action.payload;
    },
    setAssetFeatures: (state, action) => {
      state.assetFeatures = action.payload;
    },
    setAreaZoomMode: (state, action) => {
      state.landingMapZoomMode = action.payload;
    },
    //layer visibility
    setlandingMapFpropLayerVisible: (state, action) => {
      state.landingMapFpropLayerVisible = action.payload;
    },
    setlandingMapAssetLayerVisible: (state, action) => {
      state.landingMapAssetLayerVisible = action.payload;
    },
    setlandingMapSyncPropLayerVisible: (state, action) => {
      state.landingMapSyncPropLayerVisible = action.payload;
    },
    setlandingMapSyncClaimLinkLayerVisible: (state, action) => {
      state.landingMapSyncClaimLinkLayerVisible = action.payload;
    },
    setlandingMapClaimLayerVisible: (state, action) => {
      state.landingMapClaimLayerVisible = action.payload;
    },
    setlandingMapAreaBoundaryLayerVisible: (state, action) => {
      state.landingMapAreaBoundaryLayerVisible = action.payload;
    },
    //asset types
    setlandingMapAssetOpMineVisible: (state, action) => {
      state.landingMapAssetOpMineVisible = action.payload;
    },
    setlandingMapAssetDepositsVisible: (state, action) => {
      state.landingMapAssetDepositsVisible = action.payload;
    },
    setlandingMapAssetZoneVisible: (state, action) => {
      state.landingMapAssetZoneVisible = action.payload;
    },
    setlandingMapAssetHistoricalVisible: (state, action) => {
      state.landingMapAssetHistoricalVisible = action.payload;
    },
    setlandingMapAssetOccurrenceVisible: (state, action) => {
      state.landingMapAssetOccurrenceVisible = action.payload;
    },
    setlandingMapFlyToLocation: (state, action) => {
      state.landingMapFlyToLocation = action.payload;
    },
    //single click objects
    setclickclaimObject: (state, action) => {
      state.clickclaimObject = action.payload;
    },
    setclickfPropertyObject: (state, action) => {
      state.clickfPropertyObject = action.payload;
    },
    setclickassetObject: (state, action) => {
      state.clickassetObject = action.payload;
    },
    setclicksyncPropertyObject: (state, action) => {
      state.clicksyncPropertyObject = action.payload;
    },
    setnavigatedFPropId: (state, action) => {
      state.navigatedFPropId = action.payload;
    },
    setpopupFcompanyId: (state, action) => {
      state.popupFcompanyId = action.payload;
    },
    setlandingSyncPropLayerAlwaysVisible: (state, action) => {
      state.landingSyncPropLayerAlwaysVisible = action.payload;
    },
    setlandingAssetLayerAlwaysVisible: (state, action) => {
      state.landingAssetLayerAlwaysVisible = action.payload;
    },

    setlandingCurrentScale: (state, action) => {
      state.landingCurrentScale = action.payload;
    },

    setlandingMapViewScales: (state, action) => {
      state.landingMapViewScales = action.payload;
    },
    setlmapsyncPropLableVisible: (state, action) => {
      state.lmapsyncPropLableVisible = action.payload;
    },
    setlmapFpropLableVisible: (state, action) => {
      state.lmapFpropLableVisible = action.payload;
    },
    setlmapAssetLableVisible: (state, action) => {
      state.lmapAssetLableVisible = action.payload;
    },
    setlmapClaimLableVisible: (state, action) => {
      state.lmapClaimLableVisible = action.payload;
    },
    setlmapAreaLableVisible: (state, action) => {
      state.lmapAreaLableVisible = action.payload;
    },
     
  
  },
});

export const {
  setlmapsyncPropLableVisible,
  setlmapFpropLableVisible,
  setlmapAssetLableVisible,
  setlmapClaimLableVisible,
  setlmapAreaLableVisible,
  setAreaCountry,
  setAreaMiningArea,
  setIsLandingMapSideNavOpen,
  setSyncPropertyFeatures,
  setFPropertyFeatures,
  setsyncClaimLinkPropertyFeatures,
  setAssetFeatures,
  setAreaZoomMode,
  setlandingMapFpropLayerVisible,
  setlandingMapAssetLayerVisible,
  setlandingMapSyncPropLayerVisible,
  setlandingMapSyncClaimLinkLayerVisible,
  setlandingMapClaimLayerVisible,
  setlandingMapAssetOpMineVisible,
  setlandingMapAssetDepositsVisible,
  setlandingMapAssetZoneVisible,
  setlandingMapAssetHistoricalVisible,
  setlandingMapAssetOccurrenceVisible,
  setlandingMapAreaBoundaryLayerVisible,
  setlandingMapFlyToLocation,
  setclickclaimObject,
  setclickfPropertyObject,
  setclickassetObject,
  setclicksyncPropertyObject,
  setnavigatedFPropId,
  setpopupFcompanyId,
   setlandingSyncPropLayerAlwaysVisible,
  setlandingAssetLayerAlwaysVisible,
  setlandingCurrentScale,
  setlandingMapViewScales,
} = landingMapMapSlice.actions;

export default landingMapMapSlice.reducer;
