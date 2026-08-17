import "./Project.css"
import { useState,useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import {getProject} from "../../api/projectApi"

const Project = ()=>{
    const [projects,setProjects] = useState([])
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)
    const params = useParams()

    useEffect(()=>{
        const allProjects = async()=>{
            try{
                setError("")
                setLoading(true)

                const data = await getProject(params.teamId)
                setProjects(data.projects)
            }
            catch(error){
                setError(error.response?.data?.message)
            }
            finally{
                setLoading(false)
            }
        }

        allProjects()
    },[])

    return(
        <div className="main">
            {error && <div className="error-container">
                <h1>{error}</h1>
            </div>}
            {loading && <div className="loading-container">
                <h1>Loading...</h1>
            </div>}
            {!error && !loading && projects.length === 0 && <div className="empty-container">
                <h1>You don't have any projects in the team</h1>
            </div>}

            {!error && !loading && projects.length>0 && <div className="project-container">
                {projects.map((project)=>(
                    <div className="mainProject" key={project._id}>
                        <h1>{project.title}</h1>
                        <p>{project.description}</p>
                        <p>{project.status}</p>
                        <p>{project.deadline}</p>
                        <p>{project.tasks.length}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default Project