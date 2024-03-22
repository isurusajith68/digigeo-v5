


export const updateWindowsHistoryAmap=({isSideNavOpen,areaLyrs,areaZoomLevel,areaInitialCenter,country,miningArea,areaId} )=>{

    const selectedMap="area"
      const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${country}&ma=${miningArea}&aid=${areaId}`;

  
  window.history.replaceState({}, "", newUrl);
}

export const updateWindowsHistoryCmap=({isSideNavOpen,areaLyrs,areaZoomLevel,areaInitialCenter,country,miningArea,areaId} )=>{

    const selectedMap="company"
      const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${country}&ma=${miningArea}&aid=${areaId}`;

  
  window.history.replaceState({}, "", newUrl);
}

export const updateWindowsHistoryLmap=({isSideNavOpen,sidenav2,lyrs,zoom,center} )=>{

    const selectedMap="landing"
      const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=${sidenav2}&lyrs=${lyrs}&z=${zoom}&c=${center}`;

  
  window.history.replaceState({}, "", newUrl);
}


export const updateWindowsHistory=(newUrl )=>{

   
  
  window.history.replaceState({}, "", newUrl);
}