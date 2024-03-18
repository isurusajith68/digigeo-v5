
import React from 'react'
import PropertyMapClickPopupHeaderRow from './property-map-click-popup-header-row';
import PropertyMapClickPopupRow from './property-map-click-popup-row';
import { useSelector } from 'react-redux';
import { Arimo } from "next/font/google";
import { Tabs, Tab } from "@nextui-org/react";

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
})

const PropertyMapClickPopup = ({}) => {
 
   //clickObjects
  const claimObj = useSelector(
    (state) => state.propertiesMapReducer.clickclaimObject
  );
  const fpropObj = useSelector(
    (state) => state.propertiesMapReducer.clickfPropertyObject
  );
  const assetObj = useSelector(
    (state) => state.propertiesMapReducer.clickassetObject
  );
  const syncPropObj = useSelector(
    (state) => state.propertiesMapReducer.clicksyncPropertyObject
  );


  return (

    


    // <div  className={`flex-col max-h-unit-9xl overflow-auto m-2  ${arimo.className}`}>
      <Tabs aria-label="Options" color="primary" variant="solid">
      {syncPropObj && Object.keys(syncPropObj).length > 0 &&
        <Tab key="Property" title="Property">
          <PropertyMapClickPopupHeaderRow label="Property Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
                <PropertyMapClickPopupRow label={"Name:"} value={syncPropObj.prop_name}/>
                <PropertyMapClickPopupRow label={"Owners:"} value={syncPropObj.owners}/>
                <PropertyMapClickPopupRow label={"Area:"} value={syncPropObj.area}/>
                <PropertyMapClickPopupRow label={"State/Prov:"} value={syncPropObj.state_prov}/>
                <PropertyMapClickPopupRow label={"Country:"} value={syncPropObj.country} />
          </div>
        </Tab>
      }
      {fpropObj && Object.keys(fpropObj).length > 0 &&
        <Tab key="fprop" title="Featured Property">
            <PropertyMapClickPopupHeaderRow label="Featured Property Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <PropertyMapClickPopupRow label={"Sponsored owners:"} value={fpropObj.sponsoredowners} url={fpropObj.profile }/>
              <PropertyMapClickPopupRow label={"Property Name:"} value={fpropObj.prop_name}/>
              <PropertyMapClickPopupRow label={"Commodity:"} value={fpropObj.commo_ref}/>
              <PropertyMapClickPopupRow label={"Asset List:"} value={fpropObj.assets}/>
              <PropertyMapClickPopupRow label={":"} value={fpropObj.resources}/>
              <PropertyMapClickPopupRow label={"Map Area:"} value={fpropObj.map_area}/>
              <PropertyMapClickPopupRow label={"Map Event:"} value={fpropObj.sale_name} /> 
              <PropertyMapClickPopupRow label={"Ownership:"} value={fpropObj.owners} /> 
              <PropertyMapClickPopupRow label={"External Property Page:"} value={fpropObj.prop_exturl} url={fpropObj.prop_exturl } /> 
         
            </div>
         </Tab>
      }
      {assetObj  && Object.keys(assetObj).length > 0 && 
       <Tab key="asset" title="Asset">
              <PropertyMapClickPopupHeaderRow label="Asset Info" />
              <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
                <PropertyMapClickPopupRow label={"Asset Name:"} value={assetObj.asset_name} />
                <PropertyMapClickPopupRow label={"Alias:"} value={assetObj.assetalias} />
                <PropertyMapClickPopupRow label={"Type:"} value={assetObj.asset_type} />
                <PropertyMapClickPopupRow label={"Commodities:"} value={assetObj.commodities} />
                <PropertyMapClickPopupRow label={"Region:"} value={assetObj.region} />
              </div>
      </Tab>}
       {claimObj  &&  Object.keys(claimObj).length > 0 && 
  <Tab key="claim" title="Claim">
          <PropertyMapClickPopupHeaderRow label="Claim Info" />
          <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
            <PropertyMapClickPopupRow label={"Owner:"} value={claimObj.ownerref} />
            <PropertyMapClickPopupRow label={"Claimn no:"} value={claimObj.claimno} />
          </div>
      </Tab>}
    {/* </div> */}
    </Tabs>
  )
}

export default PropertyMapClickPopup