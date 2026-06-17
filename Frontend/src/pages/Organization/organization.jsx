import DashNav from "../../components/layout/Dashboard Navbar/dashNav";
import "./organization.css"
import OrganizationCard from "../../components/layout/OrganizationCard/organizationCard";
import { motion } from "framer-motion";
import { ArrowRight, Building2, FolderKanban, Plus, Search, ShieldCheck, Sparkles, UsersRound, Zap } from "lucide-react";
import { useState } from "react";
import { createOrganization } from "../../api/organizationApi";

const Organization = () => {

  const [organizations,setOrganizations] = useState([])

  const [formData,setFormData] = useState({
    name:"",
    description:""
  })

  const [showForm,setShowForm] = useState(false)

  const [error,setError] = useState("")
  const [creating,setCreating] = useState(false)

  const handleChange = (event)=>{
    const {name,value} = event.target

    setFormData((previous)=>({
      ...previous,
      [name]:value
    }))
  }

  const handleCreateOrganization = async (e)=>{
    e.preventDefault()
    try{
      setError("")
      if(!formData.name.trim() || !formData.description.trim()){
        setError("Fill All Fields To Create Organization")
        return
      }

      setCreating(true)

     const org =  await createOrganization({
        name:formData.name,
        description:formData.description
      })

      setOrganizations((previous)=>([org.organization,...previous]))

      setFormData({
        name:"",
        description:""
      })

      setShowForm(false)
    }
    catch(error){
      setError(error.response?.data?.message || "Something Went Wrong")
    }
    finally{
      setCreating(false)
    }
  }

  return (
    <div className="org-container">
      <motion.div
        className="org-ambient org-ambient-one"
        animate={{ x: [0, 34, 0], y: [0, -28, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="org-ambient org-ambient-two"
        animate={{ x: [0, -32, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg className="org-lines" viewBox="0 0 1200 720" aria-hidden="true">
        <path d="M-90 260 C150 120 360 430 590 250 C820 70 1010 210 1300 70" />
        <path d="M-60 560 C180 420 380 680 650 455 C870 270 1030 470 1290 250" />
      </svg>
      <div className="org-nav">
        <DashNav/>
      </div>
      <div className="org-main">
        <motion.section
          className="org-hero"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="org-info">
            <div className="about">
              <span className="org-kicker"><Sparkles size={16}/> Workspace command center</span>
              <h1>Your Organizations</h1>
              <p>Create or select a workspace to continue building with your team.</p>
            </div>
            <div className="create-button">
              <button type="button">
                <Plus size={18}/> Create Organization
              </button>
            </div>
          </div>

          <div className="org-stats">
            <div>
              <Building2 size={20}/>
              <span>00</span>
              <p>Real workspaces</p>
            </div>
            <div>
              <UsersRound size={20}/>
              <span>00</span>
              <p>Visible members</p>
            </div>
            <div>
              <ShieldCheck size={20}/>
              <span>Secure</span>
              <p>Auth protected</p>
            </div>
          </div>
        </motion.section>

        <section className="org-workbench">
          <div className="org-toolbar">
            <div className="search-shell">
              <Search size={18}/>
              <input type="text" placeholder="Search organizations" readOnly />
            </div>
            <div className="toolbar-pill">
              <Zap size={16}/>
              <span>Workspace view ready</span>
            </div>
          </div>

          <motion.div
            className="create-org-panel"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <div>
              <span className="org-kicker">New workspace</span>
              <h2>Create organization</h2>
              <p>This is the visual form shell. You will wire the create logic next.</p>
            </div>
            <form onSubmit={handleCreateOrganization} className="create-form-preview">
              <input
                name="name"
                placeholder="Organization name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="description"
                placeholder="Short description"
                value={formData.description}
                onChange={handleChange}
              />
              <button type="submit">Create Organization <ArrowRight size={17}/></button>
            </form>
          </motion.div>

          <div className="empty-banner">
            <FolderKanban size={20}/>
            <p>No real organization loaded yet. Preview cards are shown for design only.</p>
          </div>

        <div className="org-card">
          <OrganizationCard/>
          <OrganizationCard/>
          <OrganizationCard/>
        </div>
        </section>
      </div>
    </div>
  )
};

export default Organization;
