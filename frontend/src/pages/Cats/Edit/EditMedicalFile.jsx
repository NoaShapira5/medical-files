import { Box, Tab, Tabs, Button} from '@mui/material';
import { useState } from 'react';
import FirstTabEdit from './FirstTabEdit';
import SecondTabMedicalFile from '../SecondTabMedicalFile'
import ThirdTabMedicalFile from '../ThirdTabMedicalFile'
import { useDispatch } from 'react-redux';
import { back } from '../../../features/medicalFiles/medicalFilesSlice';
import { useNavigate } from 'react-router-dom';
import subLogo from '../../../logos/subLogo.png'

function EditMedicalFile() {
    const [tabIndex, setTabIndex] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleTabChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };

    const onBack = () => {
        dispatch(back())
        navigate('/medicalfiles-cats')
    }
  
    return (
        <Box>
            <Box sx={{display: 'flex'}}>
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ '& .MuiTabs-indicator': { backgroundColor: 'CadetBlue' },'& .Mui-selected': { color: 'CadetBlue' },}}>
                    <Tab label="פרטי תיק רפואי" />
                    <Tab label="פירוט מהלך רפואי" />
                    <Tab label="סיכום למשרד החקלאות" />
                </Tabs>
                <div className="image">
                    <img src={subLogo} alt='איגוד ערים גוש דן' className='sub-logo' />
                </div>
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
                    <SecondTabMedicalFile />
                </Box>
                )}
                {tabIndex === 2 && (
                <Box>
                    <ThirdTabMedicalFile />
                </Box>
                )}
            </Box>
        </Box>
    );
}

export default EditMedicalFile
