"use server"

// export const loadAreaBoundaries = async () => {
//     const url = `https://atlas.ceyinfo.cloud/matlas/view_tbl40mapareas`;
//     fetch(url, {
//         method: "GET", // *GET, POST, PUT, DELETE, etc.
//         mode: "cors", // no-cors, *cors, same-origin
//         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//         credentials: "same-origin", // include, *same-origin, omit
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then((response) => response.json())
//         .then((json) => {
//             if (json.data[0].json_build_object.features) {
//                 const features = new GeoJSON().readFeatures(
//                     json.data[0].json_build_object
//                 );

//                 areaBoundaryImgSourceRef.current.addFeatures(features);

//                 // console.log("mapCommodityTbl40Source", features );
//             } else {
//                 console.log("else area map area boundry not loading ");
//             }
//         });
    
// }

// router.get("/view_tbl40mapareas", async (req, resp, next) => {
 
//   try {
//     const clientPg1 = await poolPgLocal.connect();

//     let dataResults;
//     try {
//       const subq = `SELECT 0 as ft,*	FROM live.view_tbl40mapareas`;
//       const sql = `SELECT  json_build_object('type', 'FeatureCollection',
//           'features', json_agg(ST_AsGeoJSON(p.*)::json)) FROM ( ${subq}) AS p; `;

//       dataResults = await clientPg1.query(sql);
//       //  console.log("dataResults",dataResults.rows[0].json_build_object.features.length)
//     } finally {
//       // Make sure to release the client before any error handling,
//       // just in case the error handling itself throws an error.
//       clientPg1.release();
//     }

//     resp.send({
//       result: "SUCCESS",
//       message: "fetched data....",
//       data: dataResults.rows,
//     });
//   } catch (err) {
//     if (err) {
//       var errCode;

//       if (!err.code) {
//         errCode = "Cannont find data source";
//       } else {
//         errCode = err.code + err;
//       }
//       resp.send(
//         JSON.stringify({
//           result: "FAIL",
//           message: errCode,
//         })
//       );
//     }
//   }
// });