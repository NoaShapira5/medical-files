import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import {extractErrorMessage} from '../../utils'

// Get user from localstorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    users: [],
    user: user ? user : null,
    isLoading: false,
}

export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.register(user, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const getUsers = createAsyncThunk('auth/getUses', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUsers(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const deleteUsers = createAsyncThunk('auth/deleteUsers', async (userIds, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.deleteUsers(userIds, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

// edit user
export const editUser = createAsyncThunk('auth/edit', async (user, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.editUser(user, token)
    } catch (error) {
        return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
})

export const logout = createAction('auth/logout', async () => {
    authService.logout()
    return {}
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.users.push(action.payload)
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.users
                state.isLoading = false
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                state.users = state.users.filter(user => !(action.payload.includes(user._id)))
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.users = state.users.map(user =>
                    user._id === action.payload._id ? action.payload : user)
            })
            .addCase(editUser.rejected, (state) => {
                state.isLoading = false
            })
    }
  })
  
  export const {reset} = authSlice.actions
  export default authSlice.reducer