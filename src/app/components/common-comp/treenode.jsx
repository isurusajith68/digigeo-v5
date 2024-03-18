// import React from "react";

import Image from "next/image";
import React, { useState } from "react";

const TreeNode = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={handleToggle}>
       
         {hasChildren && <span>{isOpen ? "[-]" : "[+]"}</span>}
        
        {node.label}</div>
       
      {isOpen && hasChildren && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((child) => (
            <TreeNode key={child.label} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
