import {create} from "zustand" ; 
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
 import { F_BASE_URL } from "../constants/themes.js";
import io from "socket.io-client" ; 
export const useAuthStore = create( (set , get) =>({
    authUser : null ,
    
    isSigningUp : false , 
    isLoggingUp : false , 
    isUpdatingProflie : false , 
    isCheckingAuth  : true ,
    socket : null ,
    onlineUsers :[] ,
    checkAuth : async ( )=>{
        try {
            const response = await axiosInstance.get("/auth/check") ;
            set ({ authUser : response.data }) ; 
            get().connectSocket() ; 

        }
        catch (error){
            // console.log("Error in checkAuth" , error ) ; 
            set({authUser :null }) ; 

        }

        finally{
            set ({ isCheckingAuth : false }) ; 
        }
    }
    ,
    signUp : async (data)=>{
        set({isSigningUp :true});
        try {
            const response = await axiosInstance.post('/auth/signup' , data ) ; 
            set({authUser : response.data }) ;
            get().connectSocket() ; 

            toast.success("The account is created successfully")  ; 

        }
        catch(error) {
            // console.log( "the error is :" , error) ; 
            toast.error( error) ; 
        }
        finally{
            set({isSigningUp :false});
        }
    }
    ,login :async ( data ) =>{
        set( {isLoggingUp : true }) ; 
        try {
            const response = await axiosInstance.post("auth/login" , data ) ; 
            set({ authUser : response.data }) ;
            get().connectSocket() ; 
            // console.log( response ) ; 
 
        }
        catch (error ) {
            // console.log( "the error :" , error) ;
            toast.error(error) ;
        }

        finally{
            set({isLoggingUp :false}) ; 
        }
    }
    ,logout :async ( ) =>{
        // set( {isLoggingUp : true }) ; 
        try {
            const response = await axiosInstance.post("auth/logout"  ) ; 
            set({ authUser : null }) ;
            get().disconnectSocket () ; 
            // console.log( response ) ; 
 
        }
        catch (error ) {
            // console.log( "the error :" , error) ;
            toast.error(error) ;
        }

        // finally{
        //     set({isLoggingUp :false}) ; 
        // }
    }
    ,
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const response = await axiosInstance.put("/auth/update-profile", data);
        //   set({ authUser: response.data });
        set((state) => ({
            authUser: {
              ...state.authUser,
              ...res.data
            },
            isUpdatingProfile: false
          }));
        //   console.log(response.data) ; 
          toast.success("Profile updated successfully");
        } catch (error) {
        //   console.log("error in update profile:", error);
          toast.error(error.response );
        } finally {
          set({ isUpdatingProfile: false });
        }
      } , 
      connectSocket :()=>{
       const { authUser } = get() ; 
       if ( !authUser || get().socket?.connected)
        return ; 

       const socket = io( F_BASE_URL) ; 
       socket.connect() ; 

       set({socket : socket }) ; 

      } ,
      disconnectSocket :()=>{
if ( get().socket?.connected )
    get().socket.disconnect() ; 
      }
}) ) 