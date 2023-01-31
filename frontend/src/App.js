import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Cats/Login";
import Logout from './components/Logout';
import MedicalFilesList from './pages/Cats/MedicalFilesList';
import NewMedicalFile from './pages/Cats/Create/NewMedicalFile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'
import EditMedicalFile from './pages/Cats/Edit/EditMedicalFile';
import NoPermission from './pages/NoPermission'
import Management from './pages/Cats/Management/Management';
import { useSelector } from 'react-redux';
import Selection from './pages/Selection';

function App() {
  const {user} = useSelector(state => state.auth)
  return (
    <>
      <Router>
        <Routes>
          <Route
          path='/'
          element={<PrivateRoute>
                    <Selection />
                  </PrivateRoute>} />
          <Route
          path='/medicalfiles-cats' 
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
        {user && (<Logout />)}
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
