import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import dogsMedicalFilesService from "./dogsMedicalFilesService";
import { extractErrorMessage } from "../../utils";

// Get medical file from localstorage
const dogMedicalFile = JSON.parse(localStorage.getItem('dogMedicalFile'))

const initialState = {
    dogMedicalFiles: [],
    dogMedicalFile: dogMedicalFile ? dogMedicalFile : null,
    isLoading: false
}

// Delete image from gcp
export const deleteImage = createAsyncThunk('dogMedicalFile/delete-image', async (image, thunkAPI) => {
    try {
        return await dogsMedicalFilesService.deleteImage(image)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Upload images to gcp
export const uploadImages = createAsyncThunk('dogMedicalFile/upload-images', async (images, thunkAPI) => {
    try {
        return await dogsMedicalFilesService.uploadImages(images)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Create new medical file
export const createDogMedicalFile = createAsyncThunk('dogMedicalFile/create', async (medicalFileData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dogsMedicalFilesService.createDogMedicalFile(medicalFileData, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// Get medical files
export const getDogMedicalFiles = createAsyncThunk('dogMedicalFile/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dogsMedicalFilesService.getDogMedicalFiles(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// delete medical file
export const deleteDogMedicalFile = createAsyncThunk('dogMedicalFile/delete', async (medicalFileIds, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dogsMedicalFilesService.deleteDogMedicalFile(medicalFileIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// get medical file
export const getDogMedicalFile = createAsyncThunk('dogMedicalFile/get', async (medicalFileId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dogsMedicalFilesService.getDogMedicalFile(medicalFileId, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit medical file
export const editDogMedicalFile = createAsyncThunk('dogMedicalFile/edit', async (medicalFile, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dogsMedicalFilesService.editDogMedicalFile(medicalFile, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const back = createAction('dogMedicalFile/back', async () => {
    dogsMedicalFilesService.back()
    return {}
})

export const dogMedicalFileSlice = createSlice({
    name: 'dogMedicalFile',
    initialState,
    reducers: {
        back: (state) => {
            state.dogMedicalFile = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.dogMedicalFile = {...state.dogMedicalFile, images: state.dogMedicalFile.images.filter(image => !image.includes(action.payload))}
            })
            .addCase(uploadImages.fulfilled, (state, action) => {
                state.dogMedicalFile = {...state.dogMedicalFile, images:[...state.dogMedicalFile.images, ...action.payload]}
            })
            .addCase(getDogMedicalFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDogMedicalFiles.fulfilled, (state, action) => {
                state.dogMedicalFiles = action.payload.dogMedicalFiles
                state.isLoading = false
            })
            .addCase(getDogMedicalFiles.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(createDogMedicalFile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDogMedicalFile.fulfilled, (state, action) => {
                state.dogMedicalFile = action.payload
                state.isLoading = false
            })
            .addCase(createDogMedicalFile.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(deleteDogMedicalFile.fulfilled, (state, action) => {
                state.dogMedicalFiles = state.dogMedicalFiles.filter(dogMedicalFile => !(action.payload.includes(dogMedicalFile._id)))
            })
            .addCase(getDogMedicalFile.pending, (state, action) => {
                state.isLoading = true
                state.dogMedicalFile = action.payload
            })
            .addCase(getDogMedicalFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.dogMedicalFile = action.payload
            })
            .addCase(editDogMedicalFile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editDogMedicalFile.fulfilled, (state, action) => {
                state.isLoading = false
                state.dogMedicalFile = action.payload
                state.dogMedicalFiles = state.dogMedicalFiles.map(dogMedicalFile =>
                    dogMedicalFile._id === action.payload._id ? action.payload : dogMedicalFile)
            })
            .addCase(editDogMedicalFile.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export default dogMedicalFileSlice.reducer