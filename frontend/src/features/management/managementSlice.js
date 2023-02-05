import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import managementService from './managementService'
import { extractErrorMessage } from '../../utils'

const initialState = {
    communities: [],
    diagnoses: [],
    medicines: [],
    treatments: [],
    examinations: [],
    isLoading: false
}

// get communities
export const getCommunities = createAsyncThunk('communities/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.getCommunities(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// create community
export const createCommunity = createAsyncThunk('community/create', async (communityData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.createCommunity(communityData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete communities
export const deleteCommuinities = createAsyncThunk('community/delete', async (communityIds, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.deleteCommuinities(communityIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit community
export const editCommunity = createAsyncThunk('community/edit', async (community, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.editCommunity(community, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get diagnoses
export const getDiagnoses = createAsyncThunk('diagnoses/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.getDiagnoses(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// create diagnosis
export const createDiagnosis = createAsyncThunk('diagnoses/create', async (diagnosisData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.createDiagnosis(diagnosisData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete diagnoses
export const deleteDiagnoses = createAsyncThunk('diagnoses/delete', async (diagnosisIds, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.deleteDiagnoses(diagnosisIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit diagnosis
export const editDiagnosis = createAsyncThunk('diagnoses/edit', async (diagnosis, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.editDiagnosis(diagnosis, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get medicenes
export const getMedicines = createAsyncThunk('medicines/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.getMedicines(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// create medicine
export const createMedicine = createAsyncThunk('medicines/create', async (medicineData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.createMedicine(medicineData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete medicines
export const deleteMedicines = createAsyncThunk('medicines/delete', async (medicineIds, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.deleteMedicines(medicineIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit medicine
export const editMedicine = createAsyncThunk('medicines/edit', async (medicine, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.editMedicine(medicine, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get treatments
export const getTreatments = createAsyncThunk('treatments/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.getTreatments(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// create treatment
export const createTreatment = createAsyncThunk('treatments/create', async (treatmentData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.createTreatment(treatmentData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete treatments
export const deleteTreatments = createAsyncThunk('treatments/delete', async (treatmentIds, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.deleteTreatments(treatmentIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit treatment
export const editTreatment = createAsyncThunk('treatments/edit', async (treatment, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.editTreatment(treatment, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get examinations
export const getExaminations = createAsyncThunk('examinations/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.getExaminations(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// create examination
export const createExamination = createAsyncThunk('examination/create', async (examinationData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.createExamination(examinationData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete examinations
export const deleteExaminations = createAsyncThunk('examinations/delete', async (examinationIds, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.deleteExaminations(examinationIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit examination
export const editExamination = createAsyncThunk('examinations/edit', async (examination, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.editExamination(examination, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const managmentSlice = createSlice({
    name: 'management',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getCommunities.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCommunities.fulfilled, (state, action) => {
                state.isLoading = false
                state.communities = action.payload.community
            })
            .addCase(getDiagnoses.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDiagnoses.fulfilled, (state, action) => {
                state.isLoading = false
                state.diagnoses = action.payload.diagnosis
            })
            .addCase(getMedicines.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMedicines.fulfilled, (state, action) => {
                state.isLoading = false
                state.medicines = action.payload.medicines
            })
            .addCase(getTreatments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTreatments.fulfilled, (state, action) => {
                state.isLoading = false
                state.treatments = action.payload.treatments
            })
            .addCase(getExaminations.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getExaminations.fulfilled, (state, action) => {
                state.isLoading = false
                state.examinations = action.payload.examinations
            })
            .addCase(createCommunity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCommunity.fulfilled, (state, action) => {
                state.isLoading = false
                state.communities.push(action.payload)

            })
            .addCase(createCommunity.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(createDiagnosis.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDiagnosis.fulfilled, (state, action) => {
                state.isLoading = false
                state.diagnoses.push(action.payload)
            })
            .addCase(createDiagnosis.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(createMedicine.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMedicine.fulfilled, (state, action) => {
                state.isLoading = false
                state.medicines.push(action.payload)
            })
            .addCase(createMedicine.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(createTreatment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTreatment.fulfilled, (state, action) => {
                state.isLoading = false
                state.treatments.push(action.payload)
            })
            .addCase(createTreatment.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(createExamination.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createExamination.fulfilled, (state, action) => {
                state.isLoading = false
                state.examinations.push(action.payload)
            })
            .addCase(createExamination.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(deleteTreatments.fulfilled, (state, action) => {
                state.treatments = state.treatments.filter(treatment => !(action.payload.includes(treatment._id)))
            })
            .addCase(deleteMedicines.fulfilled, (state, action) => {
                state.medicines = state.medicines.filter(medicine => !(action.payload.includes(medicine._id)))
            })
            .addCase(deleteExaminations.fulfilled, (state, action) => {
                state.examinations = state.examinations.filter(examination => !(action.payload.includes(examination._id)))
            })
            .addCase(deleteCommuinities.fulfilled, (state, action) => {
                state.communities = state.communities.filter(community => !(action.payload.includes(community._id)))
            })
            .addCase(deleteDiagnoses.fulfilled, (state, action) => {
                state.diagnoses = state.diagnoses.filter(diagnosis => !(action.payload.includes(diagnosis._id)))
            })
            .addCase(editTreatment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editTreatment.fulfilled, (state, action) => {
                state.isLoading = false
                state.treatments = state.treatments.map(treatment =>
                    treatment._id === action.payload._id ? action.payload : treatment)
            })
            .addCase(editTreatment.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(editMedicine.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editMedicine.fulfilled, (state, action) => {
                state.isLoading = false
                state.medicines = state.medicines.map(medicine =>
                    medicine._id === action.payload._id ? action.payload : medicine)
            })
            .addCase(editMedicine.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(editExamination.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editExamination.fulfilled, (state, action) => {
                state.isLoading = false
                state.examinations = state.examinations.map(examination =>
                    examination._id === action.payload._id ? action.payload : examination)
            })
            .addCase(editExamination.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(editDiagnosis.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editDiagnosis.fulfilled, (state, action) => {
                state.isLoading = false
                state.diagnoses = state.diagnoses.map(diagnosis =>
                    diagnosis._id === action.payload._id ? action.payload : diagnosis)
            })
            .addCase(editDiagnosis.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(editCommunity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editCommunity.fulfilled, (state, action) => {
                state.isLoading = false
                state.communities = state.communities.map(community =>
                    community._id === action.payload._id ? action.payload : community)
            })
            .addCase(editCommunity.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export default managmentSlice.reducer