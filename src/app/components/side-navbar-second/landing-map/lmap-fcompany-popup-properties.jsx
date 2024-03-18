"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoJSON from "ol/format/GeoJSON";
import { MdInfoOutline } from "react-icons/md";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import {
  setareaFlyToLocation,
  setnavigatedFPropId,
} from "@/store/area-map/area-map-slice";
import { radioGroup } from "@nextui-org/react";
import DialogComponent from "../../../utils/dialog/dialog";
import AreaMapClickPopup from "../../maps/area-map-popup/area-map-click-popup";
import { areaMApPropertyVectorRendererFuncV2Highlight } from "../../maps/area-map-styles/area-map-styles";

const LmapFCompanyFProperties = ({ companyid }) => {
  const [featureObjects, setfeaturesObjects] = useState([]);
  const [unNamedFeatureObjects, setunNamedFeatureObjects] = useState([]);
  const [showDlg, setshowDlg] = useState("n");
  const [fpropObj, setfpropObj] = useState();
  const [loadData, setloadData] = useState(false);
  const blocknoRef = useRef(0);
  const pidRef = useRef(0);

  const featuredPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.featuredPropertyFeatures
  );

  const dispatch = useDispatch();

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);

  useEffect(() => {
    setunNamedFeatureObjects([]);
    setloadData((t) => !t);
  }, [companyid]);

  //set unnmaed props
  useEffect(() => {
    console.log("unNamedFeatureObjects2", unNamedFeatureObjects);

    if (featuredPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);
      let b = 0;
      for (let index = 0; index < e.length; index++) {
        const element = e[index];
        if (!element.get("propertyid")) {
          pidRef.current = pidRef.current - 1;
          element.set("propertyid", pidRef.current);
        }

        if (!element.get("prop_name")) {
          if (companyid == element.get("companyid")) {
            b++;
            element.set("prop_name_empty", "Block" + b);

            setunNamedFeatureObjects((p) => [...p, element]);
            // console.log("b",b)
          }
        }
      }

      setfeaturesObjects(e);
    } else {
      console.log("lop2");
    }
  }, [loadData]);

  //flyto

  const flytoHandler = (feature) => {
    const polygon = feature.getGeometry();
    let loc = [];
    if (polygon) {
      const extent = polygon.getExtent();
      loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
    }
    //flyTo
    dispatch(setareaFlyToLocation(loc));

    //set style
    dispatch(setnavigatedFPropId(feature.get("id")));

    //  console.log("kkk")
    //  const selectStyle = new Style({ zIndex: 1 });
    // selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);

    //  const e = new GeoJSON().readFeatures(featuredPropertyFeatures);

    //  const fSelected = e.find(f=> f.get("id") == feature.get("id") )
    //  console.log("fSelected",fSelected)
    //  fSelected?.setStyle(selectStyle);
  };

  const showProperties = async (
    e,
    companyid,
    propertyid,
    prop_name,
    hotplayid
  ) => {
    const getData = async (hotplayid) => {
      const url =
        "https://atlas.ceyinfo.cloud/matlas/getownersbyhotplayid/" + hotplayid;
      //load data from api - changed to return array

      let sponsors = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // let sponsors = "";
          // res.data.forEach((element) => {
          //   sponsors += element.sponsor + "/";
          // });
          return res.data;
        });

      // sponsors = sponsors.slice(0, -1);
      // console.log("sponsors", sponsors);
      return sponsors;
    };
    //console.log("hotplayid",hotplayid)
    const dd = await getData(hotplayid);
    console.log("dd", dd);
    const d = dd?.[0];

    const sponsoredowners = d?.sponsor ?? "";
    let commo_ref = d?.commo_ref ?? "";
    let assets = d?.assets ?? "";
    let resources = d?.resources ?? "";
    let map_area = d?.map_area ?? "";
    let owners = d?.owners ?? "";
    let prop_exturl = d?.prop_exturl ?? "";
    let sale_name = d?.sale_name ?? "";
    let profile = d?.profile ?? "";

    const fPropertyObject1 = {
      sponsoredowners,
      prop_name,
      commo_ref,
      assets,
      resources,
      map_area,
      owners,
      prop_exturl,
      sale_name,
      propertyid,
      profile,
    };

    setfpropObj(fPropertyObject1);
    setshowDlg("y");
  };

  const dialogStateCallBack = () => {
    setshowDlg("n");
  };

  const getDomElements = useMemo(() => {
    const r = featureObjects.map((fp) => {
      // if (!fp.get("propertyid")) {
      //   pidRef.current = pidRef.current - 1;
      // }

      if (companyid == fp.get("companyid") && fp.get("prop_name")) {
        // if (!fp.get("prop_name")) {
        //   console.log("blocknoRef1", blocknoRef.current);
        //   blocknoRef.current = blocknoRef.current + 1;
        //   console.log("blocknoRef2", blocknoRef.current);
        // }

        // console.log("companyid",companyid,"pname",fp.properties )
        return (
          <div
            key={fp.get("propertyid")}
            className="hover:bg-blue-200 odd:bg-slate-200  px-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="flex">
              <Image src="./sync-prop.svg" width={25} height={10} alt="prop" />
              <div> {fp.get("prop_name") ?? "Block" + blocknoRef.current}</div>
            </div>
            <div className="flex gap-1">
              <span className="">
                <MdInfoOutline
                  className="cursor-pointer h-4 w-4 hover:scale-125 "
                  onClick={(e) =>
                    showProperties(
                      e,
                      companyid,
                      fp.get("propertyid"),
                      fp.get("prop_name"),
                      fp.get("id")
                    )
                  }
                  //onClick={() => setIsOpenIn(true)}
                  // onClick={() => console.log("title", title)}
                />
              </span>

              <Image
                src="./navigation.svg"
                width={15}
                height={15}
                alt="prop"
                className=" cursor-pointer hover:scale-125 "
                onClick={(e) => {
                  flytoHandler(fp);
                }}
              />
            </div>
          </div>
        );
      }
    });

    const ee = unNamedFeatureObjects.filter((r) => !r.get("propertyid"));

    console.log("unNamedFeatureObjects", ee);

    const unNamedProps = unNamedFeatureObjects.map((fp) => {
      return (
        <div
          key={fp.get("propertyid")}
          className="hover:bg-blue-200 odd:bg-slate-200    px-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          onClick={(e) => {
            flytoHandler(fp);
          }}
        >
          <div className="flex">
            <Image src="./sync-prop.svg" width={25} height={10} alt="prop" />
            <div> {fp.get("prop_name_empty")}</div>
          </div>
          <div className="flex gap-1">
            <span className="">
              <MdInfoOutline
                className="cursor-pointer h-4 w-4 hover:scale-125 "
                onClick={(e) =>
                  showProperties(
                    e,
                    companyid,
                    fp.get("propertyid"),
                    fp.get("prop_name"),
                    fp.get("id")
                  )
                }
              />
            </span>
            <Image
              src="./navigation.svg"
              width={15}
              height={15}
              alt="prop"
              className=" cursor-pointer hover:scale-125"
            />
          </div>
        </div>
      );
    });

    //heading un named

    const h = (
      <div
        key={"unnamed"}
        className="   bg-blue-600  text-white cursor-pointer px-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="flex">
          {unNamedProps.length > 0 ? <div>{"Unnamed Properties"}</div> : null}
        </div>
      </div>
    );

    return [...r, h, ...unNamedProps];
  }, [featureObjects]);

  //const AreaMapClickPopup = ({ claimObj, fpropObj, assetObj, syncPropObj }) => { propertyInfo

  return (
    <div
      style={{
        height: "20rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: 700 }}>{areaName}</div>
      <div style={{ fontWeight: 600 }}>{"Featured Properties"}</div>
      <div
        className="bg-slate-100"
        style={{
          display: "flex",
          flexDirection: "column",
          justify: "center",
          alignItems: "flex-start",
          overflowY: "auto",
          maxHeight: "18.5rem",
          width: "20rem",
          margin: "1rem",
        }}
      >
        <DialogComponent
          title="Property Info"
          onClose={() => console.log("close")}
          onOk={() => console.log("ok")}
          showDialog={showDlg}
          dialogStateCallBack={dialogStateCallBack}
        >
          <AreaMapClickPopup
            claimObj={{}}
            fpropObj={fpropObj}
            assetObj={{}}
            syncPropObj={{}}
          ></AreaMapClickPopup>
        </DialogComponent>
        {getDomElements}
      </div>
    </div>
  );
};

export default LmapFCompanyFProperties;
