import instance from "./axios";

export const getOrganizations = async ()=>{
    const response =await instance.get("/organization/getorganization")

    return response.data
}