import "./navbar.css";
import { CloudCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ()=>{
    return(
        <div className="navbar">
            <div className="intro">
                <span className="logo">
                    <CloudCheck className="brand-logo"/>
                </span>
                <span className="name">DevSync</span>
            </div>
            <div className="features">
                <a href="#features">Features</a>
                <a href="#workflow">WorkFlow</a>
                <a href="#pricing">Pricing</a>
                <a href="#product">Product</a>
                <a href="#resources">Resources</a>
            </div>
            <div className="cta">
                <Link to="/login" className="login cta-link">Login</Link>
                <Link to="/register" className="started cta-link">Get Started</Link>
            </div>
        </div>
    )
}

export default Navbar
