import "./login.css"
import {Link} from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles, TimerReset, UsersRound } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";


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
        <div className="login-page">
            <motion.div
                className="login-ambient login-ambient-one"
                animate={{ x: [0, 32, 0], y: [0, -26, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="login-ambient login-ambient-two"
                animate={{ x: [0, -30, 0], y: [0, 28, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <svg className="login-lines" viewBox="0 0 1200 720" aria-hidden="true">
                <path d="M-80 310 C170 120 350 470 610 250 C830 70 980 210 1290 80" />
                <path d="M-60 560 C190 430 370 690 650 455 C870 270 1020 470 1290 260" />
            </svg>

            <motion.div
                className="login-shell"
                initial={{ opacity: 0, y: 34, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
            >
                <section className="login-panel">
                    <div className="login-container">
                        <div className="login-heading">
                            <p className="login-form-kicker">Welcome back</p>
                            <h2>Login</h2>
                            <p>Start working with your team</p>
                        </div>
                        <div className="info">
                            <form onSubmit={handleSubmit}>
                                <label>
                                    <span>Email address</span>
                                    <input type="email" onChange={handleChange} placeholder="Enter your email" name="email" value={formData.email}/>
                                </label>
                                <label>
                                    <span>Password</span>
                                    <div className="pass">
                                        <input type={showPassword?"text":"password"} onChange={handleChange} placeholder="Enter your password" name="password" value={formData.password}/>
                                        {showPassword?<Eye className="eye" onClick={togglePass} />:<EyeOff className="eye" onClick={togglePass} />}
                                    </div>
                                </label>
                                {error && <p className="login-error">{error}</p>}
                                <button className="login-button" disabled={loading} type="submit">
                                    {loading?"Logging...":"Login"} <ArrowRight size={18}/>
                                </button>
                            </form>
                        </div>
                        <div className="login-outro">
                            <h3>You don't have an account?</h3>
                            <Link to="/register">Register</Link>
                        </div>
                    </div>
                </section>

                <section className="login-showcase">
                    <Link to="/" className="login-brand">
                        <span><Sparkles size={19}/></span>
                        DevSync
                    </Link>
                    <div className="login-copy">
                        <p className="login-kicker">Secure workspace access</p>
                        <h1>Pick up exactly where your team left off.</h1>
                        <p>Sign in to manage organizations, review progress and keep every workspace moving without losing context.</p>
                    </div>
                    <div className="login-proof">
                        <motion.div className="session-card" whileHover={{ y: -8, rotateX: 2, rotateY: 2 }}>
                            <div className="session-card-top">
                                <span>Active workspace</span>
                                <strong>Online</strong>
                            </div>
                            <div className="session-row">
                                <div><UsersRound size={18}/><p>Team members</p><strong>08</strong></div>
                                <div><TimerReset size={18}/><p>Open tasks</p><strong>24</strong></div>
                            </div>
                        </motion.div>
                        <motion.div className="login-mini-proof login-mini-proof-one" animate={{ y: [0, -12, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
                            <ShieldCheck size={18}/>
                            <span>Session restored safely</span>
                        </motion.div>
                        <motion.div className="login-mini-proof login-mini-proof-two" animate={{ y: [0, 14, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>
                            <LockKeyhole size={18}/>
                            <span>Protected workspace routes</span>
                        </motion.div>
                        <motion.div className="login-mini-proof login-mini-proof-three" animate={{ x: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                            <CheckCircle2 size={18}/>
                            <span>Refresh flow ready</span>
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </div>
    )
}

export default Login
