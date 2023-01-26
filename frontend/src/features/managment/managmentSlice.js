import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import managmentService from './managmentService'
import { extractErrorMessage } from '../../utils'

const initialState = {
    medicines: [],
    treatments: [],
    examinations: [],
    isLoading: false
}

// get medicenes
export const getMedicines = createAsyncThunk('medicines/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managmentService.getMedicines(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get treatments
export const getTreatments = createAsyncThunk('treatments/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managmentService.getTreatments(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get examinations
export const getExaminations = createAsyncThunk('examinations/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await managmentService.getExaminations(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const managmentSlice = createSlice({
    name: 'managment',
    initialState,
    extraReducers: (builder) => {
        builder
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