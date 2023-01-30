import { Box, Tab, Tabs, Button} from '@mui/material';
import { useState } from 'react';
import FirstTabEdit from './FirstTabEdit';
import SecondTabCreateNew from '../Create/SecondTabCreateNew';
import ThirdTabCreateNew from '../Create/ThirdTabCreateNew'
import { useDispatch } from 'react-redux';
import { back } from '../../features/medicalFiles/medicalFilesSlice';
import { useNavigate } from 'react-router-dom';

function EditMedicalFile() {
    const [tabIndex, setTabIndex] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleTabChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };

    const onBack = () => {
        dispatch(back())
        navigate('/')
    }
  
    return (
        <Box>
            <Box sx={{display: 'flex'}}>
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ '& .MuiTabs-indicator': { backgroundColor: 'CadetBlue' },'& .Mui-selected': { color: 'CadetBlue' },}}>
                    <Tab label="פרטי תיק רפואי" />
                    <Tab label="פירוט מהלך רפואי" />
                    <Tab label="סיכום למשרד החקלאות" />
                </Tabs>
                <Button variant="contained" onClick={onBack}
                sx={{position: 'absolute', right: '50px', backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
                    חזרה
                </Button>
            </Box>
            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                <Box>
                    
                    <FirstTabEdit />
                    
                </Box>
                )}
                {tabIndex === 1 && (
                <Box>
                    <SecondTabCreateNew />
                </Box>
                )}
                {tabIndex === 2 && (
                <Box>
                    <ThirdTabCreateNew />
                </Box>
                )}
            </Box>
        </Box>
    );
}

export default EditMedicalFile
