import "./organizationCard.css"
import { ArrowUpRight, Crown, UsersRound } from "lucide-react"
import { motion } from "framer-motion"

const OrganizationCard = ({organization,onOpen,userId})=>{
    const displayName = organization?.name || "Organization"
    const profileName = displayName.slice(0,2).toUpperCase()
    const isOwner = Boolean(organization?.owner && userId) && organization.owner.toString() === userId.toString()
    const role = userId ? (isOwner? "Owner":"Member") : "Preview"

    return(
        <motion.div
            className="card-container"
            whileHover={{ y: -10, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
            <div className="card-info">
                <div className="card-border">
                    <h3>{profileName}</h3>
                </div>
                <div className="des">
                    <h2>{organization?.name || "Undefined"}</h2>
                    <h4>{organization?.description || "Undefined Description "}</h4>
                </div>
            </div>
            <div className="card-about">
                <h3><UsersRound size={17}/>{organization?.members?.length || 0} Members</h3>
                <h4><Crown size={14}/>{role}</h4>
            </div>
            <div className="open-button">
                <button type="button" onClick={() => onOpen?.(organization)}>
                    Open Organization <ArrowUpRight size={17}/>
                </button>
            </div>
        </motion.div>
    )
}

export default OrganizationCard
