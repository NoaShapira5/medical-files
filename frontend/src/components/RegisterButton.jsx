import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function Register() {
    const navigate = useNavigate()
  return (
    <Button onClick={() => navigate('/register')} variant='contained' sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, marginLeft: '20px'}}>
        רישום משתמש חדש&nbsp;
        <Person2Icon />
    </Button>
  )
}

export default Register
