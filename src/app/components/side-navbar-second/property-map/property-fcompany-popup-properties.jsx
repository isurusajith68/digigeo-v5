import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeoJSON from "ol/format/GeoJSON";
import {
  setpropertyMapFlyToLocation, setnavigatedFPropId, setpmapNavigationExtent, setpmapNavigationHighlightFProps
 } from "../../../../store/properties-map/properties-map-slice";
import { MdInfoOutline } from "react-icons/md";
import { boundingExtent } from 'ol/extent';

// import { setpropertyMapFlyToLocation } from "@/store/properties-map/properties-map-slice";

const PropertyFCompanyFProperties = ({ companyid }) => {



  const [featureObjects, setfeaturesObjects] = useState([]);
  const [featuredPropertyFeatures, setfeaturedPropertyFeatures] = useState();
  const [mapAreas, setmapAreas] = useState([]);

  // const [unNamedFeatureObjects, setunNamedFeatureObjects] = useState([]);
  const [showDlg, setshowDlg] = useState("n");
  const [fpropObj, setfpropObj] = useState();
  const [loadData, setloadData] = useState(false);
  const blocknoRef = useRef(0)
  const pidRef = useRef(0)


  // const featuredPropertyFeatures = useSelector(
  //   (state) => state.propertiesMapReducer.featuredPropertyFeatures
  // );

  const dispatch = useDispatch();

  useEffect(() => {
    getCompanyHotPlayProperties();



  }, [])
  // const areaName = useSelector((state) => state.areaMapReducer.areaMiningArea);

  useEffect(() => {
    //setunNamedFeatureObjects([]);
    setloadData((t) => !t)

  }, [companyid])

  useEffect(() => {

    if (featuredPropertyFeatures?.features) {
      const e = new GeoJSON().readFeatures(featuredPropertyFeatures);
       
      setfeaturesObjects(e);
      //set areas

      // let areas = e.map(f => f.get("map_area"))
      // // console.log("areas",areas)
      // const setArea = new Set(areas)
      // areas = Array.from(setArea);
      // areas.sort();
      // setmapAreas(areas);

    }
  }, [featuredPropertyFeatures]);

  //flyto

  const flytoHandler = (feature) => {
    // console.log("feature", feature,)

    const polygon = feature.getGeometry();
    let loc = [];
    if (polygon) {
      const extent = polygon.getExtent();
      loc = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
    }
    //flyTo
    dispatch(setpropertyMapFlyToLocation(loc));
    dispatch(setnavigatedFPropId(feature.get("id")));
  };

  const getCompanyHotPlayProperties = async () => {
    const f = async () => {
      const res = await fetch(
        `https://atlas.ceyinfo.cloud/matlas/view_hotplay_company/${companyid}`,
        { cache: "no-store" }
      );
      const d = await res.json();
      const gj = {
        type: "FeatureCollection",
        crs: {
          type: "name",
          properties: {
            name: "EPSG:3857",
          },
        },
        features: d.data[0].json_build_object.features,
      };
     // console.log("gj",gj,)
      setfeaturedPropertyFeatures(gj)


    };
    f().catch(console.error);
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
    dispatch(setpmapNavigationExtent(bounds));
    dispatch(setpmapNavigationHighlightFProps(features.map(f => f.get("id"))));

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


  const domElements = useMemo(() => {
  //  console.log("qqqw1", featureObjects)
    if (featureObjects) {
      console.log("qqqw2", featureObjects)
      const result = []

      function myCallback({ values_ }) {
        return values_.map_area;
      }

      const resultByArea = Object.groupBy(featureObjects , myCallback);


      for (const area in resultByArea) {
        //groupby name no-name
        const namedProps = resultByArea[area].filter(p => p.get("prop_name"))
        namedProps.sort((a, b) => { return a.get("prop_name").toUpperCase() > b.get("prop_name").toUpperCase() ? 1 : -1 })
        console.log("qqqw2-namedProps", namedProps)
        const unnamedProps = resultByArea[area].filter(p => !p.get("prop_name"))
     
        console.log("qqqw2-unnamedProps", unnamedProps)
        let blockno = 1
        // for (let index = 0; index < unnamedProps.length; index++) {
        //   const element = unnamedProps[index];
        //   element.set("prop_name", "1Block-" + blockno)
        //   //unNamedPropsCopy.push({})
        //   blockno++;
        // }

        function myCallback({ values_ }) {
          return values_.prop_name;
        }
        const groupByPropName = Object.groupBy(namedProps, myCallback);


        result.push({ map_area: area, namedProps: groupByPropName, unnamedProps })
      }

      //const namedProps = featureObjects.filter(p => p.get("prop_name"))

     // console.log("result",result,)
      //namedProps.sort((a, b) => { return a.get("prop_name").toUpperCase() > b.get("prop_name").toUpperCase() ? 1 : -1 })

      const r = (
        result.map(areaObj => {

          let blockno = 0;
          return (<>
            <span key={areaObj.map_area} className="  text-xs  font-bold w-full pl-2 " > {areaObj.map_area}</span>
            { Object.keys(areaObj.namedProps).map((propName) => {

            // if (companyid == fp.get("companyid") && fp.get("prop_name") ) {
            // console.log("companyid",companyid,"pname",fp.properties )
              const fps = areaObj.namedProps[propName]
              const fp= fps?.[0]

              if (fps.length == 1) {

                return (
                  <div
                    key={fp.get("id")}
                    className="flex justify-between  w-full hover:bg-blue-200 odd:bg-slate-200  cursor-pointer px-2 text-black"

                  >
                    <div className="flex  items-center ">
                      <Image
                        src="./sync-prop.svg"
                        width={25}
                        height={10}
                        alt="prop"
                      />
                      <div className="text-xs font-medium"> {fp.get("prop_name") }</div>
                    </div>
                    <Image
                      src="./navigation.svg"
                      width={15}
                      height={10}
                      alt="prop"
                      className=" cursor-pointer hover:scale-125 "
                      onClick={(e) => {
                        flytoHandler(fp);
                      }}
                    />
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
                      <div> {fp.get("prop_name") + "[" + fps.length + " polygons]"}</div>
                    </div>
                    <div className="flex gap-1">
                      <span className="">
                        {/* <MdInfoOutline
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
                        /> */}
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
                  </div>
                )
              }
            

            }
          
            )}
            {
              <div className="flex flex-col w-full">
                <div className="text-xs  font-bold">{"Unnamed properties"}</div>
                {
                  areaObj.unnamedProps.map((fp,index) => {
                    
                    return (
                      <div
                        key={fp.get("id")}
                        className=" flex justify-between  w-full hover:bg-blue-200 odd:bg-slate-200  cursor-pointer px-2 text-black"

                      >
                        <div className="flex  items-center ">
                          <Image
                            src="./sync-prop.svg"
                            width={25}
                            height={10}
                            alt="prop"
                          />
                          <div className="text-xs"> { "Block-"+ index}</div>
                        </div>
                        <Image
                          src="./navigation.svg"
                          width={15}
                          height={10}
                          alt="prop"
                          className=" cursor-pointer hover:scale-125 "
                          onClick={(e) => {
                            flytoHandler(fp);
                          }}
                        />
                      </div>
                    )
                  })

                }
              </div>
              
            }
          </>
          )
        })

      )



      return r;
    }
  }, [featureObjects ]);

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
      <div className="bg-blue-800 text-white w-[18rem] mx-2 px-2">{"Featured Properties"}</div>
      <div
        className="bg-slate-100 mx-2"
        style={{
          display: "flex",
          flexDirection: "column",
          justify: "center",
          alignItems: "flex-start",
          maxHeight: "18.5rem",
          overflowY: "auto",
          width: "18rem",

        }}
      >
        {
          // mapAreas.map(area => )
          domElements

        }
      </div>
    </div>
  );
};

export default PropertyFCompanyFProperties;
