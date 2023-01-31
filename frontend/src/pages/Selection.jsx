import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Selection() {
    const navigate = useNavigate()
  return (
    <div>
        <Button
        variant='contained'
        onClick={() => navigate('/medicalfiles-dogs')}
        sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', width: '150px', height: '100px', fontSize: '20px'}}
        >
            כלבים
        </Button>    
        <Button
        variant='contained'
        onClick={() => navigate('/medicalfiles-cats')}
        sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', width: '150px', height: '100px', fontSize: '20px'}}
        >
            חתולים
        </Button>
      
    </div>
  )
}

export default Selection
