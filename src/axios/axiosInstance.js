import axios from "axios"

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
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
    (error) => {
        console.log(error)
        return Promise.reject(error)
    },
)

export default axiosInstance
