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

// Delete operation
const deleteOperation = async(operationIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: operationIds
        }
    }
    const response = await axios.delete(API_URL + '/', config)
    return response.data
}

// Delete operations by medical file
const deleteOperationsByMedicalFile = async(medicalFileIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: medicalFileIds
        }
    }
    const response = await axios.delete(API_URL + '/by-medicalfile', config)
    return response.data
}

// Edit operation
const editOperation = async (operation, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const formData = new FormData();
    formData.append("file", operation.file)
    const res = await axios.post(API_URL + '/uploadFile', formData)
    operation.file = res.data.files
    const response = await axios.put(API_URL + '/' + operation._id, operation, config)
    return response.data

}

const operationService = {
    createMedicalFileOperation,
    getMedicalFileOperations,
    deleteOperation,
    deleteOperationsByMedicalFile,
    editOperation
}

export default operationService