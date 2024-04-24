
import { useEffect, useState } from "react";
import LandingMapClickPopupHeaderRow from './landing-map-click-popup-header-row';
import LandingMapClickPopupRow from './landing-map-click-popup-row';
import LandingMapClickPopupRowMultiValue from './landing-map-click-popup-row-multiValue';
import { useSelector } from 'react-redux';
import { Arimo } from "next/font/google";
import { Tabs, Tab } from "@nextui-org/react";

const arimo = Arimo({
  subsets: ['latin'],
  display: 'swap',
})

const LandingMapClickPopup = ({ claimObj, fpropObj, assetObj, syncPropObj }) => {

  


  //clickObjects
  // const claimObj = useSelector(
  //   (state) => state.areaMapReducer.clickclaimObject
  // );
  // const fpropObj = useSelector(
  //   (state) => state.areaMapReducer.clickfPropertyObject
  // );
  // const assetObj = useSelector(
  //   (state) => state.areaMapReducer.clickassetObject
  // );
  // const syncPropObj = useSelector(
  //   (state) => state.areaMapReducer.clicksyncPropertyObject
  // );

  const [resourcesFormated, setresourcesFormated] = useState([]);

  useEffect(() => {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const formatOunce = (amt) => {
      const dotLoc = amt.search(".00");
      if (dotLoc != -1) {
        let val = amt.substr(0, dotLoc + 3);
        val = numberWithCommas(val);
        return val;
      } else {
        return amt;
      }
    };
    const restext = fpropObj?.resources;
    if (restext) {
      const items = restext.split(" oz");

      const itemsTextFormated = items.map((i) => {
        const contents = i.split(" ");

        let result = "";
        switch (contents.length) {
          case 1:
            result = contents[0].length == 1 ? "" : contents[0];
            break;
          case 2:
            result = contents[0] + " " + formatOunce(contents[1]) + " oz.";
            break;
          case 3:
            result = contents[1] + " " + formatOunce(contents[2]) + " oz.";
            break;

          default:
            result = contents;
            break;
        }
        return result;
      });

      setresourcesFormated(itemsTextFormated);
      // console.log("pp1-itemsTextFormated", itemsTextFormated)
    }
  }, [fpropObj]);

  return (
    // <div
    //   className={`flex-col max-h-unit-9xl overflow-auto m-2  ${arimo.className}`}
    // >
    <Tabs aria-label="Options" color="primary" variant="solid">
      {syncPropObj && Object.keys(syncPropObj).length > 0 && (
        <Tab key="Property" title="Property">
          <div>
            <LandingMapClickPopupHeaderRow label="Property Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <LandingMapClickPopupRow
                label={"Name:"}
                value={syncPropObj.prop_name}
              />
              <LandingMapClickPopupRow
                label={"Owners:"}
                value={syncPropObj.owners}
              />
              <LandingMapClickPopupRow label={"Area:"} value={syncPropObj.area} />
              <LandingMapClickPopupRow
                label={"State/Prov:"}
                value={syncPropObj.state_prov}
              />
              <LandingMapClickPopupRow
                label={"Country:"}
                value={syncPropObj.country}
              />
            </div>
          </div>
        </Tab>
      )}
      {fpropObj && Object.keys(fpropObj).length > 0 && (
        <Tab key="fprop" title="Featured Property">
          <div>
            <LandingMapClickPopupHeaderRow label="Featured Property Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <LandingMapClickPopupRow
                label={"Sponsored owners:"}
                value={fpropObj.sponsoredowners}
                url={fpropObj.profile}
              />
              <LandingMapClickPopupRow
                label={"Property Name:"}
                value={fpropObj.prop_name}
              />
              <LandingMapClickPopupRow
                label={"Commodity:"}
                value={fpropObj.commo_ref}
              />
              <LandingMapClickPopupRow
                label={"Asset List:"}
                value={fpropObj.assets}
              />
              <LandingMapClickPopupRowMultiValue
                label={"Resources:"}
                value={resourcesFormated}
              />
              <LandingMapClickPopupRow
                label={"Map Area:"}
                value={fpropObj.map_area}
              />
              <LandingMapClickPopupRow
                label={"Map Event:"}
                value={fpropObj.sale_name}
              />
              <LandingMapClickPopupRow
                label={"Ownership:"}
                value={fpropObj.owners}
              />
              <LandingMapClickPopupRow
                label={"External Property Page:"}
                value={fpropObj.prop_exturl ? "Open Url" : ""}
                url={fpropObj.prop_exturl}
              />
            </div>
          </div>
        </Tab>
      )}
      {assetObj && Object.keys(assetObj).length > 0 && (
        <Tab key="asset" title="Asset">
          <div>
            <LandingMapClickPopupHeaderRow label="Asset Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <LandingMapClickPopupRow
                label={"Asset Name:"}
                value={assetObj.asset_name}
              />
              <LandingMapClickPopupRow
                label={"Alias:"}
                value={assetObj.assetalias}
              />
              <LandingMapClickPopupRow
                label={"Type:"}
                value={assetObj.asset_type}
              />
              <LandingMapClickPopupRow
                label={"Commodities:"}
                value={assetObj.commodities}
              />
              <LandingMapClickPopupRow label={"Region:"} value={assetObj.region} />
            </div>
          </div>
        </Tab>
      )}
      {claimObj && Object.keys(claimObj).length > 0 && (
        <Tab key="claim" title="Claim">
          <div>
            <LandingMapClickPopupHeaderRow label="Claim Info" />
            <div className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-300">
              <LandingMapClickPopupRow
                label={"Owner:"}
                value={claimObj.ownerref}
              />
              <LandingMapClickPopupRow
                label={"Claim no:"}
                value={claimObj.claimno}
              />
            </div>
          </div>
        </Tab>
      )}
    </Tabs>
    //  </div>
  );
};

export default LandingMapClickPopup