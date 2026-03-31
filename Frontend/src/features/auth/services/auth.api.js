import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || ""

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true
})

function logAndThrowError(action, err) {
    const message = err.response?.data?.message || err.message || `Failed to ${action}`
    console.error(`Auth API ${action} failed:`, {
        message,
        status: err.response?.status,
        data: err.response?.data
    })
    throw err
}

export async function register({ username, email, password }) {

    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })

        return response.data

    } catch (err) {
        logAndThrowError("register", err)
    }

}

export async function login({ email, password }) {

    try {

        const response = await api.post("/api/auth/login", {
            email, password
        })

        return response.data

    } catch (err) {
        logAndThrowError("login", err)
    }

}

export async function logout() {
    try {

        const response = await api.get("/api/auth/logout")

        return response.data

    } catch (err) {
        logAndThrowError("logout", err)
    }
}

export async function getMe() {

    try {

        const response = await api.get("/api/auth/get-me")

        return response.data

    } catch (err) {
        logAndThrowError("get current user", err)
    }

}
