import { Server } from "socket.io" ; 
import http from "http" ; 
import express from "express" ; 

const app =  express( ) ;
const server = http.createServer ( app ) ; 

const io = new Server( server , {
    cors :{
        origin : [ "http://localhost:5173"],
    }
})
io.on("connection" , ( socket) =>{
    console.log("User connected" , socket.id); 

    socket.on("disconnected" , ()=>{
    console.log("User Disconnected" )} )
})
 
export { io , app ,server } ; 

// I have added WebSocket functionality to my project using socket.io. In the socket.js file, I initialized an Express app and created an HTTP server using http.createServer(app). I then set up a WebSocket server (io) with CORS configured to allow connections from the frontend at http://localhost:5173. The WebSocket server listens for client connections and logs when users connect or disconnect.

// On the frontend, I added two functions in my useAuthStore Zustand store: connectSocket and disconnectSocket. connectSocket establishes a WebSocket connection using socket.io-client whenever a user logs in or their session is verified. disconnectSocket cleanly terminates the connection when the user logs out or no longer needs it. This setup allows me to implement real-time features like notifications, live updates, and more.