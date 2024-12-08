import {create} from "zustand" ; 
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create( (set) =>({
    authUser : null ,
    isSigningUp : false , 
    isLoggingUp : false , 
    isUpdatingProflie : false , 
    isCheckingAuth  : true ,
    // we added Here 
    onlineUsers :[] ,
    checkAuth : async ( )=>{
        try {
            const response = await axiosInstance.get("/auth/check") ;
            set ({ authUser : response.data }) ; 

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
      },
}) ) 