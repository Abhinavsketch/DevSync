import { useState, useEffect } from "react";
import {
  getOrganizations,
  createOrganization,
} from "../../api/organizationApi";
import DashNav from "../../components/layout/Dashboard Navbar/dashNav";
import "./organization.css"
import OrganizationCard from "../../components/layout/OrganizationCard/organizationCard";

const Organization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [creating, setCreating] = useState(false);

  useEffect(()=>{
    const loadOrganization = async ()=>{
        try{
            setError("")
            setLoading(true)
            const data = await getOrganizations()
            setOrganizations(data.orgList || [])
        }
        catch(error){
            setError(error.response?.data?.message || "Failed to Load Organization")
        }
        finally{
            setLoading(false)
        }

    }

    loadOrganization()
  },[])

  return (
    <div className="org-container">
      <div className="org-nav">
        <DashNav/>
      </div>
      <div className="org-main">
        <div className="org-info">
          <div className="about">
            <h1>Your Organizations</h1>
            <p>Create or Select a WorkSpace to Continue</p>
          </div>
          <div className="create-button">
            <button>+ Create Account</button>
          </div>
        </div>
        <div className="org-card">
          <OrganizationCard/>
        </div>
      </div>
    </div>
  )
};

export default Organization;
