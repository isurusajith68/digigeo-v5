"use client"
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from "react-redux";
import { setpopupFcompanyId } from "../../../../store/area-map/area-map-slice";
// type Props = {
//     title: string,
//     onClose: () => void,
//     onOk: () => void,
//     children: React.ReactNode,
// }

export default function LMapDialogComponent({
  clearForm,
  children,
   
}) {


  const dialogRef = useRef(null);
  const dispatch = useDispatch();

      const popupFcompanyId = useSelector(
      (state) => state.areaMapReducer.popupFcompanyId
    );

    useEffect(()=>{
      
       if(popupFcompanyId && !dialogRef.current.open){
         dialogRef.current?.show();
       }

    },[popupFcompanyId])
  
  // useEffect(()=>{
  //   console.log("goh",dialogRef)
  //   getDialogRef(dialogRef?.current)

  // },[dialogRef])
  //  const searchParams = useSearchParams()
 
  //   const showDialog = searchParams.get('showDialog')

  // useEffect(() => {
    
  //    getDialogRef(dialogRef?.current);
  //   // console.log("lokr")
  //   if (showDialog === "y") {
  //     dialogRef.current?.show();
  //   } else {
  //     dialogRef.current?.close();
  //   }
  // }, [showDialog]);

    const closeDialog = () => {
       clearForm()
    dispatch(setpopupFcompanyId(0))
        
        
  };

    const clickOk = () => {
      
        // onOk();
        //  dialogStateCallBack();
    // closeDialog();
  };

  const dialog =   (
      <dialog
        ref={dialogRef}
        className="fixed inset-0     rounded-xl backdrop:bg-gray-800/50 z-[60]"
      >
        <div className="w-[400px] max-w-full  flex flex-col overflow-hidden">
          <div className="flex flex-row-reverse justify-between    ">
            {/* <h1 className="text-2xl">{title}</h1> */}
            <AiOutlineCloseCircle
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-10 h-10 font-bold  "
            />
            {/* <button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
            >
              x
            </button> */}
          </div>
          <div className="overflow-y-hidden max-h-full  ">
            <div>
              {children}
              <div className="flex flex-row justify-end mt-2">
                {/* <button
                                onClick={clickOk}
                                className="bg-green-500 py-1 px-2 rounded border-none"
                            >
                                OK
                            </button> */}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    )  ;

  return dialog;
}