"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setAreaCompany,
//   setAreaMiningArea,
//   setAreaZoomMode,
//   setIsAreaSideNavOpen,
// } from "../../../store/area-map/area-map-slice";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { setIsCompanySideNavOpen, setcompanyId, setcompanyName ,setcompanyStockcode,setcompanyZoomMode} from "@/store/company-map/company-map-slice";
import useDebounce from "./useDebounce";

const CompanyFilter = ({ isOpenIn, closePopup }) => {
   const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
   const [searchStockcode, setSearchStockcode] = useState('')
  const debouncedSearchStockcode = useDebounce(searchStockcode, 300)

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  // const [company, setCompany] = useState("");
  const [company, setCompany] = useState("");
  const [stockcode, setStockcode] = useState("");
  const [companyidLocal, setCompanyidLocal] = useState(0);
  const [companyList, setCompanyList] = useState([]);
  const [StockcodeList, setStockcodeList] = useState([]);
  const [historicalCompany, sethistoricalCompany] = useState(false);
  // const [areaList, setAreaList] = useState([]);
  // const [miningArea, setMiningArea] = useState("");
  // const [miningArea, setMiningArea] = useState("Timmins");

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const companyLyrs = useSelector(
    (state) => state.mapSelectorReducer.companyLyrs
  );
  const companyZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.companyZoomLevel
  );
  const companyInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.companyInitialCenter
  );
  const isCompanySideNavOpen = useSelector(
    (state) => state.companyMapReducer.isCompanySideNavOpen
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );

    const companyName = useSelector(
    (state) => state.companyMapReducer.companyName
  );
    const companyId = useSelector(
    (state) => state.companyMapReducer.companyId
  );
    const companyStockcode = useSelector(
    (state) => state.companyMapReducer.companyStockcode
  );

  useEffect(()=>{
    setCompany(companyName)

  },[companyName])

  useEffect(() => {
    setStockcode(companyStockcode)

  },[companyStockcode])

    useEffect(()=>{
     // console.log("companyIdqq",companyId)
    setCompanyidLocal(companyId)
     
      
  },[companyId])

  // const areaCompany = "Test";
  // const areaState = "Test";

  // const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  // const areaCompany = useSelector((state) => state.areaMapReducer.areaCompany);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
    },
  };




  useEffect(() => {
    setIsOpen(isOpenIn);
  }, [isOpenIn]);
  useEffect(() => {
    // dispatch(setcompanyId(companyidLocal));
    const c = companyList.find(c=> c.companyid==companyidLocal)
    if(c){
      // dispatch(setcompanyName(c.name));
      setStockcode(c.stockcode)
      setCompany(c.name)
    }

    // if(companyId==0){
    //    console.log("set stockcode to 0 an d other-",companyId )
    //   setStockcode("")
    // }
    // else{
    //    setStockcode("")
    // }
  }, [companyidLocal]);

  // useEffect(() => {
  //   setCompany(areaCompany);
  //   setMiningArea(areaName);
  // }, [areaName, areaCompany]);
  //areal load
  // useEffect(() => {
  //   const f = async () => {
  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/areas/${company}`,
  //       { cache: "force-cache" }
  //     );
  //     const d = await res.json();
  //     console.log("areas", d.data);
  //     setAreaList(d.data);
  //   };

  //   f().catch(console.error);
  // }, [company]);

  const searchAction = async () => {
    // if (company && miningArea) {
       dispatch(setcompanyId(companyidLocal));
        dispatch(setcompanyName(company));
    dispatch(setcompanyZoomMode("extent"));
    const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${companyLyrs}&z=${companyZoomLevel}&c=${companyInitialCenter}`;
    window.history.replaceState({}, "", newUrl);
    dispatch(setIsCompanySideNavOpen(true));
    dispatch(setcompanyStockcode(stockcode));
    closePopup();
    // }
  };

 

  useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/companylist/${search}`,
        {
          cache: "force-cache",
        }
      );
      const d = await res.json();
      setCompanyList(d.data);
       setStockcodeList(d.data);
    };
    if (debouncedSearch) {
      f().catch(console.error);
    }
  }, [debouncedSearch]);

   useEffect(() => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/stockcodelist/${searchStockcode}`,
        {
          cache: "no-store",
        }
      );
      const d = await res.json();
      setStockcodeList(d.data);
      setCompanyList(d.data);
       
    };
    if (debouncedSearchStockcode) {
      f().catch(console.error);
    }
  }, [debouncedSearchStockcode]);

  const resetHandler = ()=>{
     setStockcode("")
      setCompany("")
      setCompanyidLocal(0)
     dispatch(setcompanyId(0));
        dispatch(setcompanyName(""));
    dispatch(setcompanyStockcode(""));
    
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        // shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg ">
          <div className="flex items-center justify-center">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              Company Filters
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
          </div>
          <div className="flex items-center justify-center pl-8 pr-8">
            <div className="mx-auto w-full max-w-[550px] min-h-[350px]">
              <div className="-mx-3 flex flex-wrap mt-8">
                <div className="w-full px-3 flex flex-col gap-3">
                  {/* <span className="text-base font-semibold leading-none text-gray-900 mt-3 w-fit">
                   
                  </span> */}
                  {/* {companyidLocal} */}
                  <div className="flex-col gap-2">
                      <span className="block">Filter By Company Name</span>
                    <Autocomplete
                      allowsEmptyCollection={true}
                      allowsCustomValue={true}
                      label="Company Name"
                      className="max-w-xs"
                      selectedKey={companyidLocal}
                      onInputChange={(e) => {
                         setSearch(e)
                         setCompany(e);
                        
                      }}
                      onSelectionChange={(e) => {
                         setCompanyidLocal(e)
                         const c = companyList.find(c=> c.companyid==e)
                         if(c){
                          sethistoricalCompany(c.historical)
                         }else{
                          sethistoricalCompany(false)
                         }
                      
                      }}
                      defaultSelectedKey={company}
                      inputValue={company}
                    >
                      {companyList.map((companyObj) => (
                        <AutocompleteItem
                          key={companyObj.companyid}
                          value={companyObj.name} 
                        >
                          {companyObj.name}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>
                      <span className="block">Filter By Stock Code</span>
                    <Autocomplete
                      allowsEmptyCollection={true}
                      allowsCustomValue={true}
                      label="Stock Code"
                      className="max-w-xs"
                       selectedKey={companyidLocal}
                      onInputChange={(e) => {
                         setSearchStockcode(e)
                         setStockcode(e);
                      }}
                      onSelectionChange={(e) => {
                         setCompanyidLocal(e)
                      
                      }}
                      // defaultSelectedKey={stockcode}
                      inputValue={stockcode}
                    >
                      {StockcodeList.map((companyObj) => (
                        <AutocompleteItem
                          key={companyObj.companyid}
                          value={companyObj.stockcode}
                        >
                          {companyObj.stockcode}
                        </AutocompleteItem>
                      ))}
                    </Autocomplete>

                    {/* <NextTextInputField
                      label="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-lg border border-blue-500"
                      variant="bordered"bbb
                    /> */}
                    {/* <NextTextInputField
                      label="Mining Area"
                      value={miningArea}
                      onChange={(e) => setMiningArea(e.target.value)}
                      className="w-full rounded-lg border border-blue-700"
                      variant="bordered"
                    /> */}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 fixed bottom-8 border-t-2 border-gray-300">
                <div className="mt-2">
                  <Chip
                    color="default"
                    variant="light"
                    className="cursor-pointer"
                    onClick={resetHandler}
                  >
                    Reset
                  </Chip>
                </div>
                <div className="mt-2">
                  <Chip
                    color="primary"
                    className="cursor-pointer hover:bg-blue-600 custom-button-1 right-0 bg-blue-700"
                    onClick={searchAction}
                    isDisabled={!(company )}
                  >
                    Search
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default CompanyFilter;
