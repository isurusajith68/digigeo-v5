// import React from "react";

import { setareaFlyToLocation } from "@/store/area-map/area-map-slice";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AreaPropertyNode = ({ propertyName,location }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const hasChildren = node.children && node.children.length > 0;

  // const handleToggle = () => {
  //   setIsOpen(!isOpen);
  // 
   const dispatch = useDispatch()

    const handlePropertyNodeClick = (location) => {
    dispatch(setareaFlyToLocation(location));
  }


  return (
    <div>
      <div
        className="flex justify-between hover:bg-slate-200 cursor-pointer"
        style={{ marginLeft: "20px" }}
        onClick={() => {
          handlePropertyNodeClick(location);
        }}
      >
        <div className="flex">
          <Image src="./sync-prop.svg" width={25} height={10} alt="prop" />
          {propertyName}
        </div>
        <Image src="./navigation.svg" width={15} height={15} alt="prop" 
        className=" cursor-pointer hover:scale-125 "
        />
      </div>

      {/* {isOpen && hasChildren && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode key={child.label} node={child} />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default AreaPropertyNode;
