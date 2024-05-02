import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isCompanySideNavOpen: false,
  companyName: "",
  companyId: "",
  companyStockcode: "",
  syncPropertyFeatures: undefined,
  featuredPropertyFeatures: undefined,
  syncClaimLinkPropertyFeatures: undefined,
  assetFeatures: undefined,
  companyZoomMode: "custom",
  companyFpropLayerVisible: true,
  companyAssetLayerVisible: true,
  companySyncPropLayerVisible: true,
  companySyncClaimLinkLayerVisible: true,
  companyClaimLayerVisible: true,
  companyAreaBoundaryLayerVisible: true,
  companyAssetOpMineVisible: true,
  companyAssetDepositsVisible: true,
  companyAssetZoneVisible: true,
  companyAssetHistoricalVisible: true,
  companyAssetOccurrenceVisible: true,
  companyFlyToLocation: [],
  clickclaimObject: undefined,
  clickfPropertyObject: undefined,
  clickassetObject: undefined,
  clicksyncPropertyObject: undefined,
  navigatedFPropId: 0,
  companySyncPropLayerAlwaysVisible: false,
  companyAssetLayerAlwaysVisible: false,
  companyCurrentScale: 5,
  companyMapViewScales: {},
  cmapsyncPropLableVisible: true,
  cmapFpropLableVisible: true,
  cmapAssetLableVisible: true,
  cmapClaimLableVisible: true,
  cmapAreaLableVisible: true,
  cmapNavigationExtent: [],
  cmapNavigationHighlightFProps: [],
};

const companyMapSlice = createSlice({
  name: "CompanyMap",
  initialState,
  reducers: {
    setcmapNavigationExtent: (state, action) => {
      state.cmapNavigationExtent = action.payload;
    },
    setcmapNavigationHighlightFProps: (state, action) => {
      state.cmapNavigationHighlightFProps = action.payload;
    },
    setIsCompanySideNavOpen: (state, action) => {
      state.isCompanySideNavOpen = action.payload;
    },
    setcompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setcompanyId: (state, action) => {
      state.companyId = action.payload;
    },
    setcompanyStockcode: (state, action) => {
      state.companyStockcode = action.payload;
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
    setcompanyZoomMode: (state, action) => {
      state.companyZoomMode = action.payload;
    },
    //layer visibility
    setcompanyFpropLayerVisible: (state, action) => {
      state.companyFpropLayerVisible = action.payload;
    },
    setcompanyAssetLayerVisible: (state, action) => {
      state.companyAssetLayerVisible = action.payload;
    },
    setcompanySyncPropLayerVisible: (state, action) => {
      state.companySyncPropLayerVisible = action.payload;
    },
    setcompanySyncClaimLinkLayerVisible: (state, action) => {
      state.companySyncClaimLinkLayerVisible = action.payload;
    },
    setcompanyClaimLayerVisible: (state, action) => {
      state.companyClaimLayerVisible = action.payload;
    },
    setcompanyAreaBoundaryLayerVisible: (state, action) => {
      state.companyAreaBoundaryLayerVisible = action.payload;
    },
    //asset types
    setcompanyAssetOpMineVisible: (state, action) => {
      state.companyAssetOpMineVisible = action.payload;
    },
    setcompanyAssetDepositsVisible: (state, action) => {
      state.companyAssetDepositsVisible = action.payload;
    },
    setcompanyAssetZoneVisible: (state, action) => {
      state.companyAssetZoneVisible = action.payload;
    },
    setcompanyAssetHistoricalVisible: (state, action) => {
      state.companyAssetHistoricalVisible = action.payload;
    },
    setcompanyAssetOccurrenceVisible: (state, action) => {
      state.companyAssetOccurrenceVisible = action.payload;
    },
    setcompanyFlyToLocation: (state, action) => {
      state.companyFlyToLocation = action.payload;
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
    setcompanySyncPropLayerAlwaysVisible: (state, action) => {
      state.companySyncPropLayerAlwaysVisible = action.payload;
    },
    setcompanyAssetLayerAlwaysVisible: (state, action) => {
      state.companyAssetLayerAlwaysVisible = action.payload;
    },
    setcompanyCurrentScale: (state, action) => {
      state.companyCurrentScale = action.payload;
    },

    setcompanyMapViewScales: (state, action) => {
      state.companyMapViewScales = action.payload;
    },
    setcmapsyncPropLableVisible: (state, action) => {
      state.cmapsyncPropLableVisible = action.payload;
    },
    setcmapFpropLableVisible: (state, action) => {
      state.cmapFpropLableVisible = action.payload;
    },
    setcmapAssetLableVisible: (state, action) => {
      state.cmapAssetLableVisible = action.payload;
    },
    setcmapClaimLableVisible: (state, action) => {
      state.cmapClaimLableVisible = action.payload;
    },
    setcmapAreaLableVisible: (state, action) => {
      state.cmapAreaLableVisible = action.payload;
    },
  },
});

export const {
  setcmapNavigationHighlightFProps,
  setcmapNavigationExtent,
  setIsCompanySideNavOpen,
  setcompanyName,
  setcompanyId,
  setcompanyStockcode,
  setSyncPropertyFeatures,
  setFPropertyFeatures,
  setsyncClaimLinkPropertyFeatures,
  setAssetFeatures,
  setcompanyZoomMode,
  setcompanyFpropLayerVisible,
  setcompanyAssetLayerVisible,
  setcompanySyncPropLayerVisible,
  setcompanySyncClaimLinkLayerVisible,
  setcompanyClaimLayerVisible,
  setcompanyAssetOpMineVisible,
  setcompanyAssetDepositsVisible,
  setcompanyAssetZoneVisible,
  setcompanyAssetHistoricalVisible,
  setcompanyAssetOccurrenceVisible,
  setcompanyAreaBoundaryLayerVisible,
  setcompanyFlyToLocation,
  setclickclaimObject,
  setclickfPropertyObject,
  setclickassetObject,
  setclicksyncPropertyObject,
  setnavigatedFPropId,
  setcompanySyncPropLayerAlwaysVisible,
  setcompanyAssetLayerAlwaysVisible,
  setcompanyCurrentScale,
  setcompanyMapViewScales,
  setcmapsyncPropLableVisible,
  setcmapFpropLableVisible,
  setcmapAssetLableVisible,
  setcmapClaimLableVisible,
  setcmapAreaLableVisible,
} = companyMapSlice.actions;

export default companyMapSlice.reducer;
