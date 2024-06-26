import {Listbox, ListboxItem, cn,ListboxSection} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useMemo, useState,useEffect } from "react";
import { Pagination, Button } from "@nextui-org/react";
 import {Chip} from "@nextui-org/react";

 
//propno, prop_name, prop_alias,area, state_prov, country, region, propertyid
const PropertyFilterPropertyItemBrowser = ({properties,totalResultCount,curPageHandler,itemsPerPage,selectionHandler}) => {
     const [currentPage, setCurrentPage] =  useState(1);

     const [selectedKeys, setSelectedKeys] = useState(new Set([]));

     const selectedValue =  useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys]
    );
  useEffect(() => {
    selectionHandler(selectedValue)
    //console.log("selectedValue",selectedValue,)
  }, [selectedKeys])

  useEffect(() => {
 
    curPageHandler(currentPage)
   
  }, [currentPage])
  


    
    return (
      <div className="flex-col"   >
         <div className="overflow-y-auto max-h-[455px] min-h-[455px]">
         <ListboxWrapper>
            <Listbox variant="flat" aria-label="Listbox menu with descriptions"
            // hideEmptyContent="false"
            // disallowEmptySelection
          selectionMode="multiple"
          selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
            className="overflow-hidden w-[450px] "
            // itemClasses={"w-[500px]"}
            >
              <ListboxSection title="Property Details" showDivider>
       {properties?.map(p=> {
        const pdesc = (p.prop_name ?? "") + (p.prop_alias ? "(" +p.prop_alias +")":"")
         const alist = (p.assetlist ?? "")  
       // const adesc = (p.asset_name ?? "") + (p.assetalias ? "(" +p.assetalias +")":"")
        let stpdesc = p.state_prov ?  p.state_prov:""
         let ardesc = p.area ? p.area : ""
         if(stpdesc===ardesc){
          ardesc=""
         }
        // let alias = p.prop_alias ? "Alias:" + p.prop_alias + "," :"";
        // let assetDetails = (p.asset_name || p.assetalias) ? `/Asset:${p.asset_name}/${p.assetalias}`:""
        return (<ListboxItem
          key={p.propertyid }
          description= {`Assets: ${alist}`}
        >
         {`${pdesc}/${p.country}, ${stpdesc}, ${ardesc}`}
        </ListboxItem>)})}
        </ListboxSection>
          </Listbox>
          
        </ListboxWrapper>
        </div>
        {/* <div className="text-white">essential place </div> */}
        {properties?.length != 0 && (<div className="flex-col mt-4">
          <Pagination
        isCompact
        total={Math.ceil(totalResultCount/itemsPerPage)}
        color="secondary"
        page={currentPage}
        onChange={setCurrentPage}
        />
              <div className="flex gap-2 items-center mt-2 w-full">
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  color="secondary"
                  onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
                >
                  Next
                </Button>
                    <Chip color="success">{ ((currentPage-1)*itemsPerPage)+1 + "-" + ( currentPage*itemsPerPage < totalResultCount? currentPage*itemsPerPage:totalResultCount    ) + "/" + totalResultCount}</Chip>
              </div>
        
         </div>)}
        
    </div>
    //   <div>
    //     <div className="flex gap-4"> <span> Property id </span><span> Property Name </span> </div>
    //         {properties.map(p => (<div key={p.propertyid} className="flex gap-4"><span>{p.propertyid}</span><span>{p.prop_name}</span></div>))} 
    //     </div>
  )
}

export default PropertyFilterPropertyItemBrowser