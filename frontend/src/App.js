import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login";
import Logout from './components/Logout';
import MedicalFilesList from './pages/Cats/MedicalFilesList';
import MedicalFilesListDogs from './pages/Dogs/MedicalFilesListDogs';
import NewMedicalFile from './pages/Cats/Create/NewMedicalFile';
import NewDogMedicalFile from './pages/Dogs/Create/NewDogMedicalFile';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'
import EditMedicalFile from './pages/Cats/Edit/EditMedicalFile';
import NoPermission from './pages/NoPermission'
import Management from './pages/Cats/Management/Management';
import { useSelector } from 'react-redux';
import Selection from './pages/Selection';
import { useState } from 'react';
import ManagementButton from './components/ManagementButton';
import PDF from './pages/PDF'

function App() {
  const [dogEdited, setDogEdited] = useState(false)
  const [catEdited, setCatEdited] = useState(false)

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
          path='/medicalfiles-dogs' 
          element={<PrivateRoute>
                    <MedicalFilesListDogs />
                  </PrivateRoute>} />
          <Route 
          path='/medical-file/:medicalFileId'
          element={<PrivateRoute>
                    <EditMedicalFile  setEdited={setCatEdited} edited={catEdited}/>
                  </PrivateRoute>} />
          
          <Route
          path='/pdf/:medicalFileId'
          element={<PDF />}
          />

          <Route path='/login' element={<Login />} />

          <Route 
          path='/create-file' 
          element={<PrivateRoute>
                    <NewMedicalFile setEdited={setCatEdited} edited={catEdited}/>
                  </PrivateRoute>} 
          />  

          <Route 
          path='/create-dog-medicalFile' 
          element={<PrivateRoute>
                    <NewDogMedicalFile setEdited={setDogEdited} edited={dogEdited}/>
                  </PrivateRoute>} 
          />  

          <Route path='/no-permission' element={<NoPermission />} />
          <Route path='/management' element={<AdminRoute><Management /></AdminRoute>} />
        </Routes>
        <div>
          {user && (<Logout edited={catEdited} setEdited={setCatEdited}/>)}
          {user?.isAdmin && (<ManagementButton />)}
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
