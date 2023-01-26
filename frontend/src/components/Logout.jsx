import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from '../features/auth/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }
  return (
    <Button onClick={onLogout} variant='contained' sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
        יציאה&nbsp;
        <LogoutIcon />
    </Button>
  )
}

export default Logout
