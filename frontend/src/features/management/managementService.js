import axios from "axios";

const API_URL = '/api/managment'

// Get all communities
const getCommunities = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/community', config)
    return response.data
}

// Get all diagnoses
const getDiagnoses = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/diagnosis', config)
    return response.data
}

// Get all medicines
const getMedicines = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/medicines', config)
    return response.data
}

// Get all treatments
const getTreatments = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/treatments', config)
    return response.data
}

// Get all examinations
const getExaminations = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/examinations', config)
    return response.data
}

const managmentService = {
    getCommunities,
    getDiagnoses,
    getMedicines,
    getExaminations,
    getTreatments
}

export default managmentService


