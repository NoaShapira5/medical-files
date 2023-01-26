import { Box, Tab, Tabs} from '@mui/material';
import { useState } from 'react';
import ManagementFirstTab from './ManagementFirstTab';
import ManagementSecondTab from './ManagementSecondTab';
import ManagementThirdTab from './ManagementThirdTab';

function Management() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };
  
    return (
        <Box>
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ '& .MuiTabs-indicator': { backgroundColor: 'CadetBlue' },'& .Mui-selected': { color: 'CadetBlue' },}}>
                    <Tab label="טיפולים" />
                    <Tab label="תרופות" />
                    <Tab label="בדיקות" />
                </Tabs>
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
            </Box>
        </Box>
    );
}

export default Management
