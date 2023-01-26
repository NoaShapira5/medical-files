import axios from "axios";

const API_URL = '/api/medicalFiles'

// Create new medical file
const createMedicalFile = async (medicalFileData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const formData = new FormData()
    for(const image of medicalFileData.images) {
        formData.append("images", image)
    }
    const res = await axios.post(API_URL + '/upload', formData)
    medicalFileData.images = res.data.files
    const response = await axios.post(API_URL, medicalFileData, config)
    if(response.data) {
        localStorage.setItem('medicalFile', JSON.stringify(response.data))
    }
    return response.data
}

// Get all medical files
const getMedicalFiles = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
    return response.data
}

// Delete medical file
const deleteMedicalFile = async (medicalFileIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: medicalFileIds
        }
    }
    const response = await axios.delete(API_URL, config)
    return response.data
}

const medicalFileService = {
    createMedicalFile,
    getMedicalFiles,
    deleteMedicalFile
}

export default medicalFileService