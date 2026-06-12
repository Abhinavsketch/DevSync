import {Routes,Route} from "react-router-dom"
import Login from "../pages/Login/login"
import Register from "../pages/Register/register"
import Landing from "../pages/landing/Landing"
import Dashboard from "../pages/Dashboard/dashboard"
import ProtectedRoute from "./ProtectedRoutes"

const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element = {<Landing/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard/>
                </ProtectedRoute>
                }/>
        </Routes>
    )
}

export default AppRoutes

