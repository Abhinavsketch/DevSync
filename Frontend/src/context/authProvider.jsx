import { AuthContext } from "./authContext";
import { getCurrentUser,refreshAccessToken ,registerUser,loginUser,logoutUser} from "../api/authApi";
import { useState,useEffect } from "react";
import instance from "../api/axios";


export const AuthProvider = ({children})=>{

    

    const [user,setUser] = useState(null)
    const [accessToken,setAccessToken] = useState(null)
    const [loading,setLoading] = useState(false)


    useEffect(()=>{

        const restoreSession = async ()=>{
        try{
            const refreshresponse = await refreshAccessToken()
            setAccessToken(refreshresponse.accessToken)
            const userResponse = await getCurrentUser(refreshresponse.accessToken)
            setUser(userResponse.user)
        }
        catch(error){
            setAccessToken(null)
            setUser(null)
            console.log(error)
        }
        finally{
            setLoading(false)
        }
        }
        restoreSession();
    },[])

    useEffect(()=>{
        instance.interceptors.request.use()
    },[accessToken])

    const register = async (credential)=>{
        setLoading(true)
        try{
            const response = await registerUser({
                name:credential.name,
                email:credential.email,
                password:credential.password
            })

            setUser(response.user)
            setAccessToken(response.accessToken)

            return response
            

        }
        finally{
            setLoading(false)
        }
    }

    const login = async (credential)=>{
        setLoading(true)
        try{
            const response = await loginUser({
                email:credential.email,
                password:credential.password
            })

            setUser(response.user)
            setAccessToken(response.accessToken)
            
            return response

        }
        finally{
            setLoading(false)
        }
    }

    const logout = async ()=>{
        try{
            const response = await logoutUser()

            return response

            
        }
        finally{
            setUser(null)
            setAccessToken(null)
        }

    }
    return(
        <AuthContext.Provider value={{user,accessToken,loading,register,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}