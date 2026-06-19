import instance from "./axios";

export const getDashboardOverview = async (id)=>{
    const response = await instance.get(`/dashboard/overview/${id}`)
    return response.data
}