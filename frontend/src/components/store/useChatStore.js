import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import  { useAuthStore  } from './useAuthStroe' ; 
export const useChatStore = create( (set , get) =>({
    messages : [ ] , 
    searchedUser :[ ] ,
    users : [] , 
    selectedUser : null , 
    isUsersLoading : false , 
    isMessagesLoading : false , 

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const res = await axiosInstance.get("/messages/users");
          
          set({ users: res.data });
         
        } catch (error) { 
          // toast.error(error.response.data.message);
        } finally {
          set({ isUsersLoading: false });
        }

      },
      getMessages: async (id) => {
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(`/messages/${id}`);
          // console.log(res.data) ; 
          set({ messages: res.data });
          // console.log( "After the api call " ,  res.data  ) ; 
        } catch (error) {
          // toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessage: async( messageData)=>{
     const { selectedUser ,  messages} = get() ;
    //  console.log( selectedUser._id) ; 
     console.log( " the messeage in store " , messageData) ; 
     try {
      const res = await axiosInstance.post (`/messages/send/${selectedUser._id}` , messageData) ; 
      set ( { messages : [...messages , res.data ]}) ; 
     } 
     catch (error) {
      // toast.error(error.response.data.message);
     }
      } , 
        
      setSelectedUser : ( selectedUser )=> set( { selectedUser }), 
      
      setSearchedUserList: async(data)=>{
            const response = await axiosInstance.post(`/messages/find` , data )  ; 
            set({ searchedUser : response.data })  ; 
            // set({ users : response.data })  ; 
            console.log("okkkkkkkkkk")
            // console.log({ searchedUser : response.data })
            // console.log({ users : response.data })
       }
       ,

       subscribeToMessages :()=>{
        const { selectedUser} = get() ; 
        if ( !selectedUser)
        return ;


     //  ^ The line const socket = useAuthStore.getState().socket; is retrieving the existing socket instance that was already initialized and stored in the useAuthStore. It is not creating a new WebSocket connection.

    // ^ So, it's simply accessing the socket object that is being managed by the useAuthStore. This allows useChatStore to reuse the same WebSocket connection for listening to or sending real-time events like "newMessage". 

       const socket = useAuthStore.getState().socket ;
       socket.on("newMessage" , (newMessage)=>{
        set({ messages : [ ...get().messages , newMessage] ,

        })
       })
       } ,
       unsubscribeFromMessages :()=>{
        const socket = useAuthStore.getState().socket ;
         socket.off("newMessage")  ; 
       }
}))


