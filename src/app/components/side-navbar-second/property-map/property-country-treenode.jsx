// import React from "react";

import Image from "next/image";
import React, { useState } from "react";
import PropertyStateProvNode from "./property-stateprov-treenode";

    const PropertyCountryNode = ({countryName, stateProvNodes }) => {
  const [isOpen, setIsOpen] = useState(false);
 // const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div>
      <div onClick={handleToggle} className="flex hover:bg-slate-200 cursor-pointer" >
       
         {<span>{isOpen ? "-" : "+"}</span>}

        {countryName}</div>
      
       
      {isOpen  && (
        <div className="odd:bg-slate-600"  style={{ marginLeft: "20px" }}>
          {stateProvNodes.map((child) => {
            // console.log("child", child)
            return (  < PropertyStateProvNode  key = { child.label } stateProvName = { child.label } propertyNodes = { child.children } />)
    })}
        </div>
      )}
    </div>
  );
};

  
export default PropertyCountryNode