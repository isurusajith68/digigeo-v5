import React from "react";
import TreeNode from "./treenode";

const TreeView = ({ data }) => {
  return (
    <div>
      {data?.map((node) => (
        <TreeNode key={node.label} node={node} />
      ))}
    </div>
  );
};

export default TreeView;
