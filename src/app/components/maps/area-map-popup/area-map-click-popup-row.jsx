
import  Link  from 'next/link';

const AreaMapClickPopupRow = ({label, value, url=""    }) => {
  return (
      <div className='flex '>
        <span className='w-48 p-1 block'>{label}</span>  
        {  url !="" ?  ( <Link className='w-64 p-1 underline text-blue-500' target="_blank" href={url}>{value}</Link>): (<span className='w-64 p-1'>{value}</span>)}  

      </div>
  )
}

export default AreaMapClickPopupRow