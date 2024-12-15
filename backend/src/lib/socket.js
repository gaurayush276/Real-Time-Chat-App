import { Server } from "socket.io" ; 
import http from "http" ; 
import express from "express" ; 

const app =  express( ) ;
const server = http.createServer ( app ) ;

// used to store the online users 

const io = new Server( server , {
    cors :{
        origin : [ "http://localhost:5173"],    // Allow frontend URL to connect to backend
    }
})

export function getReceiverSocketId (userId){
    return userSocketMap[userId]
}
// this will contain all the online users 
const userSocketMap = { } ; 


io.on("connection" , ( socket) =>{
    console.log("User connected" , socket.id); 
    // console.log(" the socket data is" ,  socket.handshake.query.userId)
    const userId = socket.handshake.query.userId ;
    
    if ( userId )
        userSocketMap[userId] = socket.id ; 
    console.log( "online users ,"  ,userSocketMap) ; 
    
    // io. emit()is used  to send events to all the connected clients  , basically broadcasting it 
    // where getOnlineUser is an event 
    io.emit("getOnlineUsers" , Object.keys(userSocketMap)) ; 
  console.log(Object.keys(userSocketMap))
    socket.on("disconnect" , ()=>{
    console.log("User Disconnected" )
    delete userSocketMap[userId] ;  
    io.emit("getOnlineUsers" , Object.keys(userSocketMap)) ; 

} )
})

// Handle real-time messaging logic here
export function handleNewMessage(newMessage) {
    const receiverSocketID = getReceiverSocketId(newMessage.receiverId);
    if (receiverSocketID) {
      io.to(receiverSocketID).emit("newMessage", newMessage); // Emit to the receiver
    }
  }

 
export { io , app ,server } ; 

// I have added WebSocket functionality to my project using socket.io. In the socket.js file, I initialized an Express app and created an HTTP server using http.createServer(app). I then set up a WebSocket server (io) with CORS configured to allow connections from the frontend at http://localhost:5173. The WebSocket server listens for client connections and logs when users connect or disconnect.

// On the frontend, I added two functions in my useAuthStore Zustand store: connectSocket and disconnectSocket. connectSocket establishes a WebSocket connection using socket.io-client whenever a user logs in or their session is verified. disconnectSocket cleanly terminates the connection when the user logs out or no longer needs it. This setup allows me to implement real-time features like notifications, live updates, and more.


// You've captured the essence of it very well! Let me refine your summary slightly:
// When a user logs in on their device:

// A new socket connection is established
// The user's unique ID is mapped to the socket's unique ID in userSocketMap
// When the getOnlineUsers event is called, it passes all the keys (user IDs) from userSocketMap

// So your summary is spot on! The key points are:

// New socket creation on login
// Mapping user ID to socket ID
// Passing user IDs when requesting online users

// The userSocketMap acts like a real-time directory of active users, allowing the application to track and manage connected users efficiently.