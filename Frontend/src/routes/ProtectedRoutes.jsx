import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const {user,loading,accessToken} = useContext(AuthContext)

    if(loading === true){
        return <div>Loading...</div>
    }
    else if(!user || !accessToken){
        return <Navigate to="/login" replace={true}/>
    }
    else{
        return children
    }
}

export default ProtectedRoute