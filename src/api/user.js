import axios from "axios"
import axiosAuth from "../axios/axiosAuth"
import axiosInstance from "../axios/axiosInstance"

export async function createUser({ firstName, lastName, username, password }) {
    try {
        const body = {
            firstName,
            lastName,
            username,
            password,
        }
        const response = await axiosInstance.post("/user", body)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getUser(params) {
    try {
        const response = await axiosInstance.get("/user")
        return response.data
    } catch (error) {
        throw error
    }
}
