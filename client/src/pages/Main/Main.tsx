import axios from "axios"
import { useEffect } from "react"

const API_BASE_URL = import.meta.env.VITE_URL_API

const Main = () => {

   useEffect(() => {
      const user = localStorage.getItem('user');
      console.log(user);
   }, [])

   return (
      <>
         <div>Main</div>
      </>
   )
}

export default Main