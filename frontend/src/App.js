import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login";
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
import { useState } from 'react';
import RegisterButton from './components/RegisterButton';
import Register from './pages/Register'
import ManagementButton from './components/ManagementButton';

function App() {
  const [edited, setEdited] = useState(false)
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
                    <EditMedicalFile  setEdited={setEdited} edited={edited}/>
                  </PrivateRoute>} />

          <Route path='/login' element={<Login />} />

          <Route 
          path='/create-file' 
          element={<PrivateRoute>
                    <NewMedicalFile setEdited={setEdited} edited={edited}/>
                  </PrivateRoute>} />
                  
          <Route path='/no-permission' element={<NoPermission />} />
          <Route path='/management' element={<AdminRoute><Management /></AdminRoute>} />
          <Route path = '/register' element={<AdminRoute><Register /></AdminRoute>} />
        </Routes>
        <div>
          {user && (<Logout edited={edited} setEdited={setEdited}/>)}
          {user?.isAdmin && (<RegisterButton />)}
          {user?.isAdmin && (<ManagementButton />)}
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
