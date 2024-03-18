// components/Accordion.js
import   { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import AreaFCompanyPopup from "./company-fcompany-popup";
// import Image from "next/image";
import  Image  from 'next/image';
import GeoJSON from "ol/format/GeoJSON";
import { useDispatch, useSelector } from 'react-redux';
import { setcompanyFlyToLocation,setnavigatedFPropId } from "@/store/company-map/company-map-slice";


const FeaturedPropertyDetailDiv = ({ propertyid,title, children, onClick }) => {
  // const [isPopupOpen, setIsPopup]
  const [isOpenIn, setIsOpenIn] = useState();
   const [featureObjects, setfeaturesObjects] = useState([])  
const dispatch = useDispatch();

      const featuredPropertyFeatures = useSelector(
    (state) => state.companyMapReducer.featuredPropertyFeatures
  );

  const closePopup = () => {
    setIsOpenIn(false);
  };


  useEffect(() => {
    if (featuredPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures)
      setfeaturesObjects(e)
    }else{
      setfeaturesObjects([])
    }
       
    }, [featuredPropertyFeatures])
  
    //flyto
  
  const flytoHandler = (propertyid) => {
     console.log("propertyidww", propertyid,)
    const feature= featureObjects.find(f=> f.get("propertyid")== propertyid  )
    if(!feature){
      console.warn("Not found featured poly for propertyid:",propertyid)
      return
    }
    const polygon = feature.getGeometry();
    let loc = [];
    if (polygon) {
     const extent = polygon.getExtent();
      loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
    }  
    //flyTo
    dispatch(setcompanyFlyToLocation(loc));
      dispatch(setnavigatedFPropId(feature.get("id")));
  };

  return (
    <div>
      <div
        style={{ alignItems: "center" }}
        className="relative item-center flex pl-4 border rounded-lg border-blue-200 hover:border-blue-100 hover:border-2 focus:outline-none text-black text-sm sm:text-sm py-1 w-full transition duration-150 ease-in"
        onClick={()=>{
          flytoHandler(propertyid)
        }}
      >
        <span className="mr-2">{children}</span>
        <h3
          style={{
            margin: 0,
            marginRight: "5px",
            overflow: "hidden",
            fontSize: "0.75rem",
          }}
        >
          {title}
        </h3>
        <div className="flex absolute right-0 mr-2 gap-4">
          {/* <span onClick={toggleAccordion} className="cursor-pointer">
            {isOpen ? <FaChevronDown /> : <FaChevronLeft />}
          </span> */}
          <span className="">
              <Image
                          src="./navigation.svg"
                          width={15}
                          height={15}
                          alt="prop"
                          className=" cursor-pointer hover:scale-125 "
              />
          </span>
          {/* {isOpenIn ? (
            <AreaFCompanyPopup
              isOpenIn={isOpenIn}
              closePopup={closePopup}
              titleIn={title}
              companyid={companyid}
            />
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyDetailDiv;

//select working br

