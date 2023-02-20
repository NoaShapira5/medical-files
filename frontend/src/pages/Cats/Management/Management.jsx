import { Box, Tab, Tabs, Button} from '@mui/material';
import { useState } from 'react';
import ManagementFirstTab from './ManagementFirstTab'
import ManagementSecondTab from './ManagementSecondTab';
import ManagementThirdTab from './ManagementThirdTab';
import ManagementFourthTab from './ManagementFourthTab';
import ManagementFifthTab from './ManagementFifthTab'
import { back } from '../../../features/medicalFiles/medicalFilesSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import subLogo from '../../../logos/subLogo.png'

function Management() {
    const [tabIndex, setTabIndex] = useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onBack = () => {
        dispatch(back())
        navigate('/medicalfiles-cats')
    }

    const handleTabChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };
  
    return (
        <Box>
            <Box sx={{display: 'flex'}}>
                <Tabs 
                value={tabIndex} 
                onChange={handleTabChange} 
                TabIndicatorProps={{ sx: { display: 'none' } }}
                sx={{ '& .MuiTabs-indicator': { backgroundColor: 'CadetBlue' },'& .Mui-selected': { color: 'CadetBlue' },'& .MuiTabs-flexContainer': {flexWrap: 'wrap'},}}                >
                    <Tab label="טיפולים לדיווח ותשלום" />
                    <Tab label="טיפולים ותרופות" />
                    <Tab label="בדיקות" />
                    <Tab label="רשות מקומית" />
                    <Tab label="אבחנות" />
                </Tabs>
                <div className="image">
                    <img src={subLogo} alt='איגוד ערים גוש דן' className='sub-logo' />
                </div>                
                <Button variant="contained" onClick={onBack}
                sx={{position: 'absolute', right: '50px',backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'},
                '@media (max-width: 1200px)': {marginTop: '60px'}}}
                >
                    חזרה
                </Button>
            </Box>
            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                <Box>
                    
                    <ManagementFirstTab />
                    
                </Box>
                )}
                {tabIndex === 1 && (
                <Box>
                    <ManagementSecondTab />
                </Box>
                )}
                {tabIndex === 2 && (
                <Box>
                    <ManagementThirdTab />
                </Box>
                )}
                {tabIndex === 3 && (
                <Box>
                    <ManagementFourthTab />
                </Box>
                )}
                {tabIndex === 4 && (
                <Box>
                    <ManagementFifthTab />
                </Box>
                )}
            </Box>
        </Box>
    );
}

export default Management
