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
import FileUploadIcon from '@mui/icons-material/FileUpload';
import dayjs from "dayjs"
import { useSelector, useDispatch } from "react-redux"
import { createMedicalFileOperation, deleteOperation, getMedicalFileOperations, editOperation } from "../../features/operation/operationSlice"
import {toast} from 'react-toastify'
import { useEffect, useState } from "react"
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

    const [filterModel, setFilterModel] = useState({
        items: [],
      })

    const dispatch = useDispatch()

    useEffect(() => {
        if(medicalFile) {
            dispatch(getMedicalFileOperations(medicalFile._id))
        }
        
    }, [dispatch, medicalFile])

    const [edit, setEdit] = useState(false)
    const [selected, setSelected] = useState([]);
    const [contents, setContents] = useState([])
    const [numOfFiles, setNumOfFiles] = useState(0)

    const initialState = {
        dateTime: dayjs().toDate(),
        type: '',
        content: [],
        active: true,
        print: true,
        comments: '',
        file: [],
        userName: user.name,
        fileId: medicalFile?._id
    }
    const [formInput, setFormInput] = useState(initialState)

    const handleFileUpload = (e) => {
        if (!e.target.files) {
          return;
        }
        for(const file of e.target.files) {
            if (file.size > 5000000) {
                toast.error('?????????? ???????? ??????')
            }
        }
       setNumOfFiles(e.target.files.length)
        setFormInput({
            ...formInput,
           file: e.target.files})
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
            toast.success('???????????? ?????????? ????????????')
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
            toast.success('???????????? ?????????????? ????????????')
        })
        .catch(toast.error)
    }

    const onDelete = (operationIds) => {
        if(window.confirm('?????? ?????? ???????? ???????? ???????? ???????????')) {
          dispatch(deleteOperation(operationIds)).unwrap().then(() => {
            toast.success('???????????? ?????????? ????????????')
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

    const types = ['?????????? ???????????? ????????????', '?????????????? ??????????????', '??????????', '????????????', '??????????']

    const headCells = [
        {
            field: 'dateTime',
            headerName: '?????????? ????????',
            valueFormatter: (cellValues) => new Date(cellValues?.value).toLocaleString('he-IL'),
            width: 150,
            type: 'date'
        },
        {
            field: 'type',
            headerName: '??????',
            width: 140,
            type: 'string'

        },
        {
            field: 'content',
            headerName: '????????',
            width: 550,
            type: 'string'

        },
        {
            field: 'file',
            headerName: '???????? ??????????',
            renderCell: (cellValues) => (<a className='link' target="_blank" rel="noreferrer noopener" href={cellValues.value[0]}>{cellValues?.value[0]?.split('/')[4]}</a>),
            width: 310,
            type: 'string'

        },
        {
            field: 'userName',
            headerName: '????',
            width: 80,
            type: 'string'

        },
        {
        field: 'active',
        headerName: '?????????? ??????????',
        width: 100,
        type: 'string',
        valueFormatter: (cellValues) => {
            if(cellValues?.value) {
                return '????'
            } else if(cellValues?.value === false) {
                return '????'
            }
        }
        }
    ]
    if(!medicalFile) {
        toast.error('???????? ?????????? ???????? ?????? ??????????')
        return 
    }
    if(isLoading) {
        return <Spinner />
    }
  return (
    <Box sx={{ width: '100%' }}>
        <ThemeProvider theme={theme}>
            <Paper sx={{ height: 440, width: '100%', mb: 2 }}>
                {selected.length > 0 && (
                <Tooltip title="Delete">
                    <IconButton onClick={() => onDelete(selected)}>
                    <DeleteIcon /> ??????????
                    </IconButton>
                </Tooltip>)}
                {selected.length === 1 && (
                    <Tooltip title="Edit">
                        <IconButton onClick={() => onEdit(selected)}>
                        <EditIcon /> ??????????
                        </IconButton>
                </Tooltip>
                )}

                <Button variant='outlined' onClick={() => setFilterModel({items: [{
                    columnField: 'active',
                    operatorValue: 'equals',
                    value: 'true'
                }]})}>
                    ???????????? ????????????
                </Button>

                <Button variant="outlined" onClick={() => {
                setFilterModel({items: []})
                }}
                >
                    ?????????? ????????????????
                </Button>
                
                <DataGrid
                filterModel={filterModel}
                onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                initialState={{
                    sorting: {
                      sortModel: [{ field: 'dateTime', sort: 'desc' }],
                    },
                }}
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
                    label="?????????? ????????"
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
                label="??????"
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

                {formInput.type === '?????????? ???????????? ????????????' && (
                <>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel shrink={true}>?????????? ???????????? ????????????</InputLabel>
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
                    label="??????????"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
                </>
                )}
                {formInput.type === '?????????????? ??????????????' && (
                <>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel shrink={true}>?????????????? ??????????????</InputLabel>
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
                    label="??????????"
                    variant="filled"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    />
            </>
            )}

            {formInput.type === '??????????' && (
            <>
                <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel shrink={true}>???????????? ???????? ??????????</InputLabel>
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
                label="??????????"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </>                    
                )}
                {formInput.type === '????????????' && (
                <>
                <TextField
                id="content"
                onChange={handleChange}
                value={formInput.content}
                multiline
                label="????????????"
                variant="filled"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
                <FormControl sx={{marginLeft: '20px', marginRight: '20px'}}>
                    <FormLabel>?????????? ??????????:</FormLabel>
                    <RadioGroup row id='active' onChange={(e) => setFormInput({...formInput, active: e.target.value})} value={formInput.active}>
                        <FormControlLabel  value={true} control={<Radio />} label="????"/>
                        <FormControlLabel id='active' value={false} control={<Radio />} label="????"/>
                    </RadioGroup>
                </FormControl>
                </>
                )}
                {formInput.type === '??????????' && (
                <TextField
                id="content"
                onChange={handleChange}
                value={formInput.content}
                label="??????????"
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
                label="??????????"
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
                        ?????????? ????????
                        <input multiple type="file" max='3' accept='.jpg,.png,.jpeg,.pdf,.xlsx,.docx' hidden onChange={handleFileUpload} />
                    </Button>

                    <span style={{position: 'relative', top: '18px'}}>?????????? {numOfFiles} ??????????</span>

                    <FormControl sx={{marginLeft: '20px', marginRight: '20px'}}>
                        <FormLabel>????????????:</FormLabel>
                        <RadioGroup row id='print' onChange={(e) => setFormInput({...formInput, print: e.target.value})} value={formInput.print}> 
                            <FormControlLabel value={true} control={<Radio />} label="????"  />
                            <FormControlLabel value={false} control={<Radio />} label="????" />
                        </RadioGroup>
                    </FormControl>

                    {edit ? 
                    (
                    <> 
                    <Button 
                    variant="contained"
                    sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
                    onClick={handleSave}>
                        ???????? ??????????
                    </Button>
                    <Button 
                    variant="contained"
                    sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px', marginLeft: '15px'}}
                    onClick={() => {setEdit(false)
                                    setFormInput(initialState)}}>
                        ?????????? ??????????
                    </Button>
                    </>
                    ) : (
                        <Button 
                        variant="contained"
                        sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, '@media (min-width: 800px)': {position: 'relative', top: '18px'}}}
                        onClick={handleSubmit}>
                         ???????? ??????????
                         </Button>
                    )}
        </Paper>
    </Box>
  )
}

export default SecondTabMedicalFile
