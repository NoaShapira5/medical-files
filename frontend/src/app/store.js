import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import medicalFileReducer from '../features/medicalFiles/medicalFilesSlice'
import dogMedicalFileReducer from '../features/dogMedicalFiles/dogsMedicalFilesSlice'
import operationReducer from '../features/operation/operationSlice'
import managementReducer from '../features/management/managementSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    medicalFiles: medicalFileReducer,
    dogMedicalFiles: dogMedicalFileReducer,
    operation: operationReducer,
    management: managementReducer

  },
});