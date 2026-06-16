const OrganizationCard = ({organization,onOpen,userId})=>{
    const displayName = organization?.name || "Organization"
    const profileName = displayName.slice(0,2)
    const isOwner = organization?.owner?.toString() === userId?.toString() || false
    const role = isOwner? "Owner":"Member"

    return(
        <div className="card-container">
            <div className="card-info">
                <div className="card-border">
                    <h3>{profileName}</h3>
                </div>
                <h2>{organization?.name || "Undefined"}</h2>
                <h4>{organization?.description || "Undefined Description "}</h4>
            </div>
            <div className="card-about">
                <h3>{organization?.members?.length || 0}</h3>
                <h4>{role}</h4>
            </div>
        </div>
    )
}

export default OrganizationCard