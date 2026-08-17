import instance from "./axios";

export const createProject =async (teamId,title,description,status,deadline)=>{
    const response = await instance.post(`/project/create/${teamId}`,{
        title:title,
        description:description,
        status:status,
        deadline:deadline
    })

    return response.data
}

export const getProject = async (teamId)=>{
    const response = await instance.get(`/project/getProject/${teamId}`)

    return response.data
}

export const updateProject = async (projectId, data) => {
    const response = await instance.post(`/project/update/${projectId}`, data)
    return response.data
}

export const deleteProject = async (projectId)=>{
    const response = await instance.post(`/project/delete/${projectId}`)

    return response.data
}