import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useAuthStore } from './store/useAuthStroe'
import {Loader} from "lucide-react" ; 
const Body = () => {
   const { authUser  , checkAuth} = useAuthStore( ) ; 
   useEffect (()=>{
      checkAuth() ; 
   } , [checkAuth]) ;
   if ( !authUser)
   {
    return (
       <div className='h-screen flex justify-center  items-center'>
        <Loader className='w-9 h-9 animate-spin '> </Loader> </div>
    )
   }
   console.log({authUser}) ; 
  return (
    <div>
      <Navbar/>
    </div>
  )
}

export default Body
