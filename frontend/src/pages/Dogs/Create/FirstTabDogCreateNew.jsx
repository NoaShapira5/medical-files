import {TextField} from "@mui/material";
import { useState } from "react";
import {Button, Paper, MenuItem} from "@mui/material";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify'
import { createDogMedicalFile, editDogMedicalFile } from "../../../features/dogMedicalFiles/dogsMedicalFilesSlice";
import Spinner from "../../../components/Spinner";
import { useEffect } from "react";
import { getCommunities, getDiagnoses } from "../../../features/management/managementSlice";
import CustomizedDialogs from '../../../components/Dialog';
import Images from '../../../components/Images';

function FirstTabDogCreateNew({setEdited}) {
    const {isLoading, dogMedicalFile} = useSelector(state => state.dogMedicalFiles)
    const {communities, diagnoses} = useSelector(state => state.management)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const severityLevels = ['קל', 'בינוני', 'קשה', 'אנוש']
    const ages = ['גור (עד 6 חודשים)', 'צעיר (6-18 חודשים)', 'בוגר ( 1.5 -8 שנים)', 'מבוגר (מעל 8 שנים)']
    const genders = ['נקבה' ,'זכר']
    const [numOfFiles, setNumOfFiles] = useState(0)
    const [formInput, setFormInput] = useState({
        arrivalDate: null,
        refNum: '',
        refName: '',
        refDesc: '',
        trappingAd: '',
        community: '',
        hospitalizationCageNum: 0,
        hospitalStartDate: null,
        hospitalEndDate: null,
        totalHospitalDays: 0,
        dogName: '',
        chipNumber: '',
        breed: '',
        gender: '',
        neuteringStatus: '',
        age: '',
        color: '',
        images: [],
        history: '',
        physicalCon: 0,
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
        surgical: ''

    })

    useEffect(() => {
        dispatch(getCommunities())
        dispatch(getDiagnoses())
        if(dogMedicalFile) {
            setFormInput(dogMedicalFile)
        }
    }, [dogMedicalFile, dispatch])

    const getTotalDays = (date1, date2) => {
        if(!date1 || !date2) {
            return 0
        }
        // To calculate the time difference of two dates
        const Difference_In_Time = date2.getTime() - date1.getTime();
      
        // To calculate the no. of days between two dates
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days
    }

    const handleChange = (e) => {
        setEdited(true)
        setFormInput({
            ...formInput,
            [e.target.id]: e.target.value
        })
    }

    const handleFileUpload = (e) => {
        setEdited(true)
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
        setEdited(false)
        if(numOfFiles > 3) {
            toast.error('ניתן להעלות מקסימום 3 תמונות')
            return
        }
        dispatch(createDogMedicalFile(formInput)).unwrap().then(() => {
            toast.success('התיק הרפואי נוצר בהצלחה')
            
        })
        .catch(toast.error)
    }

    const handleSave = (e) => {
        e.preventDefault()
        setEdited(false)
        dispatch(editDogMedicalFile(formInput)).unwrap().then(() => {
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
                    onChange={(newValue) => {
                        setFormInput({...formInput, arrivalDate: newValue.toDate()})
                        setEdited(true)
                    }}
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
                onChange={e => {
                    setFormInput({...formInput, community: e.target.value})
                    setEdited(true)
                }}
                value={formInput.community}
                label="רשות מקומית"
                select
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {communities.map(community => (
                        <MenuItem key={community.communityName} value={community.communityName}>
                            {community.communityName}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="form-column">
                <h2>פרטי הכלב</h2>
                <TextField
                id="dogName"
                onChange={handleChange}
                value={formInput.dogName}
                label="שם הכלב"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="chipNumber"
                onChange={handleChange}
                value={formInput.chipNumber}
                label="מספר שבב"
                type="number"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="breed"
                onChange={handleChange}
                value={formInput.breed}
                label="גזע"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />

                <TextField
                id="gender"
                label="מין"
                select
                variant="filled"
                onChange={e => {
                    setFormInput({...formInput, gender: e.target.value})
                    setEdited(true)
                }}
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
                onChange={e => {
                    setFormInput({...formInput, neuteringStatus: e.target.value})
                    setEdited(true)
                }}
                value={formInput.neuteringStatus}
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {['מעוקרת' ,'מסורס', 'לא מעוקרת/מסורס'].map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                id="age"
                onChange={e => {
                    setFormInput({...formInput, age: e.target.value})
                    setEdited(true)
                }}
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
                {dogMedicalFile ? (                
                <CustomizedDialogs>
                    <Images images={dogMedicalFile?.images} setFormInput={setFormInput} formInput={formInput} setEdited={setEdited}/>
                </CustomizedDialogs>
                ) : (
                <div className="formImages">
                    <label className='formLabel' style={{textAlign: 'center'}}>תמונות</label>
                    <p style={{textAlign: 'center'}}>
                         מקסימום שלוש תמונות
                    </p>    
                    <input 
                    className='formInputFile'
                    type='file'
                    id='images'
                    name='images'
                    onChange={handleFileUpload}
                    max='3'
                    accept='.jpg,.png,.jpeg'
                    multiple
                    />
                </div>
                )}

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
                    onChange={e => {
                        setFormInput({...formInput, severityLev: e.target.value})
                        setEdited(true)
                    }}
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
                    onChange={e => {
                        setFormInput({...formInput, mainDiagnosis: e.target.value})
                        setEdited(true)
                    }}
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
                            <MenuItem key={diagnosis._id} value={diagnosis.diagnosisName}>
                                {diagnosis.diagnosisName}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                    <TextField
                    id="secondaryDiagnosis"
                    onChange={e => {
                        setFormInput({...formInput, secondaryDiagnosis: e.target.value})
                        setEdited(true)
                    }}
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
                        onChange={(newValue) => {
                            setFormInput({...formInput, hospitalStartDate: newValue.toDate()})
                            setEdited(true)
                        }}
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
                        onChange={(newValue) => {
                            setFormInput({...formInput, hospitalEndDate: newValue.toDate(), totalHospitalDays: getTotalDays(formInput.hospitalStartDate, newValue.toDate())})
                            setEdited(true)
                        }}
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
                    onChange={(newValue) => {
                        setFormInput({...formInput, neuteringDate: newValue.toDate()})
                        setEdited(true)
                    }}
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
                    onChange={(newValue) => {
                        setFormInput({...formInput, releaseDate: newValue.toDate()})
                        setEdited(true)
                    }}
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
                onChange={e => {
                    setFormInput({...formInput, death: e.target.value})
                    setEdited(true)
                }}
                value={formInput.death}
                select
                label='מוות'
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {['מת', 'המתת חסד', 'חי'].map(option => (
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
            </div>
        </div>
        {dogMedicalFile ? (
            <div className="btn" style={{position: 'relative'}}>
                <Button 
                onClick={handleSave}
                variant='contained'
                sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'},
                '@media (min-width: 800px)': { position: 'absolute', bottom: '8px', right: '16px'}}}
                >                
                שמירת שינוים</Button>
             </div>
        ) : (
            <div className="btn" style={{position: 'relative'}}>
                <Button 
                onClick={handleSubmit}
                variant='contained'
                sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'},
                '@media (min-width: 800px)': { position: 'absolute', bottom: '8px', right: '16px'}}}
                >
                יצירת תיק רפואי חדש</Button>
            </div>

        )}
      </Paper>
    );
}

export default FirstTabDogCreateNew
