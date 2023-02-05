import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper, Button, TextField, MenuItem, FormLabel, Tooltip, IconButton, InputLabel, Select, Checkbox } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid'
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@mui/private-theming';
import CustomToolBar from "../../components/CustomToolBar";
import { heIL } from '@mui/x-data-grid';
import { heIL as coreHeIl } from '@mui/material/locale';
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useState } from "react"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import dayjs from "dayjs"
import { useSelector, useDispatch } from "react-redux"
import { createMedicalFileOperation, deleteOperation, getMedicalFileOperations, editOperation } from "../../features/operation/operationSlice"
import {getMedicines, getTreatments, getExaminations} from '../../features/management/managementSlice'
import {toast} from 'react-toastify'
import { useEffect } from "react"
import {RadioGroup, FormControlLabel, Radio, FormControl} from "@mui/material"
import Spinner from '../../components/Spinner'
import ListItemText from '@mui/material/ListItemText';



const theme = createTheme(
    {
      palette: {
        primary: { main: '#5f9ea0' },
      },
    },
    heIL, // x-data-grid translations
    coreHeIl, // core translations
  );
  

function SecondTabMedicalFile() {

    const {user} = useSelector(state => state.auth)
    const {medicalFile} = useSelector(state => state.medicalFiles)
    const {operations, isLoading} = useSelector(state => state.operation)
    const {medicines, treatments, examinations} = useSelector(state => state.management)

    const dispatch = useDispatch()

    useEffect(() => {
        if(medicalFile) {
            dispatch(getMedicalFileOperations(medicalFile._id))
            dispatch(getMedicines())
            dispatch(getTreatments())
            dispatch(getExaminations())
        }
        
    }, [dispatch, medicalFile])

    const [edit, setEdit] = useState(false)
    const [selected, setSelected] = useState([]);
    const [contents, setContents] = useState([])
    const [fileName, setFileName] = useState('')
    const initialState = {
        dateTime: dayjs().toDate(),
        type: '',
        content: [],
        active: '',
        print: true,
        comments: '',
        file: '',
        userName: user.name,
        fileId: medicalFile?._id
    }
    const [formInput, setFormInput] = useState(initialState)

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

    const handleMultipleChange = (event) => {
        const {
            target: { value },
          } = event;
          setContents(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
          );
      };

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createMedicalFileOperation({...formInput, content: contents.length > 0 ? contents : [formInput.content]})).unwrap().then(() => {
            setFormInput(initialState)
            setContents([])
            toast.success('הרשומה נוצרה בהצלחה')
        })
        .catch(toast.error)
    }

    const handleSave = (e) => {
        e.preventDefault()
        dispatch(editOperation({...formInput, content: contents.length > 0 ? contents : [formInput.content]})).unwrap().then(() => {
            setEdit(false)
            setSelected([])
            setFormInput(initialState)
            setContents([])
            toast.success('הרשומה התעדכנה בהצלחה')
        })
        .catch(toast.error)
    }

    const onDelete = (operationIds) => {
        if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
          dispatch(deleteOperation(operationIds)).unwrap().then(() => {
            toast.success('המחיקה בוצעה בהצלחה')
            setSelected([])
          })
          .catch(toast.error)      
      }
    }

    const onEdit = (operationIds) => {
        setEdit(true)
         setSelected([])
        const operation = operations.filter(operation => operation._id === operationIds[0])
        setFormInput({...operation[0], active: '', comment: ''})
        setContents(operation[0].content)
    }

    const types = ['טיפול', 'תרופה', 'בדיקה', 'הנחיות', 'הערות']

    const headCells = [
        {
            field: 'dateTime',
            headerName: 'תאריך ושעה',
            valueFormatter: (cellValues) => new Date(cellValues?.value).toLocaleString('he-IL'),
            width: 310
        },
        {
            field: 'type',
            headerName: 'סוג',
            width: 310,

        },
        {
            field: 'content',
            headerName: 'תוכן',
            width: 310,

        },
        {
            field: 'file',
            headerName: 'קובץ מצורף',
            renderCell: (cellValues) => (<a href={cellValues.value}>{cellValues?.value[0]?.split('/')[4]}</a>),
            width: 310,

        },
        {
            field: 'userName',
            headerName: 'שם',
            width: 310,

        }
    ]
    if(!medicalFile) {
        toast.error('עליך ליצור קודם תיק רפואי')
        return 
    }
    if(isLoading) {
        return <Spinner />
    }
  return (
    <Box sx={{ width: '100%' }}>
        <ThemeProvider theme={theme}>
            <Paper sx={{ height: 400, width: '100%', mb: 2 }}>
                {selected.length > 0 && (
                <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(selected)}>
                    <DeleteIcon /> מחיקה
                    </IconButton>
                </Tooltip>)}
                {selected.length === 1 && (
                    <Tooltip title="Edit">
                        <IconButton onClick={() => onEdit(selected)}>
                        <EditIcon /> עריכה
                        </IconButton>
                </Tooltip>
                )}
                <DataGrid
                columns={headCells}
                rows={operations}
                sx={{ height: 400, width: '100%'}}
                getRowId={row => row._id}
                checkboxSelection
                components={{
                    Toolbar: CustomToolBar,
                }}
                onSelectionModelChange={(newSelectionModel) => {
                setSelected(newSelectionModel);
                }}
                selectionModel={selected}
                />

            </Paper>
        </ThemeProvider>
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
                onChange={e => {
                    setContents([])
                    setFormInput({...formInput, type: e.target.value, content: ''})
                }}
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
                    {/* <TextField
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
                    </TextField> */}
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel shrink={true}>טיפול</InputLabel>
                        <Select 
                        id="content"
                        multiple
                        onChange={handleMultipleChange}
                        value={contents}
                        variant="filled"
                        renderValue={(selected) => selected.join(', ')}
                        fullWidth
                        >
                            {treatments.map(treatment => (
                            <MenuItem key={treatment._id} value={treatment.treatmentName}>
                                <Checkbox checked={contents.indexOf(treatment.treatmentName) > -1} />
                                <ListItemText primary={treatment.treatmentName} />  
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
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
                    {/* <TextField
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
                    </TextField> */}
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel shrink={true}>תרופה</InputLabel>
                        <Select 
                        id="content"
                        multiple
                        onChange={handleMultipleChange}
                        value={contents}
                        variant="filled"
                        renderValue={(selected) => selected.join(', ')}
                        fullWidth
                        >
                            {medicines.map(medicine => (
                            <MenuItem key={medicine._id} value={medicine.medicineName}>
                                <Checkbox checked={contents.indexOf(medicine.medicineName) > -1} />
                                <ListItemText primary={medicine.medicineName} /> 
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
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
                {/* <TextField
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
                </TextField> */}
                <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel shrink={true}>בדיקה</InputLabel>
                        <Select 
                        id="content"
                        multiple
                        onChange={handleMultipleChange}
                        value={contents}
                        variant="filled"
                        renderValue={(selected) => selected.join(', ')}
                        fullWidth
                        >
                            {examinations.map(examination => (
                            <MenuItem key={examination._id} value={examination.examinationName}>
                                <Checkbox checked={contents.indexOf(examination.examinationName) > -1} />
                                <ListItemText primary={examination.examinationName} />  
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                <TextField
                id="comments"
                onChange={handleChange}
                value={formInput.comments}
                multiline
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
                multiline
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

                    <FormControl sx={{marginLeft: '20px', marginRight: '20px'}}>
                        <FormLabel>להדפסה:</FormLabel>
                        <RadioGroup row id='print' onChange={(e) => setFormInput({...formInput, print: e.target.value})} value={formInput.print}> 
                            <FormControlLabel value={true} control={<Radio />} label="כן"  />
                            <FormControlLabel value={false} control={<Radio />} label="לא" />
                        </RadioGroup>
                    </FormControl>

                    <span style={{position: 'relative', top: '18px'}}>{fileName}</span>


                    {edit ? 
                    (
                    <> 
                    <Button 
                    variant="contained"
                    sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
                    onClick={handleSave}>
                        שמור רשומה
                    </Button>
                    <Button 
                    variant="contained"
                    sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px', marginLeft: '15px'}}
                    onClick={() => {setEdit(false)
                                    setFormInput(initialState)}}>
                        ביטול עריכה
                    </Button>
                    </>
                    ) : (
                        <Button 
                        variant="contained"
                        sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
                        onClick={handleSubmit}>
                         הוסף רשומה
                         </Button>
                    )}
        </Paper>
    </Box>
  )
}

export default SecondTabMedicalFile
