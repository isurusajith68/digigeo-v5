

import React, { useEffect, useState } from 'react'
import TreeView from '../../common-comp/treeview'
import { AreaCompanyNode } from './area-company-treenode';
import AreaPropertyNode from './area-peoperty-tree-node';
import  GeoJSON  from 'ol/format/GeoJSON';

const AreaTreeView = ({ syncPropFeatues }) => {

    const [treeViewData, setTreeViewData] = useState();

    useEffect(() => {
            // console.log("kkk",syncPropFeatues)
            buildTreeViewData(syncPropFeatues)
  }, [syncPropFeatues]);

    const addNode = (nodes, company,prop_name,location) => {
  const companyNode = nodes.find((n) => n.label == company);
        if (companyNode) {
            companyNode.children.push({
                label:prop_name,
                location,
                childrem: [],
                nodetype:"property"
            })

    return companyNode;
  } else {
    const newcompanyNode = {
      label: company,
      nodetype: "company",
    //   id: getTreeViewNodeId(),
      children: [{
                label:prop_name,
                location,
                children:[],
                nodetype:"property"
            }],
    };
    nodes.push(newcompanyNode);
 
  }
};
  const buildTreeViewData = (syncPropFeatues) => {
    console.log("syncPropFeatues", syncPropFeatues,)
    if (syncPropFeatues?.features?.length>0) {
      const features = new GeoJSON().readFeatures(syncPropFeatues)
       
      const nodes = [];
      features?.map(f => {

        let loc = [];
        const polygon = f.getGeometry();
        if (polygon) {
          const extent = polygon.getExtent();
          loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
        }


        addNode(nodes, f.get("name"), f.get("prop_name"), loc)
            
      })

      //     const treeData = [
      //   {
      //     label: "Node 1",
      //     children: [
      //       {
      //         label: "Node 1.1",
      //         children: [
      //           {
      //             label: "Node 1.1.1",
      //             children: [
      //               {
      //                 label: "Node 1.1.1.1",
      //                 children: [],
      //               },
      //             ],
      //           },
      //           {
      //             label: "Node 1.1.2",
      //             children: [],
      //           },
      //         ],
      //       },
      //       {
      //         label: "Node 1.2",
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     label: "Node 2",
      //     children: [
      //       {
      //         label: "Node 2.1",
      //         children: [],
      //       },
      //     ],
      //   },
      // ];
      setTreeViewData(nodes)
    
    } else {
      setTreeViewData([])
    }
  }
  return (
      // <TreeView data={treeViewData} />
      
       <div className="max-h-[150px]">
          {treeViewData?.map((node) => (
          
            <AreaCompanyNode key={node.label}  comapanyName={node.label}   propertyNodes={node.children} />  
      ))}
    </div>
  )
}

export default AreaTreeView