import Spinner from "../../../components/Spinner";
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import {useEffect, useState} from 'react'
import {getUsers, register, deleteUsers, editUser} from '../../../features/auth/authSlice'
import { Box, Paper, Button, TextField, Tooltip, IconButton, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@mui/material"
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

function ManagementSixthTab() {
  const dispatch = useDispatch()
  const {isLoading, users} = useSelector(state => state.auth)

  const [edit, setEdit] = useState(false)
  const [selected, setSelected] = useState([]);
  const initialState = {
    email: '',
    name: '',
    password: '',
    password2: '',
    isAdmin: false
  }
  const [formInput, setFormInput] = useState(initialState)

  const handleChange = (e) => {
    setFormInput({
        ...formInput,
        [e.target.id]: e.target.value
    })
  }

  const onDelete = (userIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteUsers(userIds)).unwrap().then(() => {
        toast.success('המחיקה בוצעה בהצלחה')
        setSelected([])
      })
      .catch(toast.error)      
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(formInput.password !== formInput.password2) {
      toast.error('הסיסמאות לא תואמות')
    } else {

      dispatch(register(formInput)).unwrap().then((user) => {
          toast.success(`רישום משתמש חדש בוצע בהצלחה`)
      })
      .catch(toast.error)
  }
  }

  const onEdit = (userIds) => {
    setEdit(true)
    setSelected([])
    const user = users.filter(user => user._id === userIds[0])
    setFormInput({...user[0], password: '', password2: ''})
  }

  const handleSave = (e) => {
    e.preventDefault()
    dispatch(editUser(formInput)).unwrap().then(() => {
        setEdit(false)
        setSelected([])
        setFormInput(initialState)
        toast.success('המשתמש התעדכן בהצלחה')
    })
    .catch(toast.error)
  }

  const headCells = [
    {
      field: 'email',
      headerName: 'אימייל',
      width: 300
    },
    {
      field: 'name',
      headerName: 'שם משתמש',
      width: 300
    },
    {
      field: 'isAdmin',
      headerName: 'הרשאות מנהל',
      width: 300,
      valueFormatter: (cellValues) => cellValues?.value ? "כן" : "לא"
    },

  ]

  useEffect(() => {
    dispatch(getUsers())
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
                rows={users}
                sx={{ height: 400, width: '100%'}}
                getRowId={row => row._id}
                checkboxSelection
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
          id="email"
          onChange={handleChange}
          value={formInput.email}
          label="אימייל"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />

          <TextField
          id="name"
          onChange={handleChange}
          value={formInput.name}
          label="שם מלא"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />

          <TextField
          id="password"
          onChange={handleChange}
          value={formInput.password}
          label="סיסמה"
          type="password"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />

          <TextField
          id="password2"
          onChange={handleChange}
          value={formInput.password2}
          label="אימות סיסמה"
          type="password"
          variant="filled"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          />

          <FormControl sx={{marginLeft: '20px', marginRight: '20px'}}>
            <FormLabel>הרשאות ניהול</FormLabel>
              <RadioGroup row onChange={(e) => setFormInput({...formInput, isAdmin: e.target.value})} value={formInput.isAdmin}>
                <FormControlLabel value={true} control={<Radio />} label="כן"/>
                <FormControlLabel value={false} control={<Radio />} label="לא"/>
              </RadioGroup>
          </FormControl>

          {edit ? 
            (
            <>
            <Button 
            variant="contained"
            sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, position: 'relative', top: '18px'}}
            onClick={handleSave}>
                שמור משתמש
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
                 יצירת משתמש חדש
                 </Button>
          )}
        </Paper>
    </Box>
  )
}

export default ManagementSixthTab
