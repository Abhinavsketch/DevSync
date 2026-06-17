import "./organizationCard.css"
import { ArrowUpRight, Crown, UsersRound } from "lucide-react"
import { motion } from "framer-motion"


const OrganizationCard = ({organization,userId,onOpen})=>{
    const displayName = organization?.name || "Demo"
    const profileName = displayName.slice(0,2).toUpperCase()
    const isOwner = organization?.owner?.toString() === userId?.toString()

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
                    <h2>{displayName}</h2>
                    <h4>{organization?.description || "Nothing About Project"}</h4>
                </div>
            </div>
            <div className="card-about">
                <h3><UsersRound size={17}/>{organization?.members?.length || 0}</h3>
                <h4><Crown size={14}/>{isOwner?"Owner":"Member"}</h4>
            </div>
            <div className="open-button">
                <button type="button" onClick={()=>(onOpen?.(organization?._id))}>
                    Open Organization <ArrowUpRight size={17}/>
                </button>
            </div>
        </motion.div>
    )
}

export default OrganizationCard
