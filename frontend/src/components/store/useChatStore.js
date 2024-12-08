import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
 
export const useChatStore = create( (set , get) =>({
    messages : [ ] , 
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
          console.log(res.data) ; 
          set({ messages: res.data });
          console.log( "After the api call " ,  res.data  ) ; 
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
}))


