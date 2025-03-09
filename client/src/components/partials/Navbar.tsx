import React from 'react'
import SearchLogo from '../../assets/icons/search-interface-symbol.png'


const Navbar = () => {
   return (
      <>
         <div className='border shadow-md fixed top-0 left-0 right-0 z-10 bg-white'>
            <div className="px-2 py-3 md:container mx-auto flex justify-between items-center">
               <div className="left flex items-center gap-[20px]">
                  <div>
                     <h2 className='text-xl font-medium'>Horizones</h2>
                  </div>
                  <div className='hidden md:flex items-center gap-[20px] text-[14px]'>
                     <a href="#">Hotel</a>
                     <a href="#">Flight</a>
                     <a href="#">Food</a>
                     <a href="#">Travel</a>
                  </div>
               </div>
               <div className='hidden md:flex items-center gap-[10px] px-[10px] py-[3px] rounded-[4px] w-[350px] border'>
                  <input type="text" className='text-[15px] p-[3px] w-full outline-none bg-transparent' placeholder='Search destination...' />
                  <img src={SearchLogo} className='w-[15px]' />
               </div>
               <div className='hidden md:flex text-sm items-center gap-[20px]'>
                  <a href="#">Sign Up</a>
                  <a href="#" className='bg-black text-white px-[15px] py-[5px] rounded-[4px]'>Log In</a>
               </div>
            </div>
         </div>
      </>
   )
}

export default Navbar