import Spinner from "../../../components/Spinner";
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from 'react'
import {getMedicines, createMedicine, deleteMedicines, editMedicine} from '../../../features/management/managementSlice'
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

function ManagementSecondTab() {
  const dispatch = useDispatch()
  const {isLoading, medicines} = useSelector(state => state.management)

  const [edit, setEdit] = useState(false)
  const [selected, setSelected] = useState([]);
  const initialState = {
    medicineName: '',
  }
  const [formInput, setFormInput] = useState(initialState)

  const handleChange = (e) => {
    setFormInput({
        ...formInput,
        [e.target.id]: e.target.value
    })
  }

  const onDelete = (medicineIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteMedicines(medicineIds)).unwrap().then(() => {
        toast.success('המחיקה בוצעה בהצלחה')
        setSelected([])
      })
      .catch(toast.error)      
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createMedicine(formInput)).unwrap().then(() => {
        setFormInput(initialState)
        toast.success('התרופה נוצרה בהצלחה')
    })
    .catch(toast.error)
  }

  const onEdit = (medicineIds) => {
    setEdit(true)
    setSelected([])
    const medicine = medicines.filter(medicine => medicine._id === medicineIds[0])
    setFormInput(medicine[0])
  }

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(editMedicine(formInput)).unwrap().then(() => {
        setEdit(false)
        setSelected([])
        setFormInput(initialState)
        toast.success('התרופה התעדכן בהצלחה')
    })
    .catch(toast.error)
  }

  const headCells = [
    {
      field: 'medicineName',
      headerName: 'תרופה',
      width: 300
    },

  ]

  useEffect(() => {
    dispatch(getMedicines())
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
                rows={medicines}
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
          id="medicineName"
          onChange={handleChange}
          value={formInput.medicineName}
          multiline
          label="תרופה"
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
                שמור תרופה
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
                 הוסף תרופה
                 </Button>
          )}
          

        </Paper>
    </Box>
  )
}

export default ManagementSecondTab
