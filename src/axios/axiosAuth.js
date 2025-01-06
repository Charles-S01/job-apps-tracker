import axios from "axios"

const axiosAuth = axios.create({
    baseURL: import.meta.env.VITE_AUTH_BASE_URL,
    timeout: 30000,
    headers: { "Content-Type": "application/json" },
})

axiosAuth.interceptors.request.use((config) => {
    console.log("auth request config:", config)
    return config
})

axiosAuth.interceptors.response.use(
    (response) => {
        console.log("auth response:", response)
        return response
    },
    (error) => {
        console.log(error)
        return Promise.reject(error)
    },
)

export default axiosAuth
