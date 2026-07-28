import instance from "./axios.js"

export const createInvitation = async(orgId,email)=>{
    const response = await instance.post(`/invitation/${orgId}`,{
        email:email
    })

    return response.data
}