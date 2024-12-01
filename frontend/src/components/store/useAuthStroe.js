import {create} from "zustand" ; 
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create( (set) =>({
    authUser : null ,
    isSigningUp : false , 
    isLoggingUp : false , 
    isUpdatingProflie : false , 
    isCheckingAuth  : true ,

    checkAuth : async ( )=>{
        try {
            const response = await axiosInstance.get("/auth/check") ;

            set ({ authUser : response.data }) ; 

        }
        catch (error){
            console.log("Error in checkAuth" , error ) ; 
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
            console.log( "the error is :" , error) ; 
            toast.error( error) ; 
        }
        finally{
            set({isSigningUp :false});
        }
    }
}) ) 