import PP from '../../assets/bg/95052996.png'
import Bg from '../../assets/bg/24400.jpg'

const Card = () => {
   return (
      <>
         <a href="#" className="flex-grow basis-[300px] max-w-[380px]">
            <div>
               <div className="relative">
                  <img src={Bg} className="w-full h-[200px] object-cover rounded-[5px]" />
                  <div className="absolute bg-[#768088] w-[90px] flex justify-center py-[5px] rounded-full top-[10px] left-[8px] text-white">
                     <p className="text-[13px]">Destination</p>
                  </div>
               </div>
               <div>
                  <p className="text-[13px] mt-2">12 January 2025 | 10 mins read</p>
                  <p className="line-clamp-2 font-medium mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus?</p>
                  <p className="line-clamp-2 text-[13px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo error rerum dolorum illum et voluptas libero. Mollitia hic illum deleniti? Lorem ipsum dolor sit amet.</p>
                  <div className="flex items-center gap-[10px] mt-2">
                     <img src={PP} className="w-[25px] rounded-full" />
                     <p className="text-[13px] font-medium">Theodore Rosevelt</p>
                  </div>
               </div>
            </div>
         </a>
      </>
   )
}

export default Card