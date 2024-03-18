"use client";

import Modal from "react-modal";

import { useEffect, useState, useRef } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../../common-comp/next-text-input-fields";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image'
import Link from "next/link";
import PropertyFCompanyFProperties from "./property-fcompany-popup-properties";
import PMapDialogComponent from "./property-fcompany-dialog";
import {Spinner} from "@nextui-org/react";

const formatUrl = (url) => {
  //remove https:
  let res = url;
  let urlPrefix = "https://";
  let a = res.search("https://");
  if (a != -1) {
    res = res.substring(8);
  }

  a = res.search("http://");
  if (a != -1) {
    res = res.substring(7);
    urlPrefix = "http://";
  }
  //rem trailling /
  if (res[res.length - 1] == "/") {
    res = res.substring(0, res.length - 1);
  }
  //check for www
  //  a = res.search("www");
  //  if (a == -1) {
  //    res = "www." + res
  //  }

  return { url: res, urlPrefix };
};

const getStyledTexts = (name) => {
  //console.log("name",name,)
  const stBracketIndex = name.indexOf("(");
  if (stBracketIndex == -1) {
    const sp = document.createElement("SPAN");
    const sptext = document.createTextNode(name ?? "");
    sp.appendChild(sptext);
    return  [{ text:   "", style: {} }];
  }
  const compName = name.substr(0, stBracketIndex);
  const addends = name.substr(stBracketIndex, name.length - stBracketIndex);

  const parts = addends.split(",");
  const spans = [];
  const contents = []
  //add comp name
  const sp = document.createElement("SPAN");
  const sptext = document.createTextNode(compName);
  sp.appendChild(sptext);
  sp.style.display = "block";
  sp.style.fontSize = "1.5rem"
  spans.push(sp);
  //contents.push({text:compName,style:{} });
  let i = 0;
  let c = parts.length;
  parts.forEach((str) => {
    //find :
    const indexColon = str.indexOf(":");
    if (indexColon == -1) {
      const sp = document.createElement("SPAN");
      const sptext = document.createTextNode(str + ",");
      sp.appendChild(sptext);
      spans.push(sp);
       contents.push({text:str + ",",style:{} });
    } else {
      const stockEx = str.substr(1, indexColon - 1);
      const stockVal = str.substr(indexColon, str.length - indexColon - 1);
      //add 1
      const sp = document.createElement("SPAN");
      const sptext = document.createTextNode(stockEx);
      sp.style.marginLeft = "0.25rem";
      sp.appendChild(sptext);
      spans.push(sp);
      contents.push({text:stockEx  ,style:{marginLeft : "0.25rem"} });

      //add 2
      const sp2 = document.createElement("SPAN");
      let trailingComma = ",";
      if (i + 1 == c) {
        trailingComma = "";
      }
      const sptext2 = document.createTextNode(stockVal + trailingComma);
      sp2.style.color = "blue";
      sp2.style.fontWeight = 600;
      sp2.appendChild(sptext2);
      spans.push(sp2);
      contents.push({text:stockVal + trailingComma,style:{color: "blue",fontWeight : 600} });
    }

    i++;
  });
  return contents;
};


const PropertyFCompanyPopup = ({   }) => {
  const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [logoPath, setlogoPath] = useState("");
  const [sponsorData, setsponsorData] = useState([]);
  const [profile, setprofile] = useState([]);
   const [url, seturl] = useState("");
  const [urlPrefix, seturlPrefix] = useState("");
  const [logoLoaded, setlogoLoaded] = useState(false);

  // const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  // const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);
const popupFcompanyId = useSelector(
      (state) => state.propertiesMapReducer.popupFcompanyId
  );
  
  useEffect(()=>{
    clearForm();
    setlogoLoaded(false)
    if(popupFcompanyId){
         getCompanyDetails();
        getSponsorDetails();
    } 

  },[popupFcompanyId])


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
      overflowY: "hidden",
    },
  };

  // useEffect(() => {
  //   setIsOpen(isOpenIn);
  // }, [isOpenIn]);
  // useEffect(() => {
  // }, [sponsorData]);

  // useEffect(() => {
  //   setTitle(titleIn);
  //   getCompanyDetails();
  //   getSponsorDetails();
  // }, [titleIn]);

 const getSponsorDetails = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/sponsor_details/${popupFcompanyId}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      if (d?.data?.length > 0) {
         setTitle(d.data[0].company2)
        const sponsorData = getStyledTexts(d.data[0]?.company ?? "");
        setsponsorData(sponsorData)

        setprofile(d.data[0]?.profile ?? "")
      }else{
        setprofile("")
        setsponsorData("")
      }
    };
    f().catch(console.error);
  };
 const getCompanyDetails = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/company_details/${popupFcompanyId}`,
        { cache: "no-store" }
      );
      const d = await res.json();
       if(d?.data?.length>0){  
         let { url, urlPrefix } = formatUrl(d.data[0]?.url ?? "");
           seturl(url);
           seturlPrefix(urlPrefix);
         const logo = d.data[0]?.logo;
         setlogoLoaded(true)
         if (logo) {
           const logoext = d.data[0]?.logoext ?? "png";
           let urlimg =
             `data:image/${logoext};base64,` +
             btoa(String.fromCharCode.apply(null, new Uint8Array(logo.data)));
 
           setlogoPath(urlimg)
         }
          }else{
             setlogoPath("")
             seturl("")
         }

    };
    f().catch(console.error);
  };

  const clearForm = () => {
    
     setlogoPath("")
             seturl("")
  }

  return (
    <div>

      {/* <Modal
        isOpen={isOpen}
        onRequestClose={closePopup}
        // shouldCloseOnOverlayClick={false} [220px]
        style={customStyles}
        ariaHideApp={false}
      > */}
        <PMapDialogComponent
        clearForm={clearForm}
        // title=""
        // // onClose={closePopup}
        // //onOk={() => console.log("ok")}
        // showDialog={isOpen}
        // dialogStateCallBack={dialogStateCallBack}
        // getDialogRef={getDialogRef}
        > 
        <div className="bg-white rounded-lg min-w-[400px] flex flex-col justify-center items-center">

          {/* <div className="flex items-center justify-center   h-8 rounded-lg">

            <span className="text-base font-semibold leading-none text-gray-900 select-none flex item-center justify-center uppercase mt-3">
              
            </span>
            <AiOutlineCloseCircle
              onClick={closePopup}
              className="h-6 w-6 cursor-pointer absolute right-0 mt-2 mr-6"
            />
          </div> */}
          <div  style={{display: "flex", flexDirection:"column", justify:"center", alignItems:"center", padding:"1rem",gap: "1rem",}}>
          

             <div>
                 {!logoLoaded && <Spinner size="lg" />}
              {logoPath && ( <Image
              src={logoPath}
              width={200}
              height={100}
              alt="Logo"
              />)}</div>
            <span className="font-bold" >{title}</span>
            <span>
            {sponsorData && sponsorData.map(sd =>(  
              <span key={sd.text} style={sd.style}>{sd.text}</span>))
            } 
            </span>
             {url && (
              <Link
                href={urlPrefix + url}
                target="_blank"
                className="rounded-lg border border-solid underline hover:text-blue-600"
              >
                {url}
              </Link>
            )}
            {profile && (
              <Link
                href={profile}
                target="_blank"
                className="rounded-full border border-solid border-black p-2 underline hover:text-blue-600"
              >
                {"Read More"}
              </Link>
            )}
            
            
            <PropertyFCompanyFProperties companyid={popupFcompanyId} />

          </div>
         
        </div>
      </PMapDialogComponent>
    </div>
  );
};
export default PropertyFCompanyPopup;
