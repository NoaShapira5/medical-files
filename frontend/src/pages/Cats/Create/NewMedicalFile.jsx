import { Box, Tab, Tabs, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { getCommunities, getDiagnoses, getMedicines, getTreatments, getExaminations } from "../../../features/management/managementSlice";
import FirstTabCreateNew from './FirstTabCreateNew';
import SecondTabMedicalFile from '../SecondTabMedicalFile'
import ThirdTabMedicalFile from '../ThirdTabMedicalFile'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { back } from '../../../features/medicalFiles/medicalFilesSlice';
import subLogo from '../../../logos/subLogo.png'
import { getMedicalFileOperations } from "../../../features/operation/operationSlice"


function NewMedicalFile({edited, setEdited}) {
    const [counts, setCounts] = useState('')
    const [relevantExam, setRelevantExam] = useState('')
    const [relevantTreat, setRelevantTreat] = useState('')
    const [tabIndex, setTabIndex] = useState(0);
    const {treatments, examinations} = useSelector(state => state.management)
    const {operations} = useSelector(state => state.operation)
    const {medicalFile} = useSelector(state => state.medicalFiles)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const calcAmount = (item) => {
        if(item.examinationName) {
            return counts[item.examinationName] ? (counts[item.examinationName] <= item.range[1] ? counts[item.examinationName] : item.range[1]) : 0
        } else {
            return counts[item.treatmentName] ? (counts[item.treatmentName] <= item.range[1] ? counts[item.treatmentName] : item.range[1]) : 0
        }  
    }

    const calcTotalCount = () => {
        let totalCount = 0
        for(const examination of relevantExam) {
            totalCount += (calcAmount(examination) * examination.price)
        }
        for(const treatment of relevantTreat) {
            totalCount += (calcAmount(treatment) * treatment.price)
        }
        totalCount += (medicalFile.totalHospitalDays * 30) + (medicalFile.death === 'המתת חסד' ? 90 : 0)
        return totalCount
    }

    useEffect(() => {
        dispatch(getCommunities())
        dispatch(getDiagnoses())
        dispatch(getMedicines())
        dispatch(getTreatments())
        dispatch(getExaminations())

    }, [dispatch])

    useEffect(() => {
        if(medicalFile) {
          dispatch(getMedicalFileOperations(medicalFile._id))
        }
    }, [dispatch, medicalFile])

    useEffect(() => {
        const relOperations = operations.filter(operation => (operation.type === 'טיפול לדיווח ותשלום' || operation.type === 'בדיקה') && operation.financed)
        const contents = relOperations.map(relOperations => relOperations.content)
        const flatContents = contents.flat()
        setCounts(flatContents.reduce((accumulator, value) => {
        accumulator[value] = ++accumulator[value] || 1;
        return accumulator;
        }, {}))
        setRelevantTreat(treatments.filter(treatment => treatment.price !== undefined))
        setRelevantExam(examinations.filter(examination => examination.price !== undefined))
    }, [operations, treatments, examinations])



    const onBack = () => {
        if(edited) {
            if(window.confirm('האם אתה בטוח שאתה רוצה לעזוב את העמוד? השינוים לא ישמרו')) {
                setEdited(false)
                dispatch(back())
                navigate('/medicalfiles-cats')
            } 
        } else {
            dispatch(back())
            navigate('/medicalfiles-cats')
        }
    }

    const handleTabChange = (event, newTabIndex) => {
        if(edited) {
            if(window.confirm('האם אתה בטוח שאתה רוצה לעזוב את העמוד? השינוים לא ישמרו')) {
                setEdited(false)
                setTabIndex(newTabIndex);
            } 
        } else {
            setTabIndex(newTabIndex);
        }
    };
  
    return (
        <Box>
            <Box sx={{display: 'flex'}}>
                <Tabs
                value={tabIndex}
                onChange={handleTabChange} 
                TabIndicatorProps={{ sx: { display: 'none' } }}
                sx={{ '& .MuiTabs-indicator': { backgroundColor: 'CadetBlue' },'& .Mui-selected': { color: 'CadetBlue' },'& .MuiTabs-flexContainer': {flexWrap: 'wrap'},}}
                >
                    <Tab label="פרטי תיק רפואי" />
                    <Tab label="פירוט מהלך רפואי" />
                    <Tab label="סיכום למשרד החקלאות" />
                </Tabs>
                <div className="image">
                    <img src={subLogo} alt='איגוד ערים גוש דן' className='sub-logo' />
                </div>                
                <Button 
                variant="contained" 
                onClick={onBack}
                sx={{position: 'absolute', right: '50px',backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'},
                '@media (max-width: 1200px)': {marginTop: '60px'}}}
                >
                    חזרה
                </Button>
            </Box>
            <Box sx={{ padding: 2 }}>
                {tabIndex === 0 && (
                <Box>
                    
                    <FirstTabCreateNew setEdited={setEdited} calcTotalCount={calcTotalCount}/>
                    
                </Box>
                )}
                {tabIndex === 1 && (
                <Box>
                    <SecondTabMedicalFile />
                </Box>
                )}
                {tabIndex === 2 && (
                <Box>
                    <ThirdTabMedicalFile relevantExam={relevantExam} relevantTreat={relevantTreat} calcAmount={calcAmount} calcTotalCount={calcTotalCount}/>
                </Box>
                )}
            </Box>
        </Box>
    );
}

export default NewMedicalFile
