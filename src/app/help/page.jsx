
"use client"



// import fs from "fs";
// import parse from 'node-html-parser';
import { useEffect, useRef } from "react";
 
 

// export async function getHelpHtml() {
//     const htmlContent = fs.readFileSync(`./public/help/InvestorMappingHelpFile.docx.html`, 'utf-8');

//     return {
//         props: {
//             renderedHTML: htmlContent,
//         },
//     };
// }

export default function Page() {
    
    const ifr = useRef(null)

    useEffect(() => {
        if (ifr) {
            ifr.current.width = ifr.current.contentWindow.document.body.scrollWidth;
            ifr.current.height = ifr.current.contentWindow.document.body.scrollHeight;
        }
    }, [ifr])
    
    // const htmlContent = fs.readFileSync(`./public/help/InvestorMappingHelpFile.docx.html`, 'utf-8');
    // const parsedHTML = parse(htmlContent);

    // console.log("parsedHTML",parsedHTML,)
   // console.log("htmlContent", htmlContent,)
     

    return (
        <div className="overflow-y-scroll h-[100vh]">
            <iframe ref={ifr} src="/help/InvestorMappingHelpFile.docx.html" frameBorder="0" width="100%" height="100%"  allowFullScreen  ></iframe>
            {/* <div dangerouslySetInnerHTML={{ __html: parsedHTML.querySelector('body').innerHTML }} /> */}
        </div>
    );
}