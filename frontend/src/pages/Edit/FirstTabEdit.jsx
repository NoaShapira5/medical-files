import {TextField} from "@mui/material";
import { useState } from "react";
import {Button, Paper, MenuItem} from "@mui/material";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify'
import {editMedicalFile, getMedicalFile} from '../../features/medicalFiles/medicalFilesSlice'
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDiagnoses, getCommunities } from "../../features/management/managementSlice";

function FirstTabEdit() {
    const {isLoading, medicalFile} = useSelector(state => state.medicalFiles)
    const {communities, diagnoses} = useSelector(state => state.management)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const {medicalFileId} = useParams()

    const severityLevels = ['קל', 'בינוני', 'קשה', 'אנוש']
    const ages = ['גור (עד 6 חודשים)', 'צעיר (6-18 חודשים)', 'בוגר ( 1.5 -8 שנים)', 'מבוגר (מעל 8 שנים)']
    const genders = ['נקבה' ,'זכר']

    const [numOfFiles, setNumOfFiles] = useState(0)
    const [formInput, setFormInput] = useState({
        arrivalDate: null,
        cageNum: '',
        refNum: '',
        refName: '',
        refDesc: '',
        trappingAd: '',
        community: '',
        feederName: '',
        phoneOne: '',
        phoneTwo: '',
        hospitalizationCageNum: '',
        hospitalStartDate: null,
        hospitalEndDate: null,
        totalHospitalDays: '',
        gender: '',
        neuteringStatus: '',
        age: '',
        color: '',
        images: {},
        history: '',
        physicalCon: '',
        severityLev: '',
        medicalProb: '',
        mainDiagnosis: '',
        secondaryDiagnosis: '',
        neuteringDate: null,
        releaseDate: null,
        releaseLocation: '',
        death: '',
        userName: user.name,
        examinations: '',
        imaging: '',
        nonSurgical: '',
        surgical: '',
        medicalFile: '',
        createdAt: ''

    })

    useEffect(() => {
      dispatch(getMedicalFile(medicalFileId))
    }, [medicalFileId, dispatch])

    useEffect(() => {
        dispatch(getCommunities())
        dispatch(getDiagnoses())
        if(medicalFile) {
          setFormInput(medicalFile)
        }
      }, [medicalFile, dispatch])

    const getTotalDays = (date1, date2) => {
        // To calculate the time difference of two dates
        const Difference_In_Time = date2.getTime() - date1.getTime();
      
        // To calculate the no. of days between two dates
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days
    }

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.id]: e.target.value
        })
    }

    const handleFileUpload = (e) => {
        if (!e.target.files) {
          return;
        }
        setNumOfFiles(e.target.files.length)
        setFormInput({
            ...formInput,
           images: e.target.files})
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        if(numOfFiles > 3) {
            toast.error('ניתן להעלות מקסימום 3 תמונות')
            return
        }
        dispatch(editMedicalFile(formInput)).unwrap().then(() => {
            toast.success('התיק הרפואי התעדכן בהצלחה')
        })
        .catch(toast.error)
    }
    
    if(isLoading) {
        return <Spinner />
    }

    return (
      <Paper
      dir="rtl"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
        <div className="columns">
            <div className="form-column">
                <h2>פרטי האירוע</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    inputFormat="DD/MM/YYYY"
                    value={formInput.arrivalDate}
                    onChange={(newValue) => setFormInput({...formInput, arrivalDate: newValue.toDate()})}
                    renderInput={(params) => <TextField {...params}             
                    id="date"
                    label="תאריך הגעה"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }} />}
                    >

                    </DatePicker>
                </LocalizationProvider>
                <TextField
                id="cageNum"
                onChange={handleChange}
                value={formInput.cageNum}
                label="כלוב מספר"
                type="number"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="refNum"
                onChange={handleChange}
                value={formInput.refNum}
                label="מספר פנייה"
                type="number"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="refName"
                onChange={handleChange}
                value={formInput.refName}
                label="שם הפונה"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="refDesc"
                onChange={handleChange}
                value={formInput.refDesc}
                multiline
                label="תלונת הפונה"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="trappingAd"
                onChange={handleChange}
                value={formInput.trappingAd}
                label="כתובת לכידה"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="community"
                onChange={e => setFormInput({...formInput, community: e.target.value})}
                value={formInput.community}
                label="מועצה אזורית"
                select
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {communities.map(community => (
                        <MenuItem key={community._id} value={community.communityName}>
                            {community.communityName}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                id="feederName"
                onChange={handleChange}
                value={formInput.feederName}
                label="שם המאכיל"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="phoneOne"
                onChange={handleChange}
                value={formInput.phoneOne}
                type='tel'
                label="טלפון 1"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="phoneTwo"
                onChange={handleChange}
                value={formInput.phoneTwo}
                type='tel'
                label="טלפון 2"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </div>
            <div className="form-column">
                <h2>פרטי החתול</h2>

                <TextField
                id="gender"
                label="מין"
                select
                variant="filled"
                onChange={e => setFormInput({...formInput, gender: e.target.value})}
                value={formInput.gender}
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {genders.map(gender => (
                        <MenuItem key={gender} value={gender}>
                            {gender}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                id="neuteringStatus"
                label="מעוקרת/מסורס (לפי חיתוך אוזן)"
                select
                onChange={e => setFormInput({...formInput, neuteringStatus: e.target.value})}
                value={formInput.neuteringStatus}
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {['לא' ,'כן'].map(option => (
                    <MenuItem key={option} value={option === 'כן'? true : false}>
                        {option}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                id="age"
                onChange={e => setFormInput({...formInput, age: e.target.value})}
                value={formInput.age}
                label="גיל"
                select
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {ages.map(age => (
                        <MenuItem key={age} value={age}>
                            {age}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                id="color"
                onChange={handleChange}
                value={formInput.color}
                label="צבע"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <div style={{display: 'flex'}}>
                    <Button
                    component="label"
                    variant="filled"
                    startIcon={<FileUploadIcon />}
                    sx={{ marginRight: "1rem" , backgroundColor: '#D3D3D3'}}
                    >   
                        העלאת תמונות
                        <input type="file" max='3' accept='.jpg,.png,.jpeg' multiple hidden onChange={handleFileUpload} />
                    </Button>
                    <span>נבחרו {numOfFiles} תמונות</span>
                </div>
            </div>
            <div className="form-column">
                <h2>מצב רפואי</h2>

                <TextField
                id="history"
                onChange={handleChange}
                value={formInput.history}
                label="היסטוריה"
                type="text"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="physicalCon"
                label="מצב גופני"
                type='number'
                variant="filled"
                onChange={handleChange}
                value={formInput.physicalCon}
                sx={{ width: 220 }}
                InputProps={{ inputProps: { min: 1, max: 5 } }}
                InputLabelProps={{
                    shrink: true,
                }}
                />

                <TextField
                id="severityLev"
                label="דרגת חומרה"
                onChange={e => setFormInput({...formInput, severityLev: e.target.value})}
                value={formInput.severityLev}
                select
                variant="filled"
                sx={{ width: 220 }}
                InputProps={{ inputProps: { min: 1, max: 5 } }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {severityLevels.map(level => (
                        <MenuItem key={level} value={level}>
                            {level}
                        </MenuItem>
                    ))}
                    
                </TextField>
                <TextField
                id="medicalProb"
                onChange={handleChange}
                value={formInput.medicalProb}
                multiline
                label="בעיה רפואית"
                type="text"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="mainDiagnosis"
                onChange={e => setFormInput({...formInput, mainDiagnosis: e.target.value})}
                value={formInput.mainDiagnosis}
                select
                label="אבחנה ראשית"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {diagnoses.map(diagnosis => (
                        <MenuItem key={diagnosis.diagnosisName} value={diagnosis.diagnosisName}>
                            {diagnosis.diagnosisName}
                        </MenuItem>
                    ))}
                </TextField>
                
                <TextField
                id="secondaryDiagnosis"
                onChange={e => setFormInput({...formInput, secondaryDiagnosis: e.target.value})}
                value={formInput.secondaryDiagnosis}
                select
                label="אבחנה משנית"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {diagnoses.map(diagnosis => (
                        <MenuItem key={diagnosis._id} value={diagnosis.diagnosisName}>
                            {diagnosis.diagnosisName}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-column">
                <h2>אשפוז</h2>

                <TextField
                id="hospitalizationCageNum"
                onChange={handleChange}
                value={formInput.hospitalizationCageNum}
                type='number'
                label="כלוב אשפוז מספר"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    inputFormat="DD/MM/YYYY"
                    value={formInput.hospitalStartDate}
                    onChange={(newValue) => setFormInput({...formInput, hospitalStartDate: newValue.toDate()})}
                    renderInput={(params) => <TextField {...params}             
                    id="hospitalStartDate"
                    label="תאריך התחלה"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }} />}
                    >
                    </DatePicker>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    inputFormat="DD/MM/YYYY"
                    value={formInput.hospitalEndDate}
                    onChange={(newValue) => setFormInput({...formInput, hospitalEndDate: newValue.toDate(), totalHospitalDays: getTotalDays(formInput.hospitalStartDate, newValue.toDate())})}
                    renderInput={(params) => <TextField {...params}             
                    id="hospitalEndDate"
                    label="תאריך סיום"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }} />}
                    >
                    </DatePicker>
                </LocalizationProvider>
                <TextField
                id="totalHospitalDays"
                onChange={handleChange}
                value={formInput.totalHospitalDays}
                type='number'
                label="סך הכל ימי אשפוז"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </div>
            
            
            <div className="form-column">
                <h2>לאחר טיפול</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    inputFormat="DD/MM/YYYY"
                    value={formInput.neuteringDate}
                    onChange={(newValue) => setFormInput({...formInput, neuteringDate: newValue.toDate()})}
                    renderInput={(params) => <TextField {...params}             
                    id="neuteringDate"
                    label="תאריך עיקור/סירוס"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }} />}
                    >
                    </DatePicker>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    inputFormat="DD/MM/YYYY"
                    value={formInput.releaseDate}
                    onChange={(newValue) => setFormInput({...formInput, releaseDate: newValue.toDate()})}
                    renderInput={(params) => <TextField {...params}             
                    id="releaseDate"
                    label="תאריך שחרור"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }} />}
                    >
                    </DatePicker>
                </LocalizationProvider>
                <TextField
                id="releaseLocation"
                onChange={handleChange}
                value={formInput.releaseLocation}
                label="לאן שוחרר"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="death"
                onChange={e => setFormInput({...formInput, death: e.target.value})}
                value={formInput.death}
                select
                label='מוות'
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {['מת', 'המתת חסד'].map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                    ))}   
                </TextField>
                
                
            </div>
            
            <div className="form-column">
                <h2>טיפולים ובדיקות</h2>

                <TextField
                id="examinations"
                onChange={handleChange}
                value={formInput.examinations}
                multiline
                label="בדיקות דם/שתן/צואה/ציטולוגיה"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="imaging"
                label="הדמייה"
                variant="filled"
                onChange={handleChange}
                value={formInput.imaging}
                multiline
                sx={{ width: 220 }}
                InputProps={{ inputProps: { min: 1, max: 5 } }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="nonSurgical"
                onChange={handleChange}
                value={formInput.nonSurgical}
                multiline
                label="טיפולים שאינם כירורגיים"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="surgical"
                onChange={handleChange}
                value={formInput.surgical}
                multiline
                label="טיפולים כירורגיים"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <h2>מידע משרדי</h2>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker 
                    inputFormat="DD/MM/YYYY"
                    value={formInput.createdAt}
                    onChange={(newValue) => setFormInput({...formInput, releaseDate: newValue.toDate()})}
                    renderInput={(params) => <TextField {...params}             
                    id="createdAt"
                    label="תאריך יצירת הרשומה"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }} />}
                    >
                    </DatePicker>
                </LocalizationProvider>

                <TextField
                id="userName"
                value={formInput.userName}
                label="משתמש שיצר את הרשומה"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                  readOnly: true,
                }}
                />
            </div>
        </div>
        <div className="btn">
            <Button 
            onClick={handleSubmit}
            variant='contained'
            sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
            שמירת שינוים</Button>
        </div>
      </Paper>
    );
}

export default FirstTabEdit
