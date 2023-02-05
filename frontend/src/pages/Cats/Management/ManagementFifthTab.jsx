import Spinner from "../../../components/Spinner";
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from 'react'
import {getDiagnoses, createDiagnosis, deleteDiagnoses, editDiagnosis} from '../../../features/management/managementSlice'
import { Box, Paper, Button, TextField, Tooltip, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid'
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@mui/private-theming';
import { heIL } from '@mui/x-data-grid';
import { heIL as coreHeIl } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#5f9ea0' },
    },
  },
  heIL, // x-data-grid translations
  coreHeIl, // core translations
);

function ManagementFifthTab() {
  const dispatch = useDispatch()
  const {isLoading, diagnoses} = useSelector(state => state.management)

  const [edit, setEdit] = useState(false)
  const [selected, setSelected] = useState([]);
  const initialState = {
    diagnosisName: '',
    price: '',
    range: ['', ''],
  }
  const [formInput, setFormInput] = useState(initialState)

  const handleChange = (e) => {
    setFormInput({
        ...formInput,
        [e.target.id]: e.target.value
    })
  }

  const onDelete = (diagnosisIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteDiagnoses(diagnosisIds)).unwrap().then(() => {
        toast.success('המחיקה בוצעה בהצלחה')
        setSelected([])
      })
      .catch(toast.error)      
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createDiagnosis(formInput)).unwrap().then(() => {
        setFormInput(initialState)
        toast.success('האבחנה נוספה בהצלחה')
    })
    .catch(toast.error)
  }

  const onEdit = (diagnosisIds) => {
    setEdit(true)
    setSelected([])
    const diagnosis = diagnoses.filter(diagnosis => diagnosis._id === diagnosisIds[0])
    setFormInput(diagnosis[0])
  }

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(editDiagnosis(formInput)).unwrap().then(() => {
        setEdit(false)
        setSelected([])
        setFormInput(initialState)
        toast.success('האבחנה התעדכנה בהצלחה')
    })
    .catch(toast.error)
  }

  const headCells = [
    {
      field: 'diagnosisName',
      headerName: 'אבחנה',
      width: 300
    },
  ]


  useEffect(() => {
    dispatch(getDiagnoses())
  }, [dispatch])

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
                rows={diagnoses}
                sx={{ height: 400, width: '100%'}}
                getRowId={row => row._id}
                checkboxSelection
                // components={{
                //     Toolbar: CustomToolBar,
                // }}
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
          <TextField
          id="diagnosisName"
          onChange={handleChange}
          value={formInput.diagnosisName}
          multiline
          label="אבחנה"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />
          {edit ? 
            (
            <>
            <Button 
            variant="contained"
            sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
            onClick={handleSave}>
                שמור אבחנה
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
                 הוסף אבחנה
                 </Button>
          )}
          

        </Paper>
    </Box>
  )
}

export default ManagementFifthTab
