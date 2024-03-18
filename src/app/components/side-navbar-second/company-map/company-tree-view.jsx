

import React, { useEffect, useState } from 'react'
import   CompanyCountryNode  from './company-country-treenode';
import  GeoJSON  from 'ol/format/GeoJSON';

const CompanyTreeView = ({ syncPropFeatures }) => {

    const [treeViewData, setTreeViewData] = useState();

  useEffect(() => {
   
      buildTreeViewData(syncPropFeatures)
   
  }, [syncPropFeatures]);

    const addNode = (nodes, country,stateprovName,propertyName,location) => {
      const countryNode = nodes.find((n) => n.label == country);
      if (countryNode) {
          addStateProvNode(countryNode,stateprovName,propertyName,location)
      } else {
        const newcountryNode = {
          label: country,
          nodetype: "country",
          children: [],
        };
        addStateProvNode(newcountryNode,stateprovName,propertyName,location)
        nodes.push(newcountryNode);
    
      }
  };
  
    const addStateProvNode = ( countryNode,stateprovName,propertyName,location) => {
  const stateprovNode = countryNode.children.find((n) => n.label == stateprovName);
        if (stateprovNode) {
            stateprovNode.children.push({
                label:propertyName,
                location,
                childrem: [],
                nodetype:"property"
            })

    // return countryNode;
  } else {
    const newstateprovNode = {
      label: stateprovName,
      nodetype: "stateprov",
     
      children: [{
                label:propertyName,
                location,
                children:[],
                nodetype:"property"
            }],
    };
    countryNode.children.push(newstateprovNode);
 
  }
  };
  
  const buildTreeViewData = (syncPropFeatures) => {
    console.log("syncPropFeatues", syncPropFeatures,)
    if (syncPropFeatures?.features?.length>0) {
      const features = new GeoJSON().readFeatures(syncPropFeatures)
       
      const nodes = [];
      features?.map(f => {

        let loc = [];
        const polygon = f.getGeometry();
        if (polygon) {
          const extent = polygon.getExtent();
          loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
        }


        addNode(nodes, f.get("country"), f.get("state_prov"), f.get("prop_name"), loc)
            
      })

      //     const treeData = [ map_area
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
    
    }else{
       setTreeViewData([])
    }
  }
  return (
      
       <div className="max-h-[150px]">
          {treeViewData?.map((node) => (
          
            <CompanyCountryNode key={node.label}  countryName={node.label}   stateProvNodes={node.children} />  
      ))}
    </div>
  )
}

export default CompanyTreeView