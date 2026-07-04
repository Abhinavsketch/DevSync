import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import {getOrganizationMembers} from "../../api/organizationApi"

const joinedDate = new Intl.DateTimeFormat("en-IN")

const OrganizationMember = ()=>{
    const [members,setMembers] = useState([]);
    const params = useParams();
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("")
    const [search,setSearch] = useState("")
    const [debounceSearch,setDebounceSearch] = useState("")

    useEffect(()=>{
        const timer = setTimeout(()=>setDebounceSearch(search),500)
        return ()=>clearTimeout(timer)

    },[search])

    useEffect(()=>{
        const fetchOrganizationMembers = async ()=>{
            try{
                const data = await getOrganizationMembers(params.id,{page:1,limit:10,search:debounceSearch})
                setMembers(data.members)
            }
            catch(error){
                setError(error.response?.data?.message)
            }
            finally{
                setLoading(false)
            }
        }

        fetchOrganizationMembers();
    },[params.id,debounceSearch])

    return(
        <div className="container">
            <input type="text" placeholder="Enter Your Member Name" value={search} onChange={(e)=>setSearch(e.target.value)}/>

            {loading && <div className="loading-container">
                <h1>Loading....</h1>
            </div>}
            {error && <div className="error-Container">
                <h1>{error}</h1>
            </div>}
            {!loading && !error && members.length === 0 && <div className="empty-contaienr">
                <h1>Your Member List Is Empty</h1>
            </div>}
            {!loading && !error && members.length>0 && <div className="members-container">
                {members.map((member)=>(
                    <div className="member-card" key={member._id}>
                        <h1>{member.name}</h1>
                        <p>{member.email}</p>
                        <p>Role:{member.role}</p>
                        <p>Joined At : {joinedDate.format(new Date(member.createdAt))}</p>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default OrganizationMember