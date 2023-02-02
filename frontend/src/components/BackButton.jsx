import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

function BackButton() {
    const navigate = useNavigate()
  return (
    <Button 
    onClick={() => navigate(-1)} 
    variant='contained' 
    sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, marginBottom: '25px'}}>
        חזרה&nbsp;
        <ArrowBackIcon />
    </Button>
  )
}

export default BackButton