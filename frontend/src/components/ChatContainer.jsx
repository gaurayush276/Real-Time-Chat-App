import React, { useEffect } from 'react'
import { useChatStore } from './store/useChatStore';
import ChatHeader from './chatHeader.jsx';
import MessageSkeleton from './MessageSkeleton.jsx';
import MessageInput from './MessageInput.jsx';
import { USER_PIC } from './constants/themes.js';
import { useAuthStore } from './store/useAuthStroe.js';
import { formatMessageTime } from '../../../backend/src/lib/time.js';

// const date = new Date() ; 
// console.log(date.toLocaleDateString())
// console.log(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

// It takes two arguments: cumstomized time 
// locales (optional): Specifies the locale (e.g., en-US for US English). In this example, it's omitted ([]), meaning it defaults to the system's locale.
// options: Defines how the time is displayed.


const ChatContainer = () => {
  const { getMessages , getUsers , messages , isMessagesLoading , selectedUser} = useChatStore() ; 
  const { authUser } = useAuthStore() ; 


  useEffect (() =>{
    // { Note :we are doing it like  selectedUser._id beacause in the database the use id is saved as user._id , just beacause we are setting the perticular user as selectedUser }

    // todo { i have to give another dependency i.e : getMessages }
      getMessages( selectedUser._id ) ; 
      // console.log( "selectedUser id = " , selectedUser._id )
      // console.log( "current user of app id = " , authUser._id )
      // console.log( "the get Messages called") ; 
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
   {/* {  messages } */}
   <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} `}
            // ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || USER_PIC
                      : selectedUser.profilePic || USER_PIC
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            
            <div className={`chat-bubble flex flex-col ${message.senderId === authUser._id ? "bg-primary text-neutral" : "bg-secondary text-primary"} `}>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p >{message.text}</p>}
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            
          </div>
          
        ))}
      </div>
      

    <MessageInput />

    </div>
  )
}

export default ChatContainer
