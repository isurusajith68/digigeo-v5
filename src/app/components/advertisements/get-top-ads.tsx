import Image from 'next/image'

export default function  GetTopAds() {
    

    return(
        <div className="flex gap-8 justify-center items-center">
        <Image src="/ad1.png" width="75" height="75" alt="ad1"  />     
        <Image src="/ad2t.png" width="75" height="75" alt="ad1"  />     
        <Image src="/ad3t.png" width="75" height="75" alt="ad1"  />     
        <Image src="/ad4t.png" width="75" height="75" alt="ad1"  />     
            
        </div>
    )
}