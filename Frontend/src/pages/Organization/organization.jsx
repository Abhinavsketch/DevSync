import DashNav from "../../components/layout/Dashboard Navbar/dashNav";
import "./organization.css"
import OrganizationCard from "../../components/layout/OrganizationCard/organizationCard";
import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk, Inbox, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { createOrganization } from "../../api/organizationApi";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext"
import { getOrganizations } from "../../api/organizationApi";
import { useNavigate } from "react-router-dom"
import { listUserInvites } from "../../api/invitationApi";

const lineReveal = {
  hidden: { y: "115%" },
  visible: (i) => ({
    y: "0%",
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.12 },
  }),
};

const Organization = () => {

  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const [organizations, setOrganizations] = useState([])

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })

  const [fetchError, setFetchError] = useState("")

  const [showForm, setShowForm] = useState(false)

  const [error, setError] = useState("")
  const [creating, setCreating] = useState(false)
  const [count,setCount] = useState(0)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }))
  }

  const handleCreateOrganization = async (e) => {
    e.preventDefault()
    try {
      setError("")
      if (!formData.name.trim() || !formData.description.trim()) {
        setError("Fill All Fields To Create Organization")
        return
      }

      setCreating(true)

      const org = await createOrganization({
        name: formData.name,
        description: formData.description
      })

      setOrganizations((previous) => ([org.organization, ...previous]))

      setFormData({
        name: "",
        description: ""
      })

      setShowForm(false)
    }
    catch (error) {
      setError(error.response?.data?.message || "Something Went Wrong")
    }
    finally {
      setCreating(false)
    }
  }

  useEffect(() => {
    const orgList = async () => {
      setFetchError("")
      try {
        const res = await getOrganizations()
        setOrganizations(res.orgList)

      }
      catch (error) {
        setFetchError(error.response?.data?.message)
      }
    }

    orgList()
  }, [])

  useEffect(()=>{
    const getInvitationCount = async ()=>{
      try{
        setError("");

        const response = await listUserInvites();
        setCount(response.pagination?.totalInvites || 0)
      }
      catch(error){
        setError(error.response?.data?.message)
      }
    }

    getInvitationCount()
  },[])

  const totalMembers = organizations.reduce((total, organization) => (total + (organization?.members?.length || 0)), 0)

  const handleOpenOrganization = (orgId) => {
    if (!orgId) {
      return
    }

    navigate(`/organization/${orgId}`)
  }

  return (
    <div className="orgx-page">
      <div className="orgx-frame">

        <DashNav user={user?.name} />

        {/* giant headline */}
        <div className="orgx-head">
          <h1 className="orgx-title" aria-label="Mission control.">
            <span className="orgx-mask">
              <motion.span
                className="orgx-line"
                custom={0}
                variants={lineReveal}
                initial="hidden"
                animate="visible"
              >
                MISSION
              </motion.span>
            </span>
            <span className="orgx-mask">
              <motion.span
                className="orgx-line"
                custom={1}
                variants={lineReveal}
                initial="hidden"
                animate="visible"
              >
                <em>control</em>
                <motion.i
                  className="orgx-star"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                >
                  <Asterisk size={"100%"} strokeWidth={2.4} />
                </motion.i>
              </motion.span>
            </span>
          </h1>

          {/* stats rail */}
          <motion.div
            className="orgx-stats"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <strong>{organizations.length}</strong>
              <span>UNIVERSES</span>
            </div>
            <div>
              <strong>{totalMembers}</strong>
              <span>CREW IN ORBIT</span>
            </div>
            <div>
              <strong>ON</strong>
              <span>SHIELDS</span>
            </div>
          </motion.div>
        </div>

        {/* toolbar */}
        <motion.div
          className="orgx-toolbar"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="orgx-search">
            <Search size={18} strokeWidth={2.2} />
            <input type="text" placeholder="SCAN THE UNIVERSE…" readOnly />
          </div>
          <button
            type="button"
            className="orgx-forge"
            onClick={() => { setShowForm(previous => !previous) }}
          >
            <Plus size={17} strokeWidth={2.4} /> FORGE NEW
          </button>
          <Link to="/invites" className="orgx-inbox">
            <Inbox size={16} strokeWidth={2.2} />
            INBOX
            <span className="orgx-inbox-count">{count}</span>
          </Link>
        </motion.div>

        {/* forge panel */}
        {showForm && <motion.div
          className="orgx-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="orgx-panel-copy">
            <span className="orgx-panel-kicker">// FORGE NEW</span>
            <h2>Name your <em>world.</em></h2>
            <p>A name, one line about the mission — and your crew has a home.</p>
          </div>
          <form onSubmit={handleCreateOrganization} className="orgx-form">
            <label className="orgx-field">
              <span>(01) — ORG_NAME</span>
              <input
                name="name"
                placeholder="Nebula Labs"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label className="orgx-field">
              <span>(02) — MISSION_LINE</span>
              <input
                name="description"
                placeholder="Ship the impossible."
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            {error && <p className="orgx-error">⚠ {error}</p>}
            <button type="submit" disabled={creating} className="orgx-submit">
              <span>{creating ? "FORGING…" : "FORGE ORGANIZATION"}</span>
              <ArrowUpRight size={20} strokeWidth={2.2} />
            </button>
          </form>
        </motion.div>}

        {/* list head */}
        <div className="orgx-list-head">
          <span>(INDEX)</span>
          <span>YOUR ORGANIZATIONS</span>
        </div>

        {organizations.length === 0 && <div className="orgx-empty">
          <p>Empty space out here. <em>Forge your first universe</em> and light it up.</p>
        </div>}

        <div className="orgx-list">
          {fetchError && <p className="orgx-error">⚠ {fetchError}</p>}
          {organizations.map((organization) => (
            <OrganizationCard key={organization._id} organization={organization} userId={user?._id} onOpen={handleOpenOrganization} />
          ))}
        </div>

        {/* bottom rail */}
        <motion.div
          className="orgx-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <span><i className="orgx-blip" /> DECK LIVE</span>
          <span>ORGS ⟶ TEAMS ⟶ PROJECTS ⟶ TASKS</span>
          <span>© 2026</span>
        </motion.div>
      </div>
    </div>
  )
};

export default Organization;
