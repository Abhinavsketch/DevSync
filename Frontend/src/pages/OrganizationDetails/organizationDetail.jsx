import "./organizationDetail.css"
import { useParams } from "react-router-dom"
import { useState,useEffect,useContext,useCallback } from "react"
import DashNav from "../../components/layout/Dashboard Navbar/dashNav"
import { motion } from "framer-motion"
import {
    Activity,
    AlertTriangle,
    ArrowLeft,
    Bell,
    Building2,
    CheckCircle2,
    ChevronRight,
    CircleDot,
    Clock3,
    FolderKanban,
    LayoutDashboard,
    ListTodo,
    MessageSquareText,
    Plus,
    RefreshCw,
    Settings,
    ShieldCheck,
    Sparkles,
    UsersRound,
    Zap,
} from "lucide-react"
import {AuthContext} from "../../context/authContext"
import { useNavigate } from "react-router-dom"
import { getDashboardOverview } from "../../api/dashboardApi"

const OrganizationDetail = ()=>{
    const params = useParams()
    const [overview,setOverview] = useState(null)
    const [error,setError]  = useState("")
    const [loading,setLoading] = useState(true)
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    const headbacktoOrganization = ()=>{
        navigate("/organization")
    }

    const fetchOverview = useCallback(async ()=>{
            setError("")
            setLoading(true)
            try{
                const data = await getDashboardOverview(params.id)
                setOverview(data)
            }
            catch(error){
                setError(error.response?.data?.message || "Organization not found")
            }
            finally{
                setLoading(false)
            }
        },[params.id])


    useEffect(()=>{
        fetchOverview()
    },[fetchOverview])

    if(loading){
        return (
            <div className="detail-state-screen">
                <div className="detail-state-glow" />
                <div className="detail-loader-orbit">
                    <span />
                    <Building2 size={28}/>
                </div>
                <span className="detail-state-kicker">Opening workspace</span>
                <h1>Syncing your command center</h1>
                <p>Pulling organization details, members, and workspace structure.</p>
                <div className="detail-loading-track"><span /></div>
            </div>
        )
    }

    if(error){
        return (
            <div className="detail-state-screen detail-error-screen">
                <div className="detail-state-glow" />
                <div className="detail-error-icon"><AlertTriangle size={30}/></div>
                <span className="detail-state-kicker">Workspace unavailable</span>
                <h1>We could not open this organization.</h1>
                <p>{error}</p>
                <div className="detail-state-actions">
                    <button type="button" onClick={headbacktoOrganization}><ArrowLeft size={17}/> All organizations</button>
                    <button type="button" className="detail-retry-button" onClick={fetchOverview}><RefreshCw size={17}/> Try again</button>
                </div>
            </div>
        )
    }

    if(!overview){
        return (
            <div className="detail-state-screen detail-error-screen">
                <div className="detail-error-icon"><Building2 size={30}/></div>
                <span className="detail-state-kicker">No workspace data</span>
                <h1>Organization not found</h1>
                <p>The workspace response did not contain organization details.</p>
            </div>
        )
    }

    const organization = overview.organization
    const stats = overview.stats
    const previews = overview.previews
    const activityPreview = previews.activities ?? []

    const displayName = organization.name ?? "DevSync Workspace"
    const organizationInitials = displayName.slice(0,2).toUpperCase()
    const memberCount = organization.memberCount ?? 0
    const teamCount = stats.totalTeams ?? 0
    const ownerName = organization.owner?.name ?? "Workspace owner"
    const isOwner = organization?.owner?._id?.toString() === user?._id?.toString()
    const taskStats = stats.taskStats

    const openTaskCount = Math.max(0,taskStats.total - taskStats.done)
    const completionPercentage = taskStats.total === 0? 0: Math.round((taskStats.done/taskStats.total)*100)
    return (
        <div className="detail-page">
            <motion.div
                className="detail-ambient detail-ambient-one"
                animate={{ x: [0, 36, 0], y: [0, -24, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="detail-ambient detail-ambient-two"
                animate={{ x: [0, -30, 0], y: [0, 28, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />

            <header className="detail-topbar">
                <DashNav/>
            </header>

            <div className="detail-layout">
                <motion.aside
                    className="detail-sidebar"
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    <button type="button" className="detail-back-button" onClick={headbacktoOrganization}>
                        <ArrowLeft size={17}/>
                        All organizations
                    </button>

                    <div className="detail-org-identity">
                        <div className="detail-org-mark">{organizationInitials}</div>
                        <div>
                            <span>Current workspace</span>
                            <h2>{displayName}</h2>
                        </div>
                    </div>

                    <nav className="detail-navigation" aria-label="Organization workspace">
                        <button type="button" className="active"><LayoutDashboard size={18}/> Overview</button>
                        <button type="button"><UsersRound size={18}/> Teams <span>{teamCount}</span></button>
                        <button type="button"><FolderKanban size={18}/> Projects</button>
                        <button type="button"><ListTodo size={18}/> Tasks</button>
                        <button type="button"><Activity size={18}/> Activity</button>
                        <button type="button"><MessageSquareText size={18}/> Team chat</button>
                    </nav>

                    <div className="detail-sidebar-bottom">
                        {isOwner && <button type="button"><Settings size={18}/> Workspace settings</button>}
                        <div className="detail-security-card">
                            <ShieldCheck size={20}/>
                            <div>
                                <strong>Protected workspace</strong>
                                <span>Member access verified</span>
                            </div>
                        </div>
                    </div>
                </motion.aside>

                <main className="detail-content">
                    <motion.section
                        className="detail-hero"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.62, ease: "easeOut" }}
                    >
                        <div className="detail-hero-copy">
                            <div className="detail-eyebrow"><Sparkles size={15}/> Organization command center</div>
                            <div className="detail-title-row">
                                <div>
                                    <p>Welcome back to</p>
                                    <h1>{displayName}</h1>
                                </div>
                                <span className="detail-live-pill"><CircleDot size={15}/> Workspace online</span>
                            </div>
                            <p className="detail-description">{organization.description || "A focused workspace for your teams, projects, and product delivery."}</p>
                            <div className="detail-meta-row">
                                <span><ShieldCheck size={16}/> Owned by {ownerName}</span>
                                <span><Building2 size={16}/> ID {organization.id}</span>
                                <span>Role: {isOwner?"Owner":"Member"}</span>
                            </div>
                        </div>
                        <div className="detail-hero-actions">
                            <button type="button" className="detail-icon-button" aria-label="Notifications"><Bell size={19}/></button>
                            <button type="button" className="detail-primary-button"><Plus size={18}/> Create new</button>
                        </div>
                    </motion.section>

                    <motion.section
                        className="detail-stats-grid"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.08 } },
                        }}
                    >
                        <motion.article variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                            <div className="detail-stat-icon violet"><UsersRound size={20}/></div>
                            <span>Workspace members</span>
                            <strong>{memberCount}</strong>
                            <p><CheckCircle2 size={14}/> Active collaborators</p>
                        </motion.article>
                        <motion.article variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                            <div className="detail-stat-icon cyan"><UsersRound size={20}/></div>
                            <span>Teams</span>
                            <strong>{teamCount}</strong>
                            <p><Zap size={14}/> Ready to organize</p>
                        </motion.article>
                        <motion.article variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                            <div className="detail-stat-icon amber"><FolderKanban size={20}/></div>
                            <span>Projects</span>
                            <strong>{stats.totalProjects}</strong>
                            <p><Clock3 size={14}/> Across all teams</p>
                        </motion.article>
                        <motion.article variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                            <div className="detail-stat-icon rose"><ListTodo size={20}/></div>
                            <span>Open tasks</span>
                            <strong>{openTaskCount}</strong>
                            <p><Clock3 size={14}/> Awaiting completion</p>
                        </motion.article>
                    </motion.section>

                    <section className="detail-dashboard-grid">
                        <motion.article
                            className="detail-panel detail-progress-panel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.24 }}
                        >
                            <div className="detail-panel-heading">
                                <div>
                                    <span>Delivery pulse</span>
                                    <h2>Project progress</h2>
                                </div>
                                <button type="button">View projects <ChevronRight size={16}/></button>
                            </div>
                            <div className="detail-chart-preview">
                                <div className="detail-chart-copy">
                                    <div
                                        className="detail-chart-ring"
                                        style={{ "--completion": `${completionPercentage}%` }}
                                    >
                                        <span>{completionPercentage}%</span>
                                    </div>
                                    <div>
                                        <strong>Connect project data</strong>
                                        <p>Your project velocity and completion rate will appear here.</p>
                                    </div>
                                </div>
                                <div className="detail-chart-bars" aria-hidden="true">
                                    <span/><span/><span/><span/><span/><span/><span/>
                                </div>
                            </div>
                        </motion.article>

                        <motion.article
                            className="detail-panel detail-activity-panel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.31 }}
                        >
                            <div className="detail-panel-heading">
                                <div>
                                    <span>Live timeline</span>
                                    <h2>Recent activity</h2>
                                </div>
                                <Activity size={19}/>
                            </div>
                            <div className="detail-empty-activity">
                                <div><Activity size={22}/></div>
                                <strong>Activity feed is ready</strong>
                                <p>Workspace changes will form a clear audit trail here.</p>
                            </div>
                        </motion.article>

                        <motion.article
                            className="detail-panel detail-teams-panel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.38 }}
                        >
                            <div className="detail-panel-heading">
                                <div>
                                    <span>People and ownership</span>
                                    <h2>Your teams</h2>
                                </div>
                                <button type="button">Manage teams <ChevronRight size={16}/></button>
                            </div>
                            <div className="detail-team-preview">
                                <div className="detail-team-avatar"><UsersRound size={24}/></div>
                                <div>
                                    <strong>{teamCount === 0 ? "Build your first team" : `${teamCount} teams connected`}</strong>
                                    <p>Group members around projects, roles, and shared delivery goals.</p>
                                </div>
                                <button type="button"><Plus size={17}/> New team</button>
                            </div>
                        </motion.article>

                        <motion.article
                            className="detail-panel detail-quick-panel"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.45 }}
                        >
                            <div className="detail-panel-heading">
                                <div>
                                    <span>Jump back in</span>
                                    <h2>Quick actions</h2>
                                </div>
                                <Zap size={19}/>
                            </div>
                            <div className="detail-quick-actions">
                                {isOwner && <button type="button"><span><UsersRound size={18}/></span><div><strong>Invite member</strong><small>Grow your workspace</small></div><ChevronRight size={17}/></button>}
                                <button type="button"><span><FolderKanban size={18}/></span><div><strong>Create project</strong><small>Start a delivery track</small></div><ChevronRight size={17}/></button>
                                <button type="button"><span><ListTodo size={18}/></span><div><strong>Add task</strong><small>Capture the next move</small></div><ChevronRight size={17}/></button>
                            </div>
                        </motion.article>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default OrganizationDetail
