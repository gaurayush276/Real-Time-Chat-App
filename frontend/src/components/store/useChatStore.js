import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
 
export const useChatStore = create( (set) =>({
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
          console.log( "After the api call " ,  users ) ; 
        } catch (error) { 
          toast.error(error.response.data.message);
        } finally {
          set({ isUsersLoading: false });
        }

      },
      getMessages: async (id) => {
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(`/messages/${id}`);
          console.log("Api call done") ; 
          set({ message: res.data });
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },
        
      setSelectedUser : ( selectedUser )=> set( { selectedUser }), 
}))


