import "./dashNav.css"
import { ChevronDown } from "lucide-react";

const DashNav = ({ user }) => {
    const displayName = user || "Abhinav"
    const profileName = displayName.slice(0, 2).toUpperCase()
    return (
        <div className="dashrail">
            <div className="dashrail-brand">
                DEVSYNC<sup>®</sup>
            </div>
            <span className="dashrail-mid">OPERATOR DECK — LIVE</span>
            <div className="dashrail-profile">
                <span className="dashrail-ava">{profileName}</span>
                <h4>{displayName}</h4>
                <ChevronDown className="dashrail-chevron" size={16} />
            </div>
        </div>
    )
}

export default DashNav
