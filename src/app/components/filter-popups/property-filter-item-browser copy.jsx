import {Listbox, ListboxItem, cn} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useMemo, useState } from "react";
 import {Pagination, Button} from "@nextui-org/react";

 
//propno, prop_name, prop_alias,area, state_prov, country, region, propertyid
const XPropertyFilterItemBrowser = ({properties}) => {
     const [currentPage, setCurrentPage] =  useState(1);

     const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue =  useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
    );
    
    return (
      <div className="flex-col"   >
         <div className="overflow-y-auto max-h-[465px]">
         <ListboxWrapper>
            <Listbox variant="flat" aria-label="Listbox menu with descriptions"
            disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
            className="overflow-hidden width-[400px"
            itemClasses={"width-[400px]"}
            >
       {properties.map(p=> {
        const pdesc = (p.prop_name ?? "") + (p.prop_alias ? "(" +p.prop_alias +")":"")
        const adesc = (p.asset_name ?? "") + (p.assetalias ? "(" +p.assetalias +")":"")
        const stpdesc = p.state_prov ? ","+ p.state_prov:""
        const ardesc = p.area ? ","+ p.area:""
        // let alias = p.prop_alias ? "Alias:" + p.prop_alias + "," :"";
        // let assetDetails = (p.asset_name || p.assetalias) ? `/Asset:${p.asset_name}/${p.assetalias}`:""
        return (<ListboxItem
          key={p.pid+"-"+p.aid }
          description= {`${p.country} ${stpdesc}, ${ardesc}/Asset:${adesc}`}
        >
         {pdesc}
        </ListboxItem>)}) }
          </Listbox>
          
        </ListboxWrapper>
        </div>
        {properties?.length !=0 && (<div className="mt-2"><Pagination
        isCompact
        total={10}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
        /> </div>)}
        
    </div>
    //   <div>
    //     <div className="flex gap-4"> <span> Property id </span><span> Property Name </span> </div>
    //         {properties.map(p => (<div key={p.propertyid} className="flex gap-4"><span>{p.propertyid}</span><span>{p.prop_name}</span></div>))} 
    //     </div>
  )
}

export default XPropertyFilterItemBrowser