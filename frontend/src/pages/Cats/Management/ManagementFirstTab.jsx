import Spinner from "../../../components/Spinner";
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from 'react'
import {getTreatments, createTreatment, deleteTreatments, editTreatment} from '../../../features/management/managementSlice'
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

function ManagementFirstTab() {
  const dispatch = useDispatch()
  const {isLoading, treatments} = useSelector(state => state.management)

  const [edit, setEdit] = useState(false)
  const [selected, setSelected] = useState([]);
  const initialState = {
    treatmentName: '',
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

  const onDelete = (treatmentIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteTreatments(treatmentIds)).unwrap().then(() => {
        toast.success('המחיקה בוצעה בהצלחה')
        setSelected([])
      })
      .catch(toast.error)      
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTreatment(formInput)).unwrap().then(() => {
        setFormInput(initialState)
        toast.success('הטיפול נוצר בהצלחה')
    })
    .catch(toast.error)
  }

  const onEdit = (treatmentIds) => {
    setEdit(true)
    setSelected([])
    const treatment = treatments.filter(treatment => treatment._id === treatmentIds[0])
    setFormInput({...treatment[0], price: treatment[0].price ? treatment[0].price : '', range: treatment[0].range ? treatment[0].range : ['', '']})
  }

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(editTreatment(formInput)).unwrap().then(() => {
        setEdit(false)
        setSelected([])
        setFormInput(initialState)
        toast.success('הטיפול התעדכן בהצלחה')
    })
    .catch(toast.error)
  }

  const headCells = [
    {
      field: 'treatmentName',
      headerName: 'טיפולים לדיווח ותשלום',
      width: 300
    },
    {
      field: 'price',
      headerName: 'מחיר',

    },
    {
      field: 'range',
      headerName: 'כמות אפשרית [מקסימום, מינימום]',
      width: 300

    },
  ]


  useEffect(() => {
    dispatch(getTreatments())
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
                rows={treatments}
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
          id="treatmentName"
          onChange={handleChange}
          value={formInput.treatmentName}
          multiline
          label="טיפולים לדיווח ותשלום"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />

          <TextField
          id="price"
          onChange={handleChange}
          value={formInput.price}
          label="מחיר"
          type="number"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />

          <TextField
          id="min"
          onChange={e => setFormInput({...formInput, range : [e.target.value, formInput.range[1]]})}
          value={formInput.range[0]}
          label="כמות מינימלית"
          type="number"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />          
          
          <TextField
          id="max"
          onChange={e => setFormInput({...formInput, range: [formInput.range[0], e.target.value]})}
          value={formInput.range[1]}
          label="כמות מקסימלית"
          type="number"
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
                שמור טיפול
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
                 הוסף טיפול
                 </Button>
          )}
          

        </Paper>
    </Box>
  )
}

export default ManagementFirstTab
