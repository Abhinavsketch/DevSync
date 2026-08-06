import instance from "./axios";

export const createTeam = async(id,name)=>{
    const response = await instance.post(`/team/create/${id}`,{
        name:name
    })

    return response.data
}

export const getTeam = async(id)=>{
    const response = await instance.get(`/team/getTeam/${id}`)

    return response.data
}

export const addMember = async(id,email,role)=>{
    const response = await instance.post(`/team/addmember/${id}`,{
        email:email,
        role:role
    })

    return response.data
}

export const getTeamMember = async(id)=>{
    const response = await instance.get(`/team/getteammember/${id}`)

    return response.data
}

export const removeMember = async (id,userId)=>{
    const response = await instance.post(`/team/removemembers/${id}/${userId}`)

    return response.data
}

export const changeRole = async(id,userId,role)=>{
    const response = await instance.post(`/team/changerole/${id}/${userId}`,{
        newRole:role
    })

    return response.data
}

