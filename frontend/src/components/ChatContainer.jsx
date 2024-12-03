import React, { useEffect } from 'react'
import { useChatStore } from './store/useChatStore';
import ChatHeader from './chatHeader.jsx';
import MessageSkeleton from './MessageSkeleton.jsx';
import MessageInput from './MessageInput.jsx';

const ChatContainer = () => {
  const { getMessages , getUsers , messages , isMessagesLoading , selectedUser} = useChatStore() ; 

  useEffect (() =>{
    // { Note :we are doing it like  selectedUser._id beacause in the database the use id is saved as user._id , just beacause we are setting the perticular user as selectedUser }

    // todo { i have to give another dependency i.e : getMessages }
      getMessages( selectedUser._id) ; 
      // getUsers() ; 
  } , [ selectedUser._id ]) ; 
 
  // // if the messages has not been loaded  yet
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='w-full h-full'> 

      <ChatHeader />
    <div className='text-5xl w-full flex justify-center items-center'>
      <h1 className="text-5xl text-zinc-400"> Messages </h1> 
    </div>
    <MessageInput />

    </div>
  )
}

export default ChatContainer
