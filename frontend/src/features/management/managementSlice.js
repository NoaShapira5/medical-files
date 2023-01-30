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

// get diagnoses
export const getDiagnoses = createAsyncThunk('diagnoses/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.getDiagnoses(token)
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

// get treatments
export const getTreatments = createAsyncThunk('treatments/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managementService.getTreatments(token)
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
    }
})

export default managmentSlice.reducer