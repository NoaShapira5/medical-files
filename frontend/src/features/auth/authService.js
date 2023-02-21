import axios from 'axios'

const API_URL = '/api/users/'

//Register user
const register = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, userData, config)
    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Get users
const getUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Delete users
const deleteUsers = async (userIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: userIds
        }
    }
    const response = await axios.delete(API_URL, config)
    return response.data
}

// Edit user
const editUser = async (user, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/' + user._id, user, config)
    return response.data
}

//Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
    register,
    login,
    getUsers,
    deleteUsers,
    editUser,
    logout

}

export default authService