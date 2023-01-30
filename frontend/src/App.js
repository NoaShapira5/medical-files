import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login";
import Logout from './components/Logout';
import MedicalFilesList from './pages/MedicalFilesList';
import NewMedicalFile from './pages/Create/NewMedicalFile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'
import EditMedicalFile from './pages/Edit/EditMedicalFile';
import NoPermission from './pages/NoPermission'
import Management from './pages/Management/Management';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
          path='/' 
          element={<PrivateRoute>
                    <MedicalFilesList />
                  </PrivateRoute>} />

          <Route 
          path='/medical-file/:medicalFileId'
          element={<PrivateRoute>
                    <EditMedicalFile/>
                  </PrivateRoute>} />

          <Route path='/login' element={<Login />} />

          <Route 
          path='/create-file' 
          element={<PrivateRoute>
                    <NewMedicalFile />
                  </PrivateRoute>} />
                  
          <Route path='/no-permission' element={<NoPermission />} />
          <Route path='/management' element={<AdminRoute><Management /></AdminRoute>} />
        </Routes>
        <Logout />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
