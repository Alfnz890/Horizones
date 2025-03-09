import Bg from '../../assets/bg/24400.jpg'
import FooterCopyright from './FooterCopyright'

const Footer = () => {
   return (
      <>
         <div>
            <div className="container mx-auto flex gap-2">
               {/* Kolom Kiri */}
               <div className="flex flex-col flex-grow basis-[40%] gap-2">
                  <div className='relative'>
                     <img src={Bg} className="w-full h-[230px] object-cover rounded-[5px]" />
                     <div className='absolute bottom-[15px] text-white left-4'>
                        <p className='text-xl w-[260px] font-medium'>Explore more to get your comfort zone</p>
                        <p className='text-sm'>Book your perfect stay with us</p>
                        <button className='text-[12px] bg-white text-black px-[13px] py-[5px] rounded-[4px] mt-3'>Booking Now</button>
                     </div>
                  </div>
                  <div className='relative'>
                     <img src={Bg} className="w-full h-[230px] object-cover rounded-[5px]" />
                     <div className='absolute bottom-[15px] text-white left-4'>
                        <p className='text-sm'>Article Available</p>
                        <h1 className='text-3xl'>100</h1>
                     </div>
                  </div>
               </div>

               {/* Kolom Kanan */}
               <div className="flex-grow basis-[60%]">
                  <img src={Bg} className="w-full h-full object-cover rounded-[5px]" />
               </div>
            </div>
            <FooterCopyright />
         </div>
      </>
   )
}

export default Footer