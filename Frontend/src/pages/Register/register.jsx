import "./register.css";
import { useContext,useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Eye, EyeOff, FolderKanban, LockKeyhole, Sparkles, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.jsx";
import { motion } from "framer-motion";

const Register = () => {

  const navigate = useNavigate()
  const { register, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword,setconfirmPassword] = useState(false)
  const [error,setError] = useState("")
  const togglefirstPassword = ()=>{
    setShowPassword(!showPassword)
  }

  const togglesecondPassword = ()=>{
    setconfirmPassword(!showConfirmPassword)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setError("");
    
    try{
      

    if(!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword){
      setError("Please Fill all fields")
      return
    }

    if(formData.password.length<6){
      setError("Password should be greater the 6")
      return
    }

    if(formData.password !== formData.confirmPassword){
      setError("Password and Confirm Password Should be same")
      return
    }


    await register({
      name:formData.name,
      email:formData.email,
      password:formData.password
    })
  
    navigate("/organization")
    }
    catch(error){
      setError(error.response?.data?.message || "Registration Failed Try Again")
    }
  }

  return (
    <div className="register-page">
      <motion.div
        className="register-ambient register-ambient-one"
        animate={{ x: [0, 34, 0], y: [0, -26, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="register-ambient register-ambient-two"
        animate={{ x: [0, -32, 0], y: [0, 28, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg className="register-lines" viewBox="0 0 1200 720" aria-hidden="true">
        <path d="M-90 280 C170 120 360 440 590 250 C840 40 1000 190 1300 70" />
        <path d="M-60 560 C180 410 360 680 640 460 C850 300 1020 470 1290 250" />
      </svg>

      <motion.div
        className="register-shell"
        initial={{ opacity: 0, y: 34, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <section className="register-showcase">
          <Link to="/" className="register-brand">
            <span><Sparkles size={19}/></span>
            DevSync
          </Link>
          <div className="showcase-copy">
            <p className="register-kicker">Create your command center</p>
            <h1>Bring your team into one focused workspace.</h1>
            <p>Start with a secure account, then create organizations, invite members and manage work from one modern dashboard.</p>
          </div>
          <div className="showcase-proof">
            <motion.div className="proof-card proof-main" whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}>
              <div className="proof-card-top">
                <span>Workspace setup</span>
                <strong>84%</strong>
              </div>
              <div className="proof-progress"><span></span></div>
              <div className="proof-grid">
                <div><UsersRound size={18}/><p>Members</p><strong>08</strong></div>
                <div><FolderKanban size={18}/><p>Projects</p><strong>12</strong></div>
              </div>
            </motion.div>
            <motion.div className="mini-proof mini-proof-one" animate={{ y: [0, -12, 0] }} transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}>
              <CheckCircle2 size={18}/>
              <span>Role-based access ready</span>
            </motion.div>
            <motion.div className="mini-proof mini-proof-two" animate={{ y: [0, 14, 0] }} transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}>
              <LockKeyhole size={18}/>
              <span>Secure session flow</span>
            </motion.div>
          </div>
        </section>

        <section className="register-panel">
          <div className="register-container">
            <div className="heading">
              <p className="form-kicker">Get started</p>
              <h2>Create Your Account</h2>
              <p>Join DevSync and bring your team projects together</p>
            </div>
            <div className="info">
              <form onSubmit={handleSubmit}>
                <label>
                  <span>Full name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </label>
                <label>
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </label>
                <label>
                  <span>Password</span>
                  <div className="firstPassword">
                      <input
                          type={showPassword?"text":"password"}
                          name="password"
                          className="passfirst"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create a password"
                      />
                      {
                          showPassword?<Eye onClick={togglefirstPassword} className="offEye"/>:<EyeOff onClick={togglefirstPassword} className="offEye"/>
                      }
                  </div>
                </label>
                <label>
                  <span>Confirm password</span>
                  <div className="secondPassword">
                      <input
                          type={showConfirmPassword?"text":"password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                      />
                      {
                          showConfirmPassword?<Eye onClick={togglesecondPassword} className="secondOff"/>:<EyeOff onClick={togglesecondPassword} className="secondOff"/>
                      }
                  </div>
                </label>
                {error && <p className="showError">{error}</p>}
                <button type="submit" disabled={loading}>
                  {loading? "Creating Account" : "Create Account"} <ArrowRight size={18}/>
                </button>
              </form>
            </div>
            <div className="already">
              <h3>Already have Account?</h3>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Register;

