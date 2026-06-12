import { AuthContext } from "../../context/authContext"
import { useContext ,useState} from "react"
import { useNavigate } from "react-router-dom"


const Dashboard = ()=>{
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const logoutUser = async ()=>{

        try{
            await logout();
            navigate("/login")
        }
        catch(error){
            setError(error.response?.data?.message || "Something Went Wrong")
        }
    }
    return(
        <div className="container">
            <h1>
                This is Dashboard
            </h1>
            <button onClick={logoutUser}>LogOut</button>
        </div>
    )
}

export default Dashboard