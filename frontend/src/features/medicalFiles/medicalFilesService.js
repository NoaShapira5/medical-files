import axios from "axios";

const API_URL = '/api/medicalFiles'

// Delete image from gcp
const deleteImage = async (image, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            image
        }
    }
    const res = await axios.delete(API_URL + '/delete-file', config)
    return res.data
}

// Upload images to gcp
const uploadImages = async (images) => {
    const formData = new FormData()
    for(const image of images) {
        formData.append("images", image)
    }
    const res = await axios.post(API_URL + '/upload', formData)
    return res.data.files
}

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

// Get meidcal file
const getMedicalFile = async (medicalFileId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL + `/${medicalFileId}`, config)
    return response.data
}

// Edit medical file
const editMedicalFile = async (medicalFile, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/' + medicalFile._id, medicalFile, config)
    return response.data

}


//Back to medical files list
const back = () => localStorage.removeItem('medicalFile')

const medicalFileService = {
    deleteImage,
    uploadImages,
    createMedicalFile,
    getMedicalFiles,
    deleteMedicalFile,
    getMedicalFile,
    editMedicalFile,
    back
}

export default medicalFileService