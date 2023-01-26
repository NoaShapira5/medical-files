import {TextField} from "@mui/material";
import { useState } from "react";
import {Button, Paper, MenuItem} from "@mui/material";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-toastify'
import {createMedicalFile} from '../../features/medicalFiles/medicalFilesSlice'
import Spinner from "../../components/Spinner";

function FirstTabCreateNew() {
    const {isLoading} = useSelector(state => state.medicalFiles)
    const dispatch = useDispatch()

    const communities = ['אפיקים', 'אמירים', 'ערוגות']
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
        releaseLocation: ''

    })

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
        dispatch(createMedicalFile(formInput)).unwrap().then(() => {
            toast.success('התיק הרפואי נוצר בהצלחה')
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
                label="ישוב"
                select
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {communities.map(community => (
                        <MenuItem key={community} value={community}>
                            {community}
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
                onChange={handleChange}
                value={formInput.age}
                label="גיל"
                type="number"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
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
                type='number'
                onChange={e => setFormInput({...formInput, severityLev: e.target.value})}
                value={formInput.severityLev}
                variant="filled"
                sx={{ width: 220 }}
                InputProps={{ inputProps: { min: 1, max: 5 } }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <TextField
                id="medicalProb"
                onChange={handleChange}
                value={formInput.medicalProb}
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
                onChange={handleChange}
                value={formInput.mainDiagnosis}
                label="אבחנה ראשית"
                type="text"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                                <TextField
                id="secondaryDiagnosis"
                onChange={handleChange}
                value={formInput.secondaryDiagnosis}
                label="אבחנה משנית"
                type="text"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
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
                    onChange={(newValue) => setFormInput({...formInput, hospitalEndDate: newValue.toDate()})}
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
                type="text"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </div>

        </div>
        <Button 
        onClick={handleSubmit}
        variant='contained'
        sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
        יצירת תיק רפואי חדש</Button>
      </Paper>
    );
}

export default FirstTabCreateNew
