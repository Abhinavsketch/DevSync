import "./register.css";
import { useContext,useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.jsx";

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
  
    navigate("/dashboard")
    }
    catch(error){
      setError(error.response?.data?.message || "Registration Failed Try Again")
    }
  }

  return (
    <div className="container">
      <div className="register-container">
        <div className="heading">
          <h2>Create Your Account</h2>
          <p>Join DevSync and bring your team projects together</p>
        </div>
        <div className="info">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name Here"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email Here"
            />
            <div className="firstPassword">
                <input
                    type={showPassword?"text":"password"}
                    name="password"
                    className="passfirst"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Your Password Here"
                />
                {
                    showPassword?<Eye onClick={togglefirstPassword} className="offEye"/>:<EyeOff onClick={togglefirstPassword} className="offEye"/>
                }
            </div>
            <div className="secondPassword">
                <input
                    type={showConfirmPassword?"text":"password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Your Password Here"
                />
                {
                    showConfirmPassword?<Eye onClick={togglesecondPassword} className="secondOff"/>:<EyeOff onClick={togglesecondPassword} className="secondOff"/>
                }
            </div>
            {error && <p className="showError">{error}</p>}
            <button type="submit" disabled={loading}>{loading? "Creating Account" : "Create Account"}</button>
          </form>
        </div>
        <div className="already">
          <h3>Already have Account?</h3>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

