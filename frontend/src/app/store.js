import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import medicalFileReducer from '../features/medicalFiles/medicalFilesSlice'
import operationReducer from '../features/operation/operationSlice'
import managementReducer from '../features/management/managementSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicalFiles: medicalFileReducer,
    operation: operationReducer,
    management: managementReducer

  },
});