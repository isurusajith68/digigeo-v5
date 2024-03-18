
import React from 'react'
import CompanyMapClickPopupHeaderRow from './company-map-click-popup-header-row';
import CompanyMapClickPopupRow from './company-map-click-popup-row';
import { useSelector } from 'react-redux';
import { Arimo } from "next/font/google";
import { Tabs, Tab } from "@nextui-org/react";

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
})

const CompanyMapClickPopup = ({}) => {
 
   //clickObjects
  const claimObj = useSelector(
    (state) => state.companyMapReducer.clickclaimObject
  );
  const fpropObj = useSelector(
    (state) => state.companyMapReducer.clickfPropertyObject
  );
  const assetObj = useSelector(
    (state) => state.companyMapReducer.clickassetObject
  );
  const syncPropObj = useSelector(
    (state) => state.companyMapReducer.clicksyncPropertyObject
  );


  return (

    


    // <div className={`flex-col max-h-unit-9xl overflow-auto m-2  ${arimo.className}`}>
      <Tabs aria-label="Options" color="primary" variant="solid">
      {syncPropObj && Object.keys(syncPropObj).length > 0 && 
        <Tab key="Property" title="Property">
              <CompanyMapClickPopupHeaderRow label="Property Info" />
              <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
                <CompanyMapClickPopupRow label={"Name:"} value={syncPropObj.prop_name}/>
                <CompanyMapClickPopupRow label={"Owners:"} value={syncPropObj.owners}/>
                <CompanyMapClickPopupRow label={"Area:"} value={syncPropObj.area}/>
                <CompanyMapClickPopupRow label={"State/Prov:"} value={syncPropObj.state_prov}/>
                <CompanyMapClickPopupRow label={"Country:"} value={syncPropObj.country} />
              </div>
        </Tab>
      }
      {fpropObj && Object.keys(fpropObj).length > 0 &&
         <Tab key="fprop" title="Featured Property">
              <CompanyMapClickPopupHeaderRow label="Featured Property Info" />
              <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
                    <CompanyMapClickPopupRow label={"Sponsored owners:"} value={fpropObj.sponsoredowners} url={fpropObj.profile }/>
                    <CompanyMapClickPopupRow label={"Property Name:"} value={fpropObj.prop_name}/>
                    <CompanyMapClickPopupRow label={"Commodity:"} value={fpropObj.commo_ref}/>
                    <CompanyMapClickPopupRow label={"Asset List:"} value={fpropObj.assets}/>
                    <CompanyMapClickPopupRow label={"Resources:"} value={fpropObj.resources}/>
                    <CompanyMapClickPopupRow label={"Map Area:"} value={fpropObj.map_area}/>
                    <CompanyMapClickPopupRow label={"Map Event:"} value={fpropObj.sale_name} /> 
                    <CompanyMapClickPopupRow label={"Ownership:"} value={fpropObj.owners} /> 
                    <CompanyMapClickPopupRow label={"External Property Page:"} value={fpropObj.prop_exturl} url={fpropObj.prop_exturl } /> 

              </div> 
        </Tab>
      }
      {assetObj && Object.keys(assetObj).length > 0 &&
         <Tab key="asset" title="Asset">
            <CompanyMapClickPopupHeaderRow label="Asset Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
                <CompanyMapClickPopupRow label={"Asset Name:"} value={assetObj.asset_name} />
                <CompanyMapClickPopupRow label={"Alias:"} value={assetObj.assetalias} />
                <CompanyMapClickPopupRow label={"Type:"} value={assetObj.asset_type} />
                <CompanyMapClickPopupRow label={"Commodities:"} value={assetObj.commodities} />
                <CompanyMapClickPopupRow label={"Region:"} value={assetObj.region} />
            </div>
        </Tab>}
      {claimObj && Object.keys(claimObj).length > 0 &&
         <Tab key="claim" title="Claim">
            <CompanyMapClickPopupHeaderRow label="Claim Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <CompanyMapClickPopupRow label={"Owner:"} value={claimObj.ownerref} />
              <CompanyMapClickPopupRow label={"Claim no:"} value={claimObj.claimno} />
            </div>
        </Tab>}
      </Tabs>
   
  );
}

export default CompanyMapClickPopup