import Spinner from "../../../components/Spinner";
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from 'react'
import {getCommunities, createCommunity, deleteCommuinities, editCommunity} from '../../../features/management/managementSlice'
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

function ManagementFourthTab() {
  const dispatch = useDispatch()
  const {isLoading, communities} = useSelector(state => state.management)

  const [edit, setEdit] = useState(false)
  const [selected, setSelected] = useState([]);
  const initialState = {
    communityName: '',
  }
  const [formInput, setFormInput] = useState(initialState)

  const handleChange = (e) => {
    setFormInput({
        ...formInput,
        [e.target.id]: e.target.value
    })
  }

  const onDelete = (communityIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteCommuinities(communityIds)).unwrap().then(() => {
        toast.success('המחיקה בוצעה בהצלחה')
        setSelected([])
      })
      .catch(toast.error)      
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createCommunity(formInput)).unwrap().then(() => {
        setFormInput(initialState)
        toast.success('הרשות המקומית נוספה בהצלחה')
    })
    .catch(toast.error)
  }

  const onEdit = (communityIds) => {
    setEdit(true)
    const community = communities.filter(community => community._id === communityIds[0])
    setFormInput(community[0])
  }

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(editCommunity(formInput)).unwrap().then(() => {
        setEdit(false)
        setSelected([])
        setFormInput(initialState)
        toast.success('הרשות המקומית התעדכנה בהצלחה')
    })
    .catch(toast.error)
  }

  const headCells = [
    {
      field: 'communityName',
      headerName: 'רשות מקומית',
      width: 300
    },

  ]

  useEffect(() => {
    dispatch(getCommunities())
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
                rows={communities}
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
          id="communityName"
          onChange={handleChange}
          value={formInput.communityName}
          multiline
          label="רשות מקומית"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />

          {edit ? 
            (
            <Button 
            variant="contained"
            sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
            onClick={handleSave}>
                שמור רשות מקומית
            </Button>
            ) : (
                <Button 
                variant="contained"
                sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
                onClick={handleSubmit}>
                 הוסף רשות מקומית
                 </Button>
          )}
          

        </Paper>
    </Box>
  )
}

export default ManagementFourthTab
