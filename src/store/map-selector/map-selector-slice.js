import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  selectedMap: "landing",
  isSideNavOpen: true,
  areaLyrs: "m",
  companyLyrs: "m",
  propertiesLyrs: "m",
  landingMapLyrs: "m",
  areaZoomLevel: 3.25,
  companyZoomLevel: 3.25,
  propertiesZoomLevel: 3.25,
  landingMapZoomLevel: 3.25,
  areaInitialCenter: [-10694872.010699773, 7434223.337137634],
  companyInitialCenter: [-10694872.010699773, 7434223.337137634],
  propertiesInitialCenter: [-10694872.010699773, 7434223.337137634],
  landingMapInitialCenter: [-10694872.010699773, 7434223.337137634],
};

const mapSelectorSlice = createSlice({
  name: "MapSelector",
  initialState,
  reducers: {
    setSelectedMap: (state, action) => {
      state.selectedMap = action.payload;
    },
    setIsSideNavOpen: (state, action) => {
      state.isSideNavOpen = action.payload;
    },
    setAreaLyrs: (state, action) => {
      state.areaLyrs = action.payload;
      // state.currentSearchString = `?t=${state.selectedMap}&sn=${state.isSideNavOpen}&lyrs=${action.payload}&z=${state.areaZoomLevel}&c=${state.areaInitialCenter}`;
    },
    setCompanyLyrs: (state, action) => {
      state.companyLyrs = action.payload;
    },
    setPropertiesLyrs: (state, action) => {
      state.propertiesLyrs = action.payload;
    },
    setLandingMapLyrs: (state, action) => {
      state.landingMapLyrs = action.payload;
    },
    setAreaZoomLevel: (state, action) => {
      state.areaZoomLevel = action.payload;
      // state.currentSearchString = `?t=${state.selectedMap}&sn=${state.isSideNavOpen}&lyrs=${state.areaLyrs}&z=${action.payload}&c=${state.areaInitialCenter}`;
    },
    setCompanyZoomLevel: (state, action) => {
      state.companyZoomLevel = action.payload;
    },
    setPropertiesZoomLevel: (state, action) => {
      state.propertiesZoomLevel = action.payload;
    },
    setLandingMapZoomLevel: (state, action) => {
      state.landingMapZoomLevel = action.payload;
    },
    setAreaInitialCenter: (state, action) => {
      state.areaInitialCenter = action.payload;
      // state.currentSearchString = `?t=${state.selectedMap}&sn=${state.isSideNavOpen}&lyrs=${state.areaLyrs}&z=${state.areaZoomLevel}&c=${action.payload}`;
    },
    setCompanyInitialCenter: (state, action) => {
      state.companyInitialCenter = action.payload;
    },
    setPropertiesInitialCenter: (state, action) => {
      state.propertiesInitialCenter = action.payload;
    },
    setLandingMapInitialCenter: (state, action) => {
      state.landingMapInitialCenter = action.payload;
    },
  },
});

export const {
  setSelectedMap,
  setIsSideNavOpen,
  setAreaLyrs,
  setCompanyLyrs,
  setPropertiesLyrs,
  setLandingMapLyrs,
  setAreaZoomLevel,
  setCompanyZoomLevel,
  setPropertiesZoomLevel,
  setLandingMapZoomLevel,
  setAreaInitialCenter,
  setCompanyInitialCenter,
  setPropertiesInitialCenter,
  setLandingMapInitialCenter,
} = mapSelectorSlice.actions;

export default mapSelectorSlice.reducer;
