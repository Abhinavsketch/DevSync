import {Routes,Route} from "react-router-dom"
import Login from "../pages/Login/login"
import Register from "../pages/Register/register"
import Landing from "../pages/landing/Landing"
import Organization from "../pages/Organization/organization"
import ProtectedRoute from "./ProtectedRoutes"
import OrganizationDetail from "../pages/OrganizationDetails/organizationDetail"
import OrganizationMember from "../pages/Member/Member"


const AppRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element = {<Landing/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/organization" element={
                <ProtectedRoute>
                    <Organization/>
                </ProtectedRoute>
                }/>

            <Route path="/organization/:id" element={
                <ProtectedRoute>
                    <OrganizationDetail/>
                </ProtectedRoute>
            }/>

            <Route path="/organization/:id/members" element={
                <ProtectedRoute>
                    <OrganizationMember/>
                </ProtectedRoute>
            }/>
        </Routes>
    )
}

export default AppRoutes

