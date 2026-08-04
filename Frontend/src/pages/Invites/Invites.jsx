import "./invites.css";
import { useEffect, useState } from "react";
import { listUserInvites } from "../../api/invitationApi"
import { acceptInvitation } from "../../api/invitationApi";
import { rejectInvitation } from "../../api/invitationApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Asterisk, Building2 } from "lucide-react";

const lineReveal = {
    hidden: { y: "115%" },
    visible: (i) => ({
        y: "0%",
        transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 },
    }),
};

const Invites = () => {

    const [invites, setInvites] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setError("")
        const getUserInvites = async () => {
            try {
                setLoading(true);

                const response = await listUserInvites();
                setInvites(response.invitations);
            }
            catch (error) {
                setError(error.response?.data?.message)
            }
            finally {
                setLoading(false)
            }
        }

        getUserInvites()
    }, [])

    const acceptHandler = async (token)=>{
        try{
            setError("");

            await acceptInvitation(token)

            setInvites(prev => prev.filter((invite)=> invite.token !==token))
        }
        catch(error){
            setError(error.response?.data?.message)
        }
    }   

    const rejectHandler = async (token)=>{
        try{
            setError("");

            await rejectInvitation(token)

            setInvites(prev => prev.filter((invite)=> invite.token !== token))
        }
        catch(error){
            setError(error.response?.data?.message)
        }
    }

    return (
        <div className="ivx-page">
            <div className="ivx-frame">

                {/* top rail */}
                <div className="ivx-rail">
                    <Link to="/organization" className="ivx-brand">DEVSYNC<sup>®</sup></Link>
                    <span className="ivx-rail-mid">YOUR INBOX — PENDING INVITES</span>
                    <Link to="/organization" className="ivx-rail-link">
                        <ArrowLeft size={13} /> WORKSPACES
                    </Link>
                </div>

                {/* headline */}
                <header className="ivx-head">
                    <motion.p
                        className="ivx-welcome"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7 }}
                    >
                        who wants you on their team
                    </motion.p>
                    <h1 className="ivx-title" aria-label="The inbox.">
                        <span className="ivx-mask">
                            <motion.span
                                className="ivx-line"
                                custom={0}
                                variants={lineReveal}
                                initial="hidden"
                                animate="visible"
                            >
                                THE <em>inbox</em>
                                <motion.i
                                    className="ivx-star"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                                >
                                    <Asterisk size={"100%"} strokeWidth={2.4} />
                                </motion.i>
                            </motion.span>
                        </span>
                    </h1>
                </header>

                {/* list head */}
                <div className="ivx-list-head">
                    <span>(PENDING)</span>
                    <span>{invites.length} WAITING</span>
                </div>

                {loading && <div className="ivx-loading">
                    <p>❯ scanning for invitations…</p>
                    <div className="ivx-track" aria-hidden="true"><span /></div>
                </div>}

                {error && <div className="ivx-error">
                    <p>⚠ {error}</p>
                </div>}

                {!loading && !error && invites.length === 0 && <div className="ivx-empty">
                    <p><em>Inbox zero.</em> No organizations have invited you yet.</p>
                </div>}

                {!loading && !error && invites.length > 0 && <div className="ivx-list">
                    {invites.map((invite) => (
                        <div className="ivx-row" key={invite._id}>
                            <span className="ivx-index" aria-hidden="true" />
                            <div className="ivx-mark">
                                {invite.organization?.name?.slice(0, 2).toUpperCase() || <Building2 size={20} />}
                            </div>
                            <div className="ivx-who">
                                <h2>{invite.organization?.name}</h2>
                                <p>invited by {invite.sender?.name}</p>
                            </div>
                            <div className="ivx-meta">
                                <span className="ivx-status">{invite.status}</span>
                            </div>
                            <div className="ivx-actions">
                                <button className="ivx-accept" onClick={()=>{acceptHandler(invite.token)}}>Accept</button>
                                <button className="ivx-reject" onClick={()=>{rejectHandler(invite.token)}}>Reject</button>
                            </div>
                        </div>
                    ))}
                </div>}

                {/* bottom rail */}
                <div className="ivx-foot">
                    <span><i className="ivx-blip" /> INBOX LIVE</span>
                    <span>ACCEPT TO JOIN · REJECT TO DECLINE</span>
                    <span>© 2026</span>
                </div>
            </div>
        </div>
    )
}

export default Invites
