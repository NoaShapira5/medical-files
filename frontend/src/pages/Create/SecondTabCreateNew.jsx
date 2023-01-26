import { Box, Paper, Table, TableContainer, TableHead, TableRow, TableCell, Button, TextField, MenuItem, TableBody, FormLabel } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import dayjs from "dayjs"
import { useSelector, useDispatch } from "react-redux"
import { createMedicalFileOperation, getMedicalFileOperations } from "../../features/operation/operationSlice"
import {getMedicines, getTreatments, getExaminations} from '../../features/managment/managmentSlice'
import {toast} from 'react-toastify'
import { useEffect } from "react"
import {RadioGroup, FormControlLabel, Radio, FormControl} from "@mui/material"

function SecondTabCreateNew() {

    const {user} = useSelector(state => state.auth)
    const {medicalFile} = useSelector(state => state.medicalFiles)
    const {operation, operations} = useSelector(state => state.operation)
    const {medicines, treatments, examinations} = useSelector(state => state.managment)

    const dispatch = useDispatch()

    useEffect(() => {
        if(medicalFile) {
            dispatch(getMedicalFileOperations(medicalFile._id))
            dispatch(getMedicines())
            dispatch(getTreatments())
            dispatch(getExaminations())

        }
        
    }, [dispatch, medicalFile, operation])

    const [fileName, setFileName] = useState('')
    const [formInput, setFormInput] = useState({
        dateTime: dayjs().toDate(),
        type: '',
        content: '',
        active: '',
        print: true,
        comments: '',
        file: '',
        userName: user.name,
        fileId: medicalFile?._id
    })

    const handleFileUpload = (e) => {
        if (!e.target.files) {
          return;
        }
        const {name} = e.target.files[0]
        setFileName(name)
        setFormInput({
            ...formInput,
           file: e.target.files[0]})
    };

    const handleChange = (e) => {
        setFormInput({
            ...formInput,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createMedicalFileOperation(formInput)).unwrap().then(() => {
            toast.success('הרשומה נוצרה בהצלחה')
        })
        .catch(toast.error)
    }

    const types = ['טיפול', 'תרופה', 'בדיקה', 'הנחיות', 'הערות']

    const headCells = [
        {
            id: 'dateTime',
            label: 'תאריך ושעה'
        },
        {
            id: 'type',
            label: 'סוג'
        },
        {
            id: 'content',
            label: 'תוכן'
        },
        {
            id: 'file',
            label: 'קובץ מצורף'
        },
        {
            id: 'userName',
            label: 'שם'
        }
    ]
    if(!medicalFile) {
        toast.error('עליך ליצור קודם תיק רפואי')
        return 
    }
  return (
    <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map(headCell => (
                            <TableCell 
                            key={headCell.id}
                            align="center">
                                {headCell.label}
                            </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {operations.length > 0 && operations.map(row => (
                            <TableRow
                            hover
                            key={row._id}
                            >
                                <TableCell align="center">{new Date(row.dateTime).toLocaleString('he-IL')}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.content}</TableCell>
                                <TableCell align="center">
                                    <a href={row.file}>{row.file[0].split('/')[4]}</a>
                                </TableCell>
                                <TableCell align="center">{row.userName}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>

        <Paper
        dir="rtl"
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                    inputFormat="DD/MM/YYYY HH:mm"
                    value={formInput.dateTime}
                    onChange={(newValue) => setFormInput({...formInput, dateTime: newValue.toDate()})}
                    renderInput={(params) => <TextField {...params}             
                    id="dateTime"
                    label="תאריך ושעה"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }} />}
                    >

                    </DateTimePicker>
                </LocalizationProvider>

                <TextField
                id="type"
                onChange={e => setFormInput({...formInput, type: e.target.value, content: ''})}
                value={formInput.type}
                label="סוג"
                select
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {types.map(type => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>

                {formInput.type === 'טיפול' && (
                <>
                    <TextField
                    id="content"
                    onChange={e => setFormInput({...formInput, content: e.target.value})}
                    value={formInput.content}
                    label="טיפול"
                    select
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    >
                        {treatments.map(treatment => (
                        <MenuItem key={treatment._id} value={treatment.treatmentName}>
                            {treatment.treatmentName}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                    id="comments"
                    onChange={handleChange}
                    value={formInput.comments}
                    label="הערות"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </>
                )}
                {formInput.type === 'תרופה' && (
                <>
                    <TextField
                    id="content"
                    onChange={e => setFormInput({...formInput, content: e.target.value})}
                    value={formInput.content}
                    label="תרופה"
                    select
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    >
                        {medicines.map(medicine => (
                        <MenuItem key={medicine._id} value={medicine.medicineName}>
                            {medicine.medicineName}
                        </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                    id="comments"
                    onChange={handleChange}
                    value={formInput.comments}
                    label="הערות"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
            </>
            )}

            {formInput.type === 'בדיקה' && (
            <>
                <TextField
                id="content"
                onChange={e => setFormInput({...formInput, content: e.target.value})}
                value={formInput.content}
                label="בדיקה"
                select
                variant="filled"
                InputLabelProps={{
                    shrink: true,
                }}
                >
                    {examinations.map(examination => (
                    <MenuItem key={examination._id} value={examination.examinationName}>
                        {examination.examinationName}
                    </MenuItem>
                    ))}
                </TextField>
                <TextField
                id="comments"
                onChange={handleChange}
                value={formInput.comments}
                label="הערות"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </>                    
                )}
                {formInput.type === 'הנחיות' && (
                <>
                <TextField
                id="content"
                onChange={handleChange}
                value={formInput.content}
                label="הנחיות"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <FormControl sx={{marginLeft: '20px', marginRight: '20px'}}>
                    <FormLabel>הנחיה פעילה:</FormLabel>
                    <RadioGroup row id='active' onChange={(e) => setFormInput({...formInput, active: e.target.value})} value={formInput.active}>
                        <FormControlLabel  value={true} control={<Radio />} label="כן"/>
                        <FormControlLabel id='active' value={false} control={<Radio />} label="לא"/>
                    </RadioGroup>
                </FormControl>
                <FormControl sx={{marginLeft: '20px', marginRight: '20px'}}>
                    <FormLabel>להדפסה:</FormLabel>
                    <RadioGroup row id='print' onChange={(e) => setFormInput({...formInput, print: e.target.value})} value={formInput.print}> 
                        <FormControlLabel value={true} control={<Radio />} label="כן"  />
                        <FormControlLabel value={false} control={<Radio />} label="לא" />
                    </RadioGroup>
                </FormControl>
                </>
                )}
                {formInput.type === 'הערות' && (
                <TextField
                id="content"
                onChange={handleChange}
                value={formInput.content}
                label="הערות"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                )}

                <TextField
                id="userName"
                onChange={handleChange}
                value={formInput.userName}
                label="משתמש"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                    
                    <Button
                    component="label"
                    variant="filled"
                    startIcon={<FileUploadIcon />}
                    sx={{ marginRight: "1rem" , backgroundColor: '#D3D3D3', position: 'relative', top: '18px'}}
                    >   
                        העלאת קובץ
                        <input type="file" max='1' accept='.jpg,.png,.jpeg,.pdf,.xlsx,.docx' hidden onChange={handleFileUpload} />
                    </Button>
                    <span style={{position: 'relative', top: '18px'}}>{fileName}</span>
                    <Button 
                    variant="contained"
                    sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
                    onClick={handleSubmit}>
                        הוסף רשומה
                    </Button>
        </Paper>
    </Box>
  )
}

export default SecondTabCreateNew
