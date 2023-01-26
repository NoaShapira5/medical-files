import axios from 'axios'

const API_URL = '/api/operations'

// Create new operation
const createMedicalFileOperation = async (operationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const formData = new FormData();
    formData.append("file", operationData.file)
    
    const res = await axios.post(API_URL + '/uploadFile', formData)
    operationData.file = res.data.file
    const response = await axios.post(API_URL, operationData, config)
    return response.data
}

// Get medical file's operations
const getMedicalFileOperations = async (medicalFileId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + '/' + medicalFileId, config)
    return response.data
}

const operationService = {
    createMedicalFileOperation,
    getMedicalFileOperations
}

export default operationService