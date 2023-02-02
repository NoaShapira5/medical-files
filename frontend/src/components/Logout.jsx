import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from '../features/auth/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Logout({edited, setEdited}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
      if(edited) {
        if(window.confirm('האם אתה בטוח שאתה רוצה לעזוב את העמוד? השינוים לא ישמרו')) {
          setEdited(false)
          dispatch(logout())
          navigate('/')
        }
    } else {
      dispatch(logout())
      navigate('/')
    }

    }
  return (
    <Button onClick={onLogout} variant='contained' sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
        יציאה&nbsp;
        <LogoutIcon />
    </Button>
  )
}

export default Logout
