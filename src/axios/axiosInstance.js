import axios from "axios"
import { refreshToken } from "../api/auth"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log("request config:", config)
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

axiosInstance.interceptors.response.use(
    (response) => {
        console.log("response:", response)
        return response
    },
    async (error) => {
        console.log(error)
        if (error.response.status === 401 && error.response.data.message === "Unauthorized") {
            const data = await refreshToken()

            localStorage.setItem("token", data.token)
        }
        return Promise.reject(error)
    },
)

export default axiosInstance
