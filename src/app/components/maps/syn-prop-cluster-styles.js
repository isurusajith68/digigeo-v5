import { Style } from "ol/style";
import { Icon, Stroke, Fill, Circle, Text } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { getBottomLeft, getCenter, getWidth } from "ol/extent";
import { getHeight } from "ol/extent";
import { toContext } from "ol/render";

export const commodityMap_tbl_syncProperty_commodity_VectorLayerStyleFunction =
  (feature, resolution) => {
   
    //console.log("feature:", feature);
    //  let spanClaim1 = document.getElementById("spanClaimsLayerVisibility");
    //  spanClaim1.textContent = "visibility";
    // const r = Math.random() * 255;
    // const g = Math.random() * 255;
    // const b = Math.random() * 255;
    //console.log("fill", feature.values_.hatch);
    const colour = "#e8b52a"; //feature.values_.colour;
    //console.log("colour", colour);
    // const fill = new Fill({
    //   color: `rgba(${r},${g},${b},1)`,
    //   opacity:1,
    // });
    // const fill = new Fill({
    //   // color: `rgba(${r},${g},${b},1)`,

    //   color:colour,
    //   opacity: 1,
    // });
    let fill = new Fill({
      // color: `rgba(${r},${g},${b},1)`,

      color: colour,
      opacity: 1,
    });

    const stroke = new Stroke({
      color: "#8B4513",
      width: 1.25,
    });
    //console.log("res22", resolution);

    // let svgScale = 0;
    // let radius = 0;
    //  const spanClaim = document.getElementById("spanClaimsLayerVisibility");
    //  spanClaim.textContent = "visibility_off";
    // if (resolution > 1000) {
    //   svgScale = 0.5;
    //   radius = 2;
    // } else if (resolution > 937.5) {
    //   svgScale = 0.562;
    //   radius = 5;
    // } else if (resolution > 875) {
    //   svgScale = 0.625;
    //   radius = 5;
    // } else if (resolution > 750) {
    //   svgScale = 0.75;
    //   radius = 5;
    // } else if (resolution > 625) {
    //   svgScale = 0.875;
    //   radius = 5;
    // } else if (resolution > 500) {
    //   svgScale = 1;
    //   radius = 5;
    // } else if (resolution > 375) {
    //   svgScale = 1.125;
    //   radius = 5;
    // } else if (resolution > 250) {
    //   svgScale = 1.25;
    //   radius = 5;
    // } else if (resolution > 125) {
    //   svgScale = 1.375;
    //   radius = 5;
    //   // const spanClaim = document.getElementById("spanClaimsLayerVisibility");
    //   // spanClaim.textContent = "visibility";
    // } else {
    //   svgScale = 1.5;
    //   radius = 10;
    // }
    let image;
    let text;

    // if (feature.values_.asset_type == assetTypesColorMappings[0].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[0].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[0].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // if (feature.values_.asset_type == assetTypesColorMappings[1].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgZone),
    //     scale: svgScale,
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[2].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[2].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[2].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[3].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[3].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[3].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[4].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgDeposit),
    //     scale: svgScale,
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[5].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[5].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[5].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[6].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[6].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[6].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[7].type) {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: assetTypesColorMappings[7].color }),
    //     stroke: new Stroke({
    //       color: assetTypesColorMappings[7].color,
    //       width: 3,
    //     }),
    //   });
    // }
    // else if (feature.values_.asset_type == assetTypesColorMappings[8].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgOpMine),
    //     scale: svgScale,
    //   });
    // } else if (feature.values_.asset_type == assetTypesColorMappings[9].type) {
    //   image = new Icon({
    //     src: "data:image/svg+xml;utf8," + encodeURIComponent(svgHisMine),
    //     scale: svgScale,
    //   });
    // }
    // else {
    //   image = new Circle({
    //     radius: 10,
    //     fill: new Fill({ color: "pink" }),
    //     stroke: new Stroke({ color: "pink", width: 3 }),
    //   });
    // }

    //set text Style

    // text = createTextStyle(feature, resolution);
    image = new Circle({
      radius: 9,
      fill: new Fill({ color: colour }),
      // stroke: new Stroke({ color: "#8B4513", width: 3 }),
    });

    let textObj;
    const size = feature.get("features").length;
    if (size == 1) {
      const propName = feature.get("features")[0].get("prop_name");
      textObj = new Text({
        //       // textAlign: align == "" ? undefined : align,
        //       // textBaseline: baseline,
        font: "bold 16px serif",
        text: propName,
        // fill: new Fill({ color: fillColor }),
        // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
        offsetX: 2,
        offsetY: -13,
        // placement: placement,
        // maxAngle: maxAngle,
        // overflow: overflow,
        // rotation: rotation,
      });
    } else {
      textObj = new Text({
        text: size.toString(),

        fill: new Fill({
          color: "#fff",
        }),
      });
    }
    //  if (resolution < 700) {
    //     propNameTextObj = new Text({
    //       // textAlign: align == "" ? undefined : align,
    //       // textBaseline: baseline,
    //       font: "bold 16px serif",
    //       text: propName,
    //       // fill: new Fill({ color: fillColor }),
    //       // stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
    //       offsetX: 2,
    //       offsetY: -10,
    //       // placement: placement,
    //       // maxAngle: maxAngle,
    //       // overflow: overflow,
    //       // rotation: rotation,
    //     });
    //   }

    // if (resolution > 500) {
    //    image = null;
    // }
    // console.log("featuresqqqq",feature)

    //console.log("size",size)
    // let style = styleCache[size];
    // if (!style) {

    const style = new Style({
      //  stroke: new Stroke({
      //    color: "#021691",
      //    width: 2,
      //  }),
      image,
      //  text: propNameTextObj,
      text: textObj,
      fill,
    });
    // styleCache[size] = style;
    // }// console.log("st", st);
    return style;
  };
