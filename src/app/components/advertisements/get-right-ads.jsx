
import Image from 'next/image'

export default function  GetRightAds() {
    

    return(
        <div className="flex flex-col gap-8 justify-center items-center p-4">
        <Image src="/ad2r.png" width="50" height="75" alt="ad1"  />     
        <Image src="/ad3r.png" width="50" height="75" alt="ad1"  />     
        <Image src="/ad4r.png" width="50" height="75" alt="ad1"  />     
        <Image src="/ad5r.png" width="50" height="75" alt="ad1"  />     
            
        </div>
    )
}