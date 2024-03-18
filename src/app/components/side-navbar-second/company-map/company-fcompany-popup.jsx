"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
// import { FaFilter } from "react-icons/fa";
// import { AiOutlineCloseCircle } from "react-icons/ai";
import NextTextInputField from "../../common-comp/next-text-input-fields";
// import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image'
import Link from "next/link";
// import AreaFCompanyFProperties from "./company-fcompany-popup-properties";


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
    return  [{ text: "", style: {} }];
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


const CMapFCompanyAddlock = ({    titleIn,companyid }) => {
  // const dispatch = useDispatch();
  
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [logoPath, setlogoPath] = useState("");
  const [sponsorData, setsponsorData] = useState([]);
  const [profile, setprofile] = useState([]);
  const [url, seturl] = useState([]);

  // const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);
  // const areaCountry = useSelector((state) => state.areaMapReducer.areaCountry);

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

  // useEffect(() => {
  //   setIsOpen(isOpenIn);
  // }, [isOpenIn]);
  // useEffect(() => {
  // }, [sponsorData]);

  useEffect(() => {
    if (companyid != 0) {
      setTitle(titleIn);
      getCompanyDetails();
      getSponsorDetails();
    }
  }, [companyid]);

 const getSponsorDetails = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/sponsor_details/${companyid}`,
        { cache: "no-store" }
      );
      const d = await res.json();
     //console.log("d", d)
      if (d.data.length > 0) {
        const sponsorData = getStyledTexts(d.data[0]?.company ?? "");
        setsponsorData(sponsorData)

        setprofile(d.data[0]?.profile ?? "")
      } else {
         setprofile("")
         setsponsorData("")
      }
   };
   
    f().catch(console.error);
  };
 const getCompanyDetails = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/company_details/${companyid}`,
        { cache: "no-store" }
      );
        const d = await res.json();
        let { url, urlPrefix,profile } = formatUrl(d.data[0]?.url ?? "");
        seturl(url)
      const logo = d.data[0]?.logo;
      if (logo) {
        const logoext = d.data[0]?.logoext ?? "png";
        let urlimg =
          `data:image/${logoext};base64,` +
          btoa(String.fromCharCode.apply(null, new Uint8Array(logo.data)));
 
        setlogoPath(urlimg)
      }else{
         setlogoPath("")
      }

    };
    f().catch(console.error);
  };



  return (
    <div className = {companyid==0 ? "hidden":"block" } >
     
        <div className="bg-white rounded-lg   flex-col justify-center items-center">

         
          <div  style={{display: "flex", flexDirection:"column", justify:"center", alignItems:"center"}}>
             <div> {logoPath && (<Image
              src={logoPath}
              width={200}
              height={100}
              
              alt="Logo"
               
              />)} </div>
            <span>{title}</span>
            <span>
            {sponsorData && sponsorData.map(sd =>(  
              <span key={sd.text} style={sd.style}>{sd.text}</span>))
            } 
            </span>
            {/* <div className="w-64 whitespace-nowrap text-ellipsis  "></div> */}
            { profile && ( <Link href={profile} target="_blank" className="rounded-lg border border-solid" >
             
              See Profile..
            </Link>)}
            {url && (<Link href={url} target="_blank" className="rounded-lg border border-solid" >
             
              {"Read More"} 
            </Link>)}
            {/* <AreaFCompanyFProperties companyid={companyid} /> */}

          </div>
         
        </div>
      
    </div>
  );
};
export default CMapFCompanyAddlock;
