import instance from "./axios.js"


export const registerUser = async (credentials)=>{
        const response = await instance.post("/auth/signup",{
            name:credentials.name,
            email:credentials.email,
            password:credentials.password
        })

        return response.data
}

export const loginUser = async (credentials)=>{
    const response = await instance.post("/auth/login",{
        email:credentials.email,
        password:credentials.password
    })

    return response.data
}

export const getCurrentUser = async (accessToken)=>{
    const response = await instance.get("/auth/getme",{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
        
    })

    return response.data

}

export const logoutUser = async ()=>{
    const response = await instance.post("/auth/logout")

    return response.data
}

export const refreshAccessToken = async ()=>{
    const response = await instance.post("/auth/refresh")

    return response.data
}