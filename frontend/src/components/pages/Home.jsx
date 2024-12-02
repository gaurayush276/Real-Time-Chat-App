import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStroe.js'
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar.jsx'; 
import NoChatSelected from '../NoChatSelected.jsx'; 
import ChatContainer from '../ChatContainer.jsx'; 
import { Loader } from 'lucide-react';
import Sidebar from '../Sidebar.jsx';
import { useChatStore } from '../store/useChatStore.js'
const Home = () => {
   
    const { authUser } = useAuthStore() ; 
    const { selectedUser } = useChatStore() ; 
  return (
    <div className="h-screen bg-base-200">
    { !authUser && ( <Navigate to={'/signup'}/>)}  
    <Navbar/>
    <div className="flex items-center justify-center pt-20 px-4">
    {/* bg-base-100 is just to reduce or increase the shade intensity */}
      <div className=" bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
        <div className="flex h-full rounded-lg overflow-hidden ">
          <Sidebar/>

          {!selectedUser ? <NoChatSelected/> : <ChatContainer />}
        </div>
      </div>
    </div>
  </div>

    
  )
}

export default Home
