"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoJSON from "ol/format/GeoJSON";
import { MdInfoOutline } from "react-icons/md";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";
import {
  setlandingMapFlyToLocation,
  setlmapNavigationExtent,
  setlmapNavigationHighlightFProps,
  setnavigatedFPropId,
} from "@/store/landing-map/landing-map-slice";
import DialogComponent from "../../../utils/dialog/dialog";
import AreaMapClickPopup from "../../maps/area-map-popup/area-map-click-popup";
import { Spinner } from "@nextui-org/react";
import { boundingExtent } from 'ol/extent';


const LmapFCompanyFProperties = ({ companyid }) => {
  const [featureObjects, setfeaturesObjects] = useState([]);
  const [unNamedFeatureObjects, setunNamedFeatureObjects] = useState([]);
  const [showDlg, setshowDlg] = useState("n");
  const [fpropObj, setfpropObj] = useState();
  const [loadData, setloadData] = useState(false);
  const [dataLoaded, setdataLoaded] = useState(false);
  const blocknoRef = useRef(0);
  const pidRef = useRef(0);



  const featuredPropertyFeatures = useSelector(
    (state) => state.areaMapReducer.featuredPropertyFeatures
  );

  const dispatch = useDispatch();

  const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);

  useEffect(() => {
    console.log("ff1-companyid", companyid,)
    setunNamedFeatureObjects([]);
    setloadData((t) => !t);
  }, [companyid]);

  //set unnmaed props
  useEffect(() => {
    console.log("unNamedFeatureObjects2", unNamedFeatureObjects);
    let gj;
    const getFeaturedProperties = async () => {

      const f = async () => {
        const res = await fetch(
          `https://atlas.ceyinfo.cloud/matlas/view_hotplay_company/${companyid}`,
          { cache: "no-store" }
        );

        const d = await res.json();
        gj = {
          type: "FeatureCollection",
          crs: {
            type: "name",
            properties: {
              name: "EPSG:3857",
            },
          },
          features: d.data[0].json_build_object.features,
        };

        if (gj?.features?.length > 0) {
          console.log("ff1-gj",)
          const e = new GeoJSON().readFeatures(gj);
          let b = 0;
          const unNamedPs = []
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
                unNamedPs.push(element)
                // setunNamedFeatureObjects((p) => [...p, element]);
                // console.log("b",b)
              }
            }
          }
          setunNamedFeatureObjects(unNamedPs);


          //sort
          // e.sort((a, b) => {
          //   a.get("prop_name")?.toUpperCase() > b.get("prop_name")?.toUpperCase() ? 1 : -1
          // })
          console.log("ff1-esorted", e,)
          setdataLoaded(false)
          setfeaturesObjects(e);
        } else {
          console.log("no f props for compnayid:" + companyid);
        }





      };

      await f();

    };

    getFeaturedProperties();


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
    console.log("ff1-loc", loc,)
    dispatch(setlandingMapFlyToLocation(loc));

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

  const flytoMultipleHandler = (features) => {

    // const coords = features.map((f) => f.values_.geometry.flatCoordinates) 
    const coords = []
    for (const f of features) {
      const polygon = f.getGeometry();

      if (polygon) {
        const c = polygon.getCoordinates();

        coords.push(...c[0][0])
        // c.forEach((i)=> coords.push(i[0]))

      }




    }



    const bounds = boundingExtent(coords)

    //   console.log("bounds",bounds,)
    //  // const polygon = feature.getGeometry();
    //   let loc = [];
    //   if (bounds) {

    //     loc = getCenter(bounds);
    //     console.log("loc",loc,)
    //   }
    //flyTo
    // dispatch(setareaFlyToLocation(loc));
    dispatch(setlmapNavigationExtent(bounds));
    dispatch(setlmapNavigationHighlightFProps(features.map(f => f.get("id"))));

    //set style
    //dispatch(setnavigatedFPropId(features[0].get("id")));

    //  console.log("kkk")
    //  const selectStyle = new Style({ zIndex: 1 });
    // selectStyle.setRenderer(areaMApPropertyVectorRendererFuncV2Highlight);

    //  const e = new GeoJSON().readFeatures(featuredPropertyFeatures);

    //  const fSelected = e.find(f=> f.get("id") == feature.get("id") )
    //  console.log("fSelected",fSelected)
    //  fSelected?.setStyle(selectStyle);

  };


  const getDomElements = useMemo(() => {

    //sort
    // e.sort((a, b) => {
    //   a.get("prop_name")?.toUpperCase() > b.get("prop_name")?.toUpperCase() ? 1 : -1
    // })
    //  const unnamedProperties = featureObjects.filter(fp => !fp.get("prop_name"))   
    const namedProperties = featureObjects.filter(fp => fp.get("prop_name"))


    //console.log("ff1-namedProperties",namedProperties,)

    namedProperties.sort((a, b) => {
      return a.get("prop_name")?.toUpperCase() < b.get("prop_name")?.toUpperCase() ? -1 : 1
    })

    function myCallback({ values_ }) {
      return values_.prop_name;
    }
    const groupByPropName = Object.groupBy(namedProperties, myCallback);


    //const r = namedProperties.map((fp) => {

    const r = Object.keys(groupByPropName).map((propName) => {
      const fps = groupByPropName[propName]
      const fp = fps?.[0]
      if (fps.length == 1) {
        return (
          <div
            key={fp.get("propertyid")}
            className="hover:bg-blue-200 odd:bg-slate-200  px-2 text-black"
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
      } else {
        return (
          <div
            key={fp.get("propertyid")}
            className="hover:bg-blue-200 odd:bg-slate-200  px-2 text-black"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="flex">
              <Image src="./sync-prop.svg" width={25} height={10} alt="prop" />
              <div> {fp.get("prop_name") + "[" + fps.length + "]Polygons"}</div>
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
                  flytoMultipleHandler(fps);
                }}
              />
            </div>
          </div>)
      }
    });

    // const ee = unNamedFeatureObjects.filter((r) => !r.get("prop_name"));

    // console.log("ff1-unNamedFeatureObjects", ee);
    // console.log("ff1-2unNamedFeatureObjects2", unNamedFeatureObjects);

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
    setdataLoaded(true)
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
      <div className="font-bold dark:text-white text-black">{areaName}</div>
      <div className="flex justify-center bg-blue-600 text-white w-full font-medium">{"Featured Properties"}</div>
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
        {!dataLoaded && <Spinner size="lg" />}

        {getDomElements}
      </div>
    </div>
  );
};

export default LmapFCompanyFProperties;
