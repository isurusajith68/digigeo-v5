"use client";

import Modal from "react-modal";

import { useEffect, useState, useRef } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
import {
  setAreaCountry,
  setAreaMiningArea,
  setAreaZoomMode,
  setIsAreaSideNavOpen,
} from "../../../store/area-map/area-map-slice";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import AreaFilterAreaListItemBrowser from "./area-filter-arealist-item-browser";

const AreaFilter = ({ isOpenIn, closePopup }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  // const [country, setCountry] = useState("");
  const [country, setCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  // const [areaList, setAreaList] = useState([]);
  const [allAreaList, setallAreaList] = useState([]);
  const [filteredAreaList, setfilteredAreaList] = useState([]);
  const [miningArea, setMiningArea] = useState("");
  const [areaInfo, setareaInfo] = useState("Type an Area Name...");
  const [propertyList, setpropertyList] = useState([]);
  const [totalResultCount, settotalResultCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [searchQuery, setsearchQuery] = useState("");

  const selectedMap = useSelector(
    (state) => state.mapSelectorReducer.selectedMap
  );
  const areaLyrs = useSelector((state) => state.mapSelectorReducer.areaLyrs);
  const areaZoomLevel = useSelector(
    (state) => state.mapSelectorReducer.areaZoomLevel
  );
  const areaInitialCenter = useSelector(
    (state) => state.mapSelectorReducer.areaInitialCenter
  );
  const isSideNavOpen = useSelector(
    (state) => state.mapSelectorReducer.isSideNavOpen
  );
  // const areaCountry = "Test";
  // const areaState = "Test";

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent",
      border: "none",
      width:"40vw",
      
    },
  };

  //  useEffect(() => {

  //   const fproperty = async () => {

  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/propertylistuniversal/${searchQuery}/${itemsPerPage}/${(currentPage - 1) * itemsPerPage}`,
  //       {
  //         cache: "no-store",
  //       }
  //     );
  //     const d = await res.json();

  //     setpropertyList(d.data);
  //     settotalResultCount(d.count)

  //   }
  //   console.log("searchQuery",searchQuery)

  //   if (searchQuery) {

  //       fproperty().catch(console.error);

  //   }
  //   else {
  //     setpropertyList([]);
  //   }

  // }, [searchQuery,currentPage])

  //change on redux messages
  useEffect(() => {
    setMiningArea(areaName);
  }, [areaName]);

  useEffect(() => {
    setCountry(areaCountry);
  }, [areaCountry]);   

  const getSearchQuery = (country = "", areaName = "") => {
    let s = "";
    if (country == "") {
      s = "";
      return s;
    } else if (areaName == "") {
      s = "country='" + country + "'";
      return s;
    } else {
      s = "country='" + country + "' and area='" + areaName + "'";

      return s;
    }
  };

  useEffect(() => {
    setIsOpen(isOpenIn);
  }, [isOpenIn]);

  //on change miningArea
  useEffect(() => {
    const s = getSearchQuery(country, miningArea);
    setsearchQuery(s);

    //clear popup area list
    // if (miningArea) {
    //   console.log("opo")
    //   setfilteredAreaList(filteredAreaList.map(f => f.area_name == miningArea))
    // }
  }, [miningArea]);

  //on country change areal load
  useEffect(() => {
    if (!country) {
      // setAreaList([]);
      setpropertyList([]);
      setareaInfo("Type an Area name...");
      // console.log("alist",allAreaList)
      setfilteredAreaList(allAreaList);
      return;
    }

    //load areas
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/areas/${country}`,
        { cache: "force-cache" }
      );
      const d = await res.json();
      // setMiningArea(areaName);
      // setAreaList(d.data);
      if (d.data.length > 0) {
        setareaInfo(`Select an Area-(${d.data.length} areas)`);
      } else {
        setareaInfo(`No areas for ${country}`);
      }
    };

    f().catch(console.error);

    //load results
    //   const fproperty = async () => {

    //   const res = await fetch(
    //     `https://atlas.ceyinfo.cloud/matlas/propertylistuniversal/country='${country}'/${itemsPerPage}/${(currentPage - 1) * itemsPerPage}`,
    //     {
    //       cache: "no-store",
    //     }
    //   );
    //   const d = await res.json();

    //   setpropertyList(d.data);
    //   settotalResultCount(d.count)

    // }
    // fproperty().catch(console.error);

    const s = getSearchQuery(country, areaName);
    setsearchQuery(s);

    //filterAllrea by country

    // if(country){
    //   const fa =    allAreaList.filter(a=> a.country==country)
    //   setfilteredAreaList(fa)

    // }else{
    //   setfilteredAreaList(allAreaList)
    //   setAreaList([])
    //   setareaInfo("Type An Area Name...")
    // }
  }, [country]);

  // useEffect(() => {

  //   const fproperty = async () => {

  //     const res = await fetch(
  //       `https://atlas.ceyinfo.cloud/matlas/propertylistuniversal/country='${country}'/${itemsPerPage}/${(currentPage - 1) * itemsPerPage}`,
  //       {
  //         cache: "no-store",
  //       }
  //     );
  //     const d = await res.json();

  //     setpropertyList(d.data);
  //     settotalResultCount(d.count)

  //   }
  //   fproperty().catch(console.error);

  // }, [miningArea])

  const searchAction = async () => {
     
    if (country && miningArea) {
      dispatch(setAreaZoomMode("extent"));
      const newUrl = `${window.location.pathname}?t=${selectedMap}&sn=${isSideNavOpen}&sn2=true&lyrs=${areaLyrs}&z=${areaZoomLevel}&c=${areaInitialCenter}&co=${country}&ma=${miningArea}`;
      window.history.replaceState({}, "", newUrl);
      dispatch(setIsAreaSideNavOpen(true));
      // dispatch(setAreaCountry("Canada"));
      // dispatch(setAreaMiningArea("Timmins"));
      dispatch(setAreaCountry(country));
      dispatch(setAreaMiningArea(miningArea));
      closePopup();
    }
    // dispatch(setAreaState("Canada"));
  };
  //const animals = [{value:"qqq", label:"q1"},{value:"qqq2", label:"q2"},{value:"qqq3", label:"q3"}]
  //init use effect
  useEffect(() => {
    // const f = async () => {
    //   const res = await fetch(
    //     `https://atlas.ceyinfo.cloud/matlas/countrylist`,
    //     {
    //       cache: "force-cache",
    //     }
    //   );
    //   const d = await res.json();
    //   setCountryList(d.data);
    // };

    // f().catch(console.error);

    //load area list
    const fareas = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/allarealist`,
        {
          cache: "force-cache",
        }
      );
      const d = await res.json();

      setallAreaList(d.data);
    };

    fareas().catch(console.error);
  }, []);

  //allAreaList
  useEffect(() => {
    const result = Object.groupBy(allAreaList, ({ country }) => country);
    const cs = Object.keys(result);

    setCountryList(
      cs.map((c) => {
        return { country: c };
      })
    );
    if (areaName) {
      setfilteredAreaList(
        allAreaList.filter(
          (a) => a.area_name == areaName && a.country == areaCountry
        )
      );
    } else {
      setfilteredAreaList(allAreaList);
    }
  }, [allAreaList]);

  const resetHandler = () => {
    setCountry("");
    setMiningArea("");
    setareaInfo("Type An Area Name...");
    // setAreaList([]);
    setfilteredAreaList([...allAreaList]);
    dispatch(setAreaCountry(""));
    dispatch(setAreaMiningArea(""));
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        // shouldCloseOnOverlayClick={false}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="flex-col gap-2  bg-white rounded-lg overflow-y-hidden min-h-[60vh] px-4 pb-4">
          <div className="flex items-center justify-center mb-4">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
               Filters
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
          </div>
           <div className="flex items-center justify-start mb-4">
            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
               Exploration Areas
            </span>
           
          </div>
          {/* <div className="flex items-center justify-center pl-8   overflow-x-hidden"> */}
          {/* <div className="mx-auto w-full max-w-[950px] min-w-[400px] min-h-[350px]"> */}
          {/* <div className="-mx-3 flex flex-wrap"> */}
          {/* <div className="w-full flex  first-line: gap-3 space-between "> */}
          {/* <span className="text-base font-semibold leading-none text-gray-900 mt-3 border-b-2 border-gray-900 w-fit">
                    Exploration Areas
                  </span> */}
          {/* <div className="flex-col gap-2   w-[16vw]"> */}
          <div className="flex    justify-around  ">
            <div>
              <span className="block">Country</span>
              <Autocomplete
                variant="bordered"
                allowsEmptyCollection={true}
                allowsCustomValue={true}
                // label="Select a country"
                className="max-w-xs"
                onInputChange={(e) => {
                  if (e) {
                    const fa = allAreaList.filter((a) => a.country == e);
                    setfilteredAreaList(fa);
                  } else {
                    setfilteredAreaList([...allAreaList]);
                    // setAreaList([]);
                    setareaInfo("Type An Area Name...");
                    setMiningArea("");
                  }
                  setCountry(e);

                  // if(!e){

                  //    setMiningArea("")
                  // }
                }}
                inputValue={country}
                defaultSelectedKey={country}
              >
                {countryList.map((countryObj) => (
                  <AutocompleteItem
                    key={countryObj.country}
                    value={countryObj.country}
                  >
                    {countryObj.country}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            </div>
            <div>
              <span className="block">Mining Area</span>
              <Autocomplete
                variant="bordered"
                inputValue={miningArea}
                allowsEmptyCollection={true}
                allowsCustomValue
                // label={areaInfo}
                className="max-w-xs"
                defaultSelectedKey={miningArea}
                onInputChange={(e) => {
                  const r = new RegExp(e, "i");
                  const fa = allAreaList.filter((a) => {
                    if (country) {
                      return (
                        a.area_name.search(r) != -1 && a.country == country
                      );
                    } else {
                      return a.area_name.search(r) != -1;
                    }
                  });
                  setfilteredAreaList(fa);
                  setMiningArea(e);
                }}
              >
                {/* {areaList.map((areaObj) => (
                          <AutocompleteItem
                            key={areaObj.area_name}
                            value={areaObj.area_name}
                          >
                            {areaObj.area_name}
                          </AutocompleteItem>
                        ))} */}
              </Autocomplete>
            </div>
          </div>
          <AreaFilterAreaListItemBrowser
            areaList={filteredAreaList}
            countryHandler={setCountry}
            areaHandler={setMiningArea}
            searchAction={searchAction}
          />
          <section className="flex items-center justify-between mt-3 bottom-8 border-t-2 border-gray-300 w-full">
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
            {/* <div className="mt-2">
              <Chip
                isDisabled={!(country && miningArea)}
                color="primary"
                className="cursor-pointer hover:bg-blue-600 custom-button-1 bg-blue-700"
                onClick={searchAction}
              >
                Search
              </Chip>
            </div> */}
          </section>

          {/* </div> */}
          {/* <div className="w-[16vw]"> */}

          {/* <div className="flex-col gap-32"> */}
          {/* // <div className="border-solid border   w-full bg-white rounded-lg m-2  "> */}

          {/* </div> */}
          {/* </div> */}

          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
      </Modal>
    </div>
  );
};
export default AreaFilter;
