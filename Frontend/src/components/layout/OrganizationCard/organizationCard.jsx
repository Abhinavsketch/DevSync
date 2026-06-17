import "./organizationCard.css"
import { ArrowUpRight, Crown, UsersRound } from "lucide-react"
import { motion } from "framer-motion"

const OrganizationCard = ()=>{
    return(
        <motion.div
            className="card-container"
            whileHover={{ y: -10, scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
            <div className="card-info">
                <div className="card-border">
                    <h3>DS</h3>
                </div>
                <div className="des">
                    <h2>DevSync HQ</h2>
                    <h4>Main workspace for product planning and team collaboration.</h4>
                </div>
            </div>
            <div className="card-about">
                <h3><UsersRound size={17}/>0 Members</h3>
                <h4><Crown size={14}/>Preview</h4>
            </div>
            <div className="open-button">
                <button type="button">
                    Open Organization <ArrowUpRight size={17}/>
                </button>
            </div>
        </motion.div>
    )
}

export default OrganizationCard
