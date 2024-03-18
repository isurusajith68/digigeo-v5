import {Listbox, ListboxItem, cn,ListboxSection} from "@nextui-org/react";
import {ListboxWrapper} from "./ListboxWrapper";
import { useMemo, useState,useEffect,useCallback } from "react";
import { Pagination, Button } from "@nextui-org/react";
 import {Chip} from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio} from "@nextui-org/react";
import Image from "next/image";
 
//propno, prop_name, prop_alias,area, state_prov, country, region, propertyid 
const AreaFilterAreaListItemBrowser = ({areaList, countryHandler, areaHandler ,searchAction}) => {
     const [currentPage, setCurrentPage] =  useState(1);
   // const [groupedAreaList, setgroupedAreaList] =  useState({});
     const [groupedAreaList, setgroupedAreaList] =  useState([]);
     const [filteredAreaList, setfilteredAreaList] =  useState([]);
     const [startSearch, setstartSearch] =  useState(false);

    //  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
      const [selectedValue, setselectedValue] = useState(0);

  useEffect(() => {
       if (areaList?.length==0) {
         
       }
       setfilteredAreaList(areaList)

     },[areaList])
  
  
  
  
     useEffect(() => {
      setfilteredAreaList(areaList)
     },[areaList])
    useEffect(()=>{
         
      // const result = Object.groupBy(filteredAreaList, ({ country }) => country);
      // setgroupedAreaList(result)
 

      const r= filteredAreaList.sort((a,b)=> {
        
       
        return a.area_name.toLowerCase()> b.area_name.toLowerCase() ? 1:-1
      }
      )
      //console.log("ppp",r)
       setgroupedAreaList(r)
       
    },[filteredAreaList])


    //  const selectedValue =  useMemo(
    // () => Array.from(selectedKeys),
    // [selectedKeys]
    // );
  useEffect(() => {
   
    
    if (selectedValue){
      const a = areaList.find(a => a.gid == selectedValue)
    
      if(a){
        countryHandler(a.country)
        areaHandler(a.area_name)
       
        //console.log("poi",areaList.filter(f => f.area_name == a.area_name))
      
       // setfilteredAreaList(areaList.filter(f => f.area_name == a.area_name))
   

        // console.log("qq1-country",a.country)
        // console.log("qq1-area", a.area_name);
      }
       setstartSearch(true)
    }

    //  const p = selectedValue?.[0]?.toString()?.search(/#/)
    //  console.log("c",selectedValue?.[0]?.toString()?.substr(p+1))
    // console.log("a", selectedValue?.[0]?.toString()?.substr(0, p))
    
    
    //  countryHandler(selectedValue?.[0]?.toString()?.substr(p+1))
    //  areaHandler(selectedValue?.[0]?.toString()?.substr(0,p))
    
  }, [selectedValue])



  useEffect(() => {
     
      if(startSearch){
        searchAction();
      }
   
  }, [startSearch])
  
const flytoHandler = useCallback((id)=>{
   
  setselectedValue(id)
  
},[])

const getTableBodyV1 =()=>{
  return (
    <TableBody>
      { 
          groupedAreaList?.map((a) => {
            return (
              <TableRow key={a.gid}>
                <TableCell>{`${a.country}`}</TableCell>
                <TableCell>{`${a.area_name}`}</TableCell>
                <TableCell> <Image
                  src="./navigation.svg"
                  width={15}
                  height={15}
                  alt="prop"
                  className=" cursor-pointer hover:scale-125 "
                  onClick={(e) => {
                    flytoHandler(a.gid);
                  }}
                />
                </TableCell>
              </TableRow>
            );
          })
      
      }
  </TableBody>)
}

const getTableBodyV0 =()=>{
  return (
    <TableBody>
      {Object.keys(groupedAreaList).map(
        (c) =>
          groupedAreaList[c].map((a) => {
            return (
              <TableRow key={a.gid}>
                <TableCell>{`${a.area_name}`}</TableCell>
                <TableCell>{`${a.country}`}</TableCell>
                <TableCell> <Image
                  src="./navigation.svg"
                  width={15}
                  height={15}
                  alt="prop"
                  className=" cursor-pointer hover:scale-125 "
                  onClick={(e) => {
                    flytoHandler(a.gid);
                  }}
                />
                </TableCell>
              </TableRow>
            );
          })
      )}
  </TableBody>)
}
    
    return (
      <div className="flex flex-col overflow-y-scroll min-h-[40vh] max-h-[40vh]">
        {/* <div className="overflow-y-auto max-h-[455px] min-h-[455px]"> */}
        <Table
          color={"primary"}
          selectionMode="single"
          // defaultSelectedKeys={["2"]}
          aria-label=" area table"
          // onSelectionChange={(e)=>{setselectedValue(e.currentKey);}}
        >
          <TableHeader>
            <TableColumn>Country</TableColumn>
            <TableColumn>Area Name</TableColumn>
            {/* <TableColumn>State/Prov</TableColumn> */}
            <TableColumn></TableColumn>
          </TableHeader>
         {getTableBodyV1()}
        </Table>

        {/* <ListboxWrapper>
          <Listbox
            variant="flat"
            aria-label="Listbox menu with descriptions"
            // hideEmptyContent="false"
            // disallowEmptySelection
            selectionMode="single"
            // selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            className="overflow-hidden  "
            // itemClasses={"w-[500px]"}
          >
            {Object.keys(groupedAreaList).map((c) => {
              return (
                <ListboxSection key={c} title={c} showDivider>
                  {groupedAreaList[c].map((a) => {
                    return (
                      <ListboxItem key={a.gid} description={`${a.country}`}>
                        {`${a.area_name}`}
                      </ListboxItem>
                    );
                  })}
                </ListboxSection>
              );
            })}
          </Listbox>
        </ListboxWrapper> */}
        {/* </div> */}
      </div>
    );
}

export default AreaFilterAreaListItemBrowser