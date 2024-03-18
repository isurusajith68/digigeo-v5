// import React from "react";

import Image from "next/image";
import   { useState,useEffect } from "react";
import CompanyPropertyNode from "./company-property-tree-node";

  const CompanyStateProvNode = ({stateProvName, propertyNodes }) => {
  const [isOpen, setIsOpen] = useState(false);
 // const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

 useEffect(() => {
   console.log("propnodes",propertyNodes)
 
   
 }, [propertyNodes])
 

  return (
    <div>
      <div onClick={handleToggle} className="flex hover:bg-slate-200 cursor-pointer" >
       
         {<span>{isOpen ? "-" : "+"}</span>}

        {stateProvName}</div>
      
       
      {isOpen  && (
        <div className="odd:bg-slate-600"  style={{ marginLeft: "20px" }}>
          { propertyNodes?.map((child) => (
            <CompanyPropertyNode  key={child.label} propertyName={child.label} location={child.location}   />
          ))}
        </div>
      )}
    </div>
  );
};

  
export default CompanyStateProvNode