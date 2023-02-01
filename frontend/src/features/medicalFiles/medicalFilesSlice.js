import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import medicalFileService from "./medicalFilesService";
import { extractErrorMessage } from "../../utils";

// Get medical file from localstorage
const medicalFile = JSON.parse(localStorage.getItem('medicalFile'))

const initialState = {
    medicalFiles: [],
    medicalFile: medicalFile ? medicalFile : null,
    isLoading: false
}

// Delete image from gcp
export const deleteImage = createAsyncThunk('medicalFile/delete-image', async (image, thunkAPI) => {
    try {
        return await medicalFileService.deleteImage(image)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Upload images to gcp
export const uploadImages = createAsyncThunk('medicalFile/upload-images', async (images, thunkAPI) => {
    try {
        return await medicalFileService.uploadImages(images)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

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

// get medical file
export const getMedicalFile = createAsyncThunk('medicalFile/get', async (medicalFileId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await medicalFileService.getMedicalFile(medicalFileId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit medical file
export const editMedicalFile = createAsyncThunk('medicalFile/edit', async (medicalFile, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await medicalFileService.editMedicalFile(medicalFile, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const back = createAction('medicalFile/back', async () => {
    medicalFileService.back()
    return {}
})

export const medicalFileSlice = createSlice({
    name: 'medicalFile',
    initialState,
    reducers: {
        back: (state) => {
            state.medicalFile = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.medicalFile = {...state.medicalFile, images: state.medicalFile.images.filter(image => !image.includes(action.payload))}
            })
            .addCase(uploadImages.fulfilled, (state, action) => {
                state.medicalFile = {...state.medicalFile, images:[...state.medicalFile.images, ...action.payload]}
            })
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
            .addCase(getMedicalFile.pending, (state, action) => {
                state.isLoading = true
                state.medicalFile = action.payload
            })
            .addCase(getMedicalFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.medicalFile = action.payload
            })
            .addCase(editMedicalFile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editMedicalFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.medicalFile = action.payload
                state.medicalFiles = state.medicalFiles.map(medicalFile =>
                    medicalFile._id === action.payload._id ? action.payload : medicalFile)
            })
            .addCase(editMedicalFile.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export default medicalFileSlice.reducer