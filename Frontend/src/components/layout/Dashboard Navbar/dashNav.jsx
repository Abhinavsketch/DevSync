import "./dashNav.css"
import devSyncLogo from "../../../assets/brand/devsync-logo-transparent.png"
import { ChevronDown } from "lucide-react";

const DashNav = ({user})=>{
    const displayName = user || "Abhinav"
    const profileName = displayName.slice(0,2).toUpperCase()
    return (
        <div className="navContainer">
            <div className="navlogo">
                <img className="orgLogo" src={devSyncLogo} alt="logo of product" />
                <h2>DevSync</h2>
            </div>
            <div className="profile">
                <div className="nameBorder">
                    <h3>{profileName}</h3>
                </div>
                <h4>{displayName}</h4>
                <ChevronDown className="profile-chevron" size={18} />
            </div>
        </div>
    )
}

export default DashNav