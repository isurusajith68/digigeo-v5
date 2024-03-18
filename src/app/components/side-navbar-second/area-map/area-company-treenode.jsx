// import React from "react";

import Image from "next/image";
import React, { useState } from "react";
import AreaPropertyNode from "./area-peoperty-tree-node";

export const AreaCompanyNode = ({comapanyName, propertyNodes }) => {
  const [isOpen, setIsOpen] = useState(false);
 // const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div>
      <div onClick={handleToggle} className="flex hover:bg-slate-200 cursor-pointer" >
       
         {<span>{isOpen ? "-" : "+"}</span>}

        {comapanyName}</div>
      
       
      {isOpen  && (
        <div className="odd:bg-slate-600"  style={{ marginLeft: "20px" }}>
          { propertyNodes.map((child) => (
            <AreaPropertyNode  key={child.label} propertyName={child.label} location={child.location}   />
          ))}
        </div>
      )}
    </div>
  );
};

  
