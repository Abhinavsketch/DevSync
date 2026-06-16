import "./login.css"
import {Link} from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";


const Login = ()=>{

    const navigate = useNavigate()
    const {login,loading} = useContext(AuthContext)
    const [showPassword,setShowPassword] = useState(false)

    const [formData,setFormData] = useState({
        email:"",
        password:"",
    })
    const [error,setError] = useState("")

    const handleChange = (event)=>{
        const {name,value} = event.target

        setFormData((previousValue)=>({
            ...previousValue,
            [name]:value
        }))
    }

    const togglePass = ()=>{
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setError("")
        try{

            if(!formData.email.trim() || !formData.password){
                setError("Please Fill All Field")
                return
            }
            await login({
                email:formData.email,
                password:formData.password
            })

            navigate("/organization")
        }
        catch(error){
            setError(error.response?.data?.message || "Login Unsuccessful")
        }
    }


    return(
        <div className="l-container">
            <div className="login-container">
                <div className="login-heading">
                    <h2>Login</h2>
                    <p>Start Working With Your Team</p>
                </div>
                <div className="info">
                    <form onSubmit={handleSubmit}>
                        <input type="email" onChange={handleChange} placeholder="Enter Your email here" name="email" value={formData.email}/>
                        <div className="pass">
                            <input type={showPassword?"text":"password"} onChange={handleChange} placeholder="Enter Your Password Here" name="password" value={formData.password}/>
                            {showPassword?<Eye className="eye" onClick={togglePass} />:<EyeOff className="eye" onClick={togglePass} />}
                        </div>
                        {error && <p>{error}</p>}
                        <button className="login-button" disabled={loading} type="submit">{loading?"Logging...":"Login"}</button>
                    </form>
                </div>
                <div className="login-outro">
                    <h3>You Don't have the account?</h3>
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login