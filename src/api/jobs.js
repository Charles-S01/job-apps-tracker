import axiosInstance from "../axios/axiosInstance"

export async function createJob({
    title,
    location,
    company,
    description,
    link,
    dateApplied,
    status,
}) {
    try {
        const body = {
            title,
            location,
            description,
            company,
            link,
            dateApplied,
            status,
        }
        const response = await axiosInstance.post("/jobs", body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getJobs({ jobId, searchInput, status, sortBy }) {
    try {
        console.log("getJobs")
        const params = {
            status,
            searchInput,
            sortBy,
        }
        console.log("getJobs params:", params)
        const response = await axiosInstance.get(`/jobs/job/${jobId || ""}`, { params })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getJobPosting({ link }) {
    try {
        const params = { link }
        const response = await axiosInstance.get(`/jobs/job-posting`, { params })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function updateJob({
    jobId,
    title,
    location,
    description,
    company,
    link,
    dateApplied,
    status,
}) {
    try {
        const body = {
            title,
            location,
            description,
            company,
            link,
            dateApplied,
            status,
        }
        const response = await axiosInstance.put(`/jobs/${jobId}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function deleteJob({ jobId }) {
    try {
        const response = await axiosInstance.delete(`/jobs/${jobId}`)
        return response.data
    } catch (error) {
        throw error
    }
}
