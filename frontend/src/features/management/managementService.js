import axios from "axios";

const API_URL = '/api/management'

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

// Create new community
const createCommunity = async (communityData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/community', communityData, config)
    return response.data
}

// Delete commuinities
const deleteCommuinities = async (communityIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: communityIds
        }
    }
    const response = await axios.delete(API_URL + '/community', config)
    return response.data
}

// Edit community
const editCommunity = async (community, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/community/' + community._id, community, config)
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

// Create new diagnosis
const createDiagnosis = async (diagnosisData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/diagnosis', diagnosisData, config)
    return response.data
}

// Delete diagnoses
const deleteDiagnoses = async (diagnosisIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: diagnosisIds
        }
    }
    const response = await axios.delete(API_URL + '/diagnosis', config)
    return response.data
}

// Edit diagnosis
const editDiagnosis = async (diagnosis, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/diagnosis/' + diagnosis._id, diagnosis, config)
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

// Create new medicine
const createMedicine = async (medicineData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/medicines', medicineData, config)
    return response.data
}

// Delete medicines
const deleteMedicines = async (medicineIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: medicineIds
        }
    }
    const response = await axios.delete(API_URL + '/medicines', config)
    return response.data
}

// Edit medicine
const editMedicine = async (medicine, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/medicines/' + medicine._id, medicine, config)
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

// Create new treatment
const createTreatment = async (treatmentData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/treatments', treatmentData, config)
    return response.data
}

// Delete treatments
const deleteTreatments = async (treatmentsIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: treatmentsIds
        }
    }
    const response = await axios.delete(API_URL + '/treatments', config)
    return response.data
}

// Edit treatment
const editTreatment = async (treatment, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/treatments/' + treatment._id, treatment, config)
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

// Create new examination
const createExamination = async (examinationData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL + '/examinations', examinationData, config)
    return response.data
}

// Delete examinations
const deleteExaminations = async (examinationIds, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            body: examinationIds
        }
    }
    const response = await axios.delete(API_URL + '/examinations', config)
    return response.data
}

// Edit examination
const editExamination = async (examination, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + '/examinations/' + examination._id, examination, config)
    return response.data
}

const managmentService = {
    getCommunities,
    createCommunity,
    deleteCommuinities,
    editCommunity,
    getDiagnoses,
    createDiagnosis,
    deleteDiagnoses,
    editDiagnosis,
    getMedicines,
    createMedicine,
    deleteMedicines,
    editMedicine,
    getExaminations,
    createExamination,
    deleteExaminations,
    editExamination,
    getTreatments,
    createTreatment,
    deleteTreatments,
    editTreatment
}

export default managmentService


