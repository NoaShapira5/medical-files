import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import medicalFileService from "./medicalFilesService";
import { extractErrorMessage } from "../../utils";

// Get medical file from localstorage
const medicalFile = JSON.parse(localStorage.getItem('medicalFile'))

const initialState = {
    medicalFiles: [],
    medicalFile: medicalFile ? medicalFile : null,
    isLoading: false
}

// Create new medical file
export const createMedicalFile = createAsyncThunk('medicalFile/create', async (medicalFileData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await medicalFileService.createMedicalFile(medicalFileData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Get medical files
export const getMedicalFiles = createAsyncThunk('medicalFile/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await medicalFileService.getMedicalFiles(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete medical file
export const deleteMedicalFile = createAsyncThunk('medicalFile/delete', async (medicalFileIds, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await medicalFileService.deleteMedicalFile(medicalFileIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const medicalFileSlice = createSlice({
    name: 'medical file',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getMedicalFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getMedicalFiles.fulfilled, (state, action) => {
                state.medicalFiles = action.payload.medicalFiles
                state.isLoading = false
            })
            .addCase(getMedicalFiles.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(createMedicalFile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createMedicalFile.fulfilled, (state, action) => {
                state.medicalFile = action.payload
                state.isLoading = false
            })
            .addCase(createMedicalFile.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(deleteMedicalFile.fulfilled, (state, action) => {
                state.medicalFiles = state.medicalFiles.filter(medicalFile => !(action.payload.includes(medicalFile._id)))
            })
    }
})

export default medicalFileSlice.reducer