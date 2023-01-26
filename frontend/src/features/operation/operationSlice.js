import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import operationService from './operationService'
import { extractErrorMessage } from '../../utils'

const initialState = {
    operations: [],
    operation: null,
    isLoading: false,
}

// Create new operation
export const createMedicalFileOperation = createAsyncThunk('operation/create', async (operationData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await operationService.createMedicalFileOperation(operationData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get medical file's operations
export const getMedicalFileOperations = createAsyncThunk('operations/get', async (medicalFileId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await operationService.getMedicalFileOperations(medicalFileId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const operationSlice = createSlice({
    name: 'operation',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getMedicalFileOperations.pending, (state) => {
                state.operation = null
            })
            .addCase(getMedicalFileOperations.fulfilled, (state, action) => {
                state.operations = action.payload.operations
            })
            .addCase(createMedicalFileOperation.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMedicalFileOperation.fulfilled, (state, action) => {
                state.operation = action.payload
                state.isLoading = false
            })
            .addCase(createMedicalFileOperation.rejected, (state) => {
                state.isLoading = false
            })

    }
})

export default operationSlice.reducer