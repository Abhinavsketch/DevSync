import instance from "./axios";

export const getOrganizations = async ()=>{
    const response =await instance.get("/organization/getorganization")

    return response.data
}

export const createOrganization = async (credentials)=>{
    const response = await instance.post("/organization/create",{
        name:credentials.name,
        description:credentials.description
    })

    return response.data
}

export const singleOrganization = async (id)=>{
    const response = await instance.get(`/organization/${id}`)

    return response.data
}