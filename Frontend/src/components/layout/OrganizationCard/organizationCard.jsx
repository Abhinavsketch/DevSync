import "./organizationCard.css"
import { ArrowUpRight, UsersRound } from "lucide-react"
import { motion } from "framer-motion"


const OrganizationCard = ({ organization, userId, onOpen }) => {
    const displayName = organization?.name || "Demo"
    const profileName = displayName.slice(0, 2).toUpperCase()
    const isOwner = organization?.owner?.toString() === userId?.toString()

    return (
        <motion.article
            className="orgx-row"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
            <span className="orgx-index" aria-hidden="true" />

            <div className="orgx-mark">{profileName}</div>

            <div className="orgx-name">
                <h2>{displayName}</h2>
                <p>{organization?.description || "No mission statement yet."}</p>
            </div>

            <div className="orgx-meta">
                <span className="orgx-crew">
                    <UsersRound size={13} /> {organization?.members?.length || 0} CREW
                </span>
                <span className={`orgx-role ${isOwner ? "own" : ""}`}>
                    {isOwner ? "OWNER" : "MEMBER"}
                </span>
            </div>

            <button
                type="button"
                className="orgx-open"
                onClick={() => (onOpen?.(organization?._id))}
                aria-label={`Open ${displayName}`}
            >
                <ArrowUpRight size={26} strokeWidth={2.2} />
            </button>
        </motion.article>
    )
}

export default OrganizationCard
