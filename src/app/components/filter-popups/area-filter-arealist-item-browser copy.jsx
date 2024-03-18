import {Listbox, ListboxItem, cn,ListboxSection} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useMemo, useState,useEffect } from "react";
import { Pagination, Button } from "@nextui-org/react";
 import {Chip} from "@nextui-org/react";

 
//propno, prop_name, prop_alias,area, state_prov, country, region, propertyid 
const AreaFilterAreaListItemBrowser = ({areaList, countryHandler, areaHandler}) => {
     const [currentPage, setCurrentPage] =  useState(1);
     const [groupedAreaList, setgroupedAreaList] =  useState({});
     const [filteredAreaList, setfilteredAreaList] =  useState([]);

     const [selectedKeys, setSelectedKeys] = useState(new Set([]));

    //  useEffect(()=>{
    //    setfilteredAreaList(areaList)

    //  },[areaList])
  
  
  
  
     useEffect(() => {
      setfilteredAreaList(areaList)
     },[areaList])
    useEffect(()=>{
         
      const result = Object.groupBy(filteredAreaList, ({ country }) => country);

      setgroupedAreaList(result)


    },[filteredAreaList])


     const selectedValue =  useMemo(
    () => Array.from(selectedKeys),
    [selectedKeys]
    );
  useEffect(() => {
   
    if (selectedValue.length>0){
      const a = areaList.find(a=> a.gid == selectedValue[0] )
      if(a){
        countryHandler(a.country)
        areaHandler(a.area_name)

        //console.log("poi",areaList.filter(f => f.area_name == a.area_name))
      
        setfilteredAreaList(areaList.filter(f => f.area_name == a.area_name))
   

        // console.log("qq1-country",a.country)
        // console.log("qq1-area", a.area_name);
      }
    }

    //  const p = selectedValue?.[0]?.toString()?.search(/#/)
    //  console.log("c",selectedValue?.[0]?.toString()?.substr(p+1))
    // console.log("a", selectedValue?.[0]?.toString()?.substr(0, p))
    

    //  countryHandler(selectedValue?.[0]?.toString()?.substr(p+1))
    //  areaHandler(selectedValue?.[0]?.toString()?.substr(0,p))
     
  }, [selectedKeys])

  // useEffect(() => {
 
  //   curPageHandler(currentPage)
   
  // }, [currentPage])
  


    
    return (
      <div className="flex flex-col overflow-y-scroll"   >
         <div className="overflow-y-auto max-h-[455px] min-h-[455px]">
         <ListboxWrapper>
            <Listbox variant="flat" aria-label="Listbox menu with descriptions"
            // hideEmptyContent="false"
            // disallowEmptySelection
          selectionMode="single"
          // selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              
            className="overflow-hidden  "
            // itemClasses={"w-[500px]"}
            >
              {Object.keys(groupedAreaList).map(c => {
                return (<ListboxSection key ={c} title= {c} showDivider>
                  {groupedAreaList[c].map(a => {
                    return (<ListboxItem key={a.gid } description={`${a.country}`}>
                      {`${a.area_name}`}
                    </ListboxItem> )
                  })}
                </ListboxSection>)
              })}
                   {/* result[c].map(a=>{
                  // console.log("country-", c,",area-",a.area_name)
                  
                  areaList?.map(p=> {
                    
                    return (<ListboxItem
                      key={p.area }
                      description= {`${p.country}`}
                    >
                    {`${p.area_name}`}
                    </ListboxItem>)})}
              )


                })  
                
              })
              
            }

              { 
        } */}
          </Listbox>
          
        </ListboxWrapper>
        </div>
        {/* <div className="text-white">essential place </div>
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
        
         </div>)
         
        } */}
        
    </div>
    //   <div>
    //     <div className="flex gap-4"> <span> Property id </span><span> Property Name </span> </div>
    //         {properties.map(p => (<div key={p.propertyid} className="flex gap-4"><span>{p.propertyid}</span><span>{p.prop_name}</span></div>))} 
    //     </div>
  )
}

export default AreaFilterAreaListItemBrowser