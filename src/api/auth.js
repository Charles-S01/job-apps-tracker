import axiosAuth from "../axios/axiosAuth"

export async function loginUser({ username, password }) {
    try {
        const body = {
            username,
            password,
        }
        // console.log("loginUser body:", body)
        const response = await axiosAuth.post("/login", body, {
            withCredentials: true,
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export async function refreshToken() {
    try {
        console.log("refreshToken()")
        const response = await axiosAuth.post("/refresh", {}, { withCredentials: true })
        return response.data
    } catch (error) {
        throw error
    }
}
