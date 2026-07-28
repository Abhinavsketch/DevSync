import instance from "./axios.js"

export const createInvitation = async(orgId,email)=>{
    const response = await instance.post(`/invitation/${orgId}`,{
        email:email
    })

    return response.data
}

export const acceptInvitation = async(token)=>{
    const response = await instance.post(`/invitation/accept/${token}`)

    return response.data
}

export const rejectInvitation = async(token)=>{
    const response = await instance.post(`/invitation/reject/${token}`)

    return response.data
}

export const cancelInvitation = async(inviteId)=>{
    const response = await instance.post(`/invitation/cancel/${inviteId}`)

    return response.data
}

export const listOrganizationInvites = async (orgId)=>{
    const response = await instance.get(`/invitation/invites/${orgId}`)

    return response.data
}

export const listUserInvites = async ()=>{
    const response = await instance.get(`/invitation/yourinvites`)

    return response.data
}