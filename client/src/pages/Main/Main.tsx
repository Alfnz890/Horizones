import axios from "axios"
import { useEffect, useState } from "react"
import Bg from '../../assets/bg/24400.jpg'
import Navbar from "../../components/partials/Navbar"
import PP from '../../assets/bg/95052996.png'
import Card from "../../components/partials/Card"
import { Pagination } from "flowbite-react"
import Footer from "../../components/partials/Footer"

const API_BASE_URL = import.meta.env.VITE_URL_API

const Main = () => {

   const [selected, setSelected] = useState('All');
   const [currentPage, setCurrentPage] = useState(1);

   const onPageChange = (page: number) => setCurrentPage(page);

   return (
      <>
         <Navbar />
         <div className="md:container mx-auto">
            <div className="hero relative mt-[75px]">
               <img src={Bg} className="w-full h-[500px] object-cover rounded-[8px]" />
               <div className="flex flex-col md:flex-row justify-between items-center absolute bottom-[50px] text-white px-[25px] w-full">
                  <div>
                     <div className="border border-white w-[105px] flex justify-center py-[5px] rounded-full">
                        <p className="text-[14px]">Destination</p>
                     </div>
                     <h1 className="text-[20px] md:text-2xl font-medium my-2">Exploring the Wornders of Hiking</h1>
                     <p className="text-sm line-clamp-2 md:text-sm max-w-[490px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, assumenda! Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
                  </div>
                  <div className="hidden md:flex flex-col items-end justify-end gap-2">
                     <div className="flex items-center gap-[10px]">
                        <div className="border rounded-full p-[5px]">
                           <img src={PP} className="w-[30px] object-cover rounded-full" />
                        </div>
                        <p className="text-sm">Theodore Reginald</p>
                     </div>
                     <div>
                        <p className="text-sm">25 January 2025 | 10 min read</p>
                     </div>
                  </div>
               </div>
            </div>
            <div>
               <div className="mt-5">
                  <h1 className="text-3xl font-medium">Blog</h1>
                  <p className="text-[16px]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, praesentium?</p>
                  <div className="flex items-center text-[16px] mt-2">
                     {/* {categories.map((category) => (
                        <button
                           key={category}
                           onClick={() => setSelected(category)}
                           className={`px-[8px] py-[3px] ${selected === category ? "bg-slate-300" : "bg-transparent"
                              }`}
                        >
                           {category}
                        </button>
                     ))} */}
                     <button className="bg-slate-300 px-[8px] py-[3px]">All</button>
                     <button className="px-[8px] py-[3px]">Destination</button>
                     <button className="px-[8px] py-[3px]">Culinary</button>
                     <button className="px-[8px] py-[3px]">Fashion</button>
                  </div>
               </div>
               <div className="flex flex-wrap my-6 gap-4">
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
                  <Card />
               </div>
            </div>
            <div className="flex overflow-x-auto sm:justify-center my-10">
               <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
            </div>
            <Footer />
         </div>
      </>
   )
}

export default Main