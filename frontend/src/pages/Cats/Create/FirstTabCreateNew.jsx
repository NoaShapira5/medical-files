import {TextField, Autocomplete, Button, Paper} from "@mui/material";
import { useState } from "react";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify'
import {createMedicalFile, editMedicalFile} from '../../../features/medicalFiles/medicalFilesSlice'
import Spinner from "../../../components/Spinner";
import { useEffect } from "react";
import CustomizedDialogs from '../../../components/Dialog';
import Images from '../../../components/Images';

function FirstTabCreateNew({setEdited}) {
    const {isLoading, medicalFile} = useSelector(state => state.medicalFiles)
    const {communities, diagnoses} = useSelector(state => state.management)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const phoneFormat = /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/
    const isPhoneValid = (phone) => phone.length === 0 || !(phone.length === 11) || !phone.includes('-') || !phone.startsWith(0) || !phoneFormat.test(phone)

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
        hospitalizationCageNum: 0,
        hospitalStartDate: null,
        hospitalEndDate: null,
        totalHospitalDays: 0,
        gender: '',
        neuteringStatus: '',
        age: '',
        color: '',
        images: [],
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
        surgical: ''

    })

    useEffect(() => {
        if(medicalFile) {
            setFormInput(medicalFile)
        }
    }, [medicalFile])

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
        for(const file of e.target.files) {
            if (file.size > 5000000) {
                toast.error('הקובץ גדול מדי')
            }
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
        dispatch(createMedicalFile(formInput)).unwrap().then(() => {
            toast.success('התיק הרפואי נוצר בהצלחה')
            
        })
        .catch(toast.error)
    }

    const handleSave = (e) => {
        e.preventDefault()
        setEdited(false)
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
                    onChange={(newValue) => {
                        setFormInput({...formInput, arrivalDate: newValue.toDate()})
                        setEdited(true)
                    }}
                    renderInput={(params) => <TextField {...params}             
                    id="date"
                    label="*תאריך הגעה"
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
                label="*כלוב מספר"
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
                label="*מספר פנייה"
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
                <Autocomplete 
                id="community"
                value={formInput.community}
                onChange={(e, newValue) => {
                    setFormInput({...formInput, community: newValue})
                    setEdited(true)
                }}
                options={[...communities.map(community => community.communityName), '']}
                renderInput={(params) => <TextField {...params} label="רשות מקומית" InputLabelProps={{shrink: true,}} variant="filled" />}
                />
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
                <Button
                onClick={() => setFormInput({...formInput, feederName: formInput.refName})}
                variant="containd"
                sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'},
                }}
                >
                    זהה לפונה
                </Button>
                <TextField
                id="phoneOne"
                error={isPhoneValid(formInput.phoneOne)}
                helperText={isPhoneValid(formInput.phoneOne) && 'שים לב לכתיבה בפורמט תקין xxx-xxxxxxx'}
                onChange={handleChange}
                value={formInput.phoneOne}
                label="טלפון 1"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="phoneTwo"
                error={isPhoneValid(formInput.phoneTwo)}
                helperText={isPhoneValid(formInput.phoneTwo) && 'שים לב לכתיבה בפורמט תקין xxx-xxxxxxx'}
                onChange={handleChange}
                value={formInput.phoneTwo}
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
                <Autocomplete 
                id="gender"
                value={formInput.gender}
                onChange={(e, newValue) => {
                    setFormInput({...formInput, gender: newValue})
                    setEdited(true)
                }}
                options={[...genders, '']}
                renderInput={(params) => <TextField {...params} label="מין" InputLabelProps={{shrink: true,}} variant="filled" />}
                />

                <Autocomplete 
                id="neuteringStatus"
                value={formInput.neuteringStatus}
                onChange={(e, newValue) => {
                    setFormInput({...formInput, neuteringStatus: newValue})
                    setEdited(true)
                }}
                options={['מעוקרת' ,'מסורס', 'לא מעוקרת/מסורס', '']}
                renderInput={(params) => <TextField {...params} label="מעוקרת/מסורס (לפי חיתוך אוזן)" InputLabelProps={{shrink: true,}} variant="filled" />}
                />

                <Autocomplete 
                id="age"
                value={formInput.age}
                onChange={(e, newValue) => {
                    setFormInput({...formInput, age: newValue})
                    setEdited(true)
                }}
                options={[...ages, '']}
                renderInput={(params) => <TextField {...params}  label="גיל" InputLabelProps={{shrink: true,}} variant="filled" />}
                />
            
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
                {medicalFile ? (                
                <CustomizedDialogs>
                    <Images images={medicalFile?.images} setFormInput={setFormInput} formInput={formInput} setEdited={setEdited}/>
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

                    <Autocomplete 
                    id="physicalCon"
                    value={formInput.physicalCon}
                    onChange={(e, newValue) => {
                        setFormInput({...formInput, physicalCon: newValue})
                        setEdited(true)
                    }}
                    options={['1','2','3','4','5', '']}
                    renderInput={(params) => <TextField {...params}  label="מצב גופני" InputLabelProps={{shrink: true,}} variant="filled" />}
                    />

                    <Autocomplete 
                    id="severityLev"
                    value={formInput.severityLev}
                    onChange={(e, newValue) => {
                        setFormInput({...formInput, severityLev: newValue})
                        setEdited(true)
                    }}
                    options={[...severityLevels, '']}
                    renderInput={(params) => <TextField {...params}  label="דרגת חומרה" InputLabelProps={{shrink: true,}} variant="filled" />}
                    />
                    
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

                    <Autocomplete 
                    id="mainDiagnosis"
                    value={formInput.mainDiagnosis}
                    onChange={(e, newValue) => {
                        setFormInput({...formInput, mainDiagnosis: newValue})
                        setEdited(true)
                    }}
                    options={[...diagnoses.map(diagnosis => diagnosis.diagnosisName), '']}
                    renderInput={(params) => <TextField {...params}  label="אבחנה ראשית" InputLabelProps={{shrink: true,}} variant="filled" />}
                    />

                    <Autocomplete 
                    id="secondaryDiagnosis"
                    value={formInput.secondaryDiagnosis}
                    onChange={(e, newValue) => {
                        setFormInput({...formInput, secondaryDiagnosis: newValue})
                        setEdited(true)
                    }}
                    options={[...diagnoses.map(diagnosis => diagnosis.diagnosisName), '']}
                    renderInput={(params) => <TextField {...params}  label="אבחנה משנית" InputLabelProps={{shrink: true,}} variant="filled" />}
                    />
                    
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

                <Autocomplete 
                id="releaseLocation"
                value={formInput.releaseLocation}
                onChange={(e, newValue) => {
                    setFormInput({...formInput, releaseLocation: newValue})
                    setEdited(true)
                }}
                options={['מקום הלכידה/איסוף','אימוץ', 'עמותה', 'אחר', '']}
                renderInput={(params) => <TextField {...params}  label="לאן שוחרר" InputLabelProps={{shrink: true,}} variant="filled" />}
                />

                <Autocomplete 
                id="death"
                value={formInput.death}
                onChange={(e, newValue) => {
                    setFormInput({...formInput, death: newValue})
                    setEdited(true)
                }}
                options={['מת', 'המתת חסד', 'חי', '']}
                renderInput={(params) => <TextField {...params}  label='מוות' InputLabelProps={{shrink: true,}} variant="filled" />}
                />
                  
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
        {medicalFile ? (
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

export default FirstTabCreateNew
