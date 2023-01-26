import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import FirstTabEdit from './FirstTabEdit';

function EditMedicalFile() {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };
  
    return (
        <Box>
            <Box>
                <Tabs value={tabIndex} onChange={handleTabChange} sx={{ '& .MuiTabs-indicator': { backgroundColor: 'CadetBlue' },'& .Mui-selected': { color: 'CadetBlue' },}}>
                    <Tab label="פרטי תיק רפואי" />
                    <Tab label="פירוט מהלך רפואי" />
                    <Tab label="סיכום למשרד החקלאות" />
                </Tabs>
            </Box>
            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                <Box>
                    
                    <FirstTabEdit />
                    
                </Box>
                )}
                {tabIndex === 1 && (
                <Box>
                    <Typography>The second tab</Typography>
                </Box>
                )}
                {tabIndex === 2 && (
                <Box>
                    <Typography>The third tab</Typography>
                </Box>
                )}
            </Box>
        </Box>
    );
}

export default EditMedicalFile
