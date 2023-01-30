import { DataGrid } from '@mui/x-data-grid'
import { getMedicalFiles } from '../features/medicalFiles/medicalFilesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { heIL } from '@mui/x-data-grid';
import { heIL as coreHeIl } from '@mui/material/locale';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@mui/private-theming';
import CustomToolBar from '../components/CustomToolBar';
import { deleteMedicalFile } from '../features/medicalFiles/medicalFilesSlice';
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#5f9ea0' },
    },
  },
  heIL, // x-data-grid translations
  coreHeIl, // core translations
);

function MedicalFilesList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {medicalFiles, isLoading} = useSelector(state => state.medicalFiles)
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getMedicalFiles())
  }, [dispatch])

  const onDelete = (medicalFileIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteMedicalFile(medicalFileIds)).unwrap().then(() => {
        toast.success('המחיקה בוצעה בהצלחה')
        setSelected([])
      })
      .catch(toast.error)      
  }
  }

  const headCells = [
    {
      field: 'cageNum',
      headerName: 'כלוב מספר',
      width: 120,
      disableExport: true
    },
    {
      field: 'arrivalDate',
      headerName: 'תאריך הגעה',
      width: 120,
      valueFormatter: (cellValues) => new Date(cellValues?.value).toLocaleString(["ban", "id"]).split(' ')[0]

    },
    {
      field: 'refNum',
      headerName: 'מספר פנייה',
      width: 120
    },
    {
      field: 'refName',
      headerName: 'שם הפונה',
      width: 120
    },
    {
      field: 'trappingAd',
      headerName: 'כתובת הלכידה',
      width: 120
    },
    {
      field: 'feederName',
      headerName: 'שם המאכיל',
      width: 120
    },
    {
      field: 'gender',
      headerName: 'מין',
      width: 120
    },
    {
      field: 'neuteringStatus',
      headerName: 'מעוקרת/מסורס',
      width: 120,
      hide: true
    },
    {
      field: 'age',
      headerName: 'גיל',
      width: 120,
      hide: true
    },
    {
      field: 'color',
      headerName: 'צבע',
      width: 120
    },
    {
      field: 'physicalCon',
      headerName: 'מצב גופני',
      width: 120,
      hide: true
    },
    {
      
        field: 'severityLev',
        headerName: 'דרגת חומרה',
        width: 120,
        hide: true

    },
    {
      field: 'medicalProb',
      headerName: 'בעיה רפואית',
      width: 120,
      hide: true

    },
    {
      field: 'examinations',
      headerName: 'בדיקות דם / שתן / צואה / ציטולוגיה',
      width: 120,
      hide: true

    },
    {
      field: 'imaging',
      headerName: 'הדמייה',
      width: 120,
      hide: true

    },
    {
      field: 'nonSurgical',
      headerName: 'טיפולים שאינם כירורגיים',
      width: 120,
      hide: true

    },
    {
      field: 'surgical',
      headerName: 'טיפולים כירורגיים',
      width: 120,
      hide: true

    },
    {
      field: 'totalHospitalDays',
      headerName: 'סך הכל ימי אישפוז',
      width: 120,
      hide: true

    },
    {
      field: 'death',
      headerName: 'מוות',
      width: 120,
      hide: true
    },
    {
      field: 'neuteringDate',
      headerName: 'תאריך עיקור/סירוס',
      width: 120,
      valueFormatter: (cellValues) => new Date(cellValues?.value).toLocaleString(["ban", "id"]).split(' ')[0],
      hide: true

    },
    {
      field: 'releaseDate',
      headerName: 'תאריך שחרור',
      width: 120,
      valueFormatter: (cellValues) => {
        if(cellValues.value) {
          return new Date(cellValues?.value).toLocaleString(["ban", "id"]).split(' ')[0]
        } else {
          return null
        }  
      }  
    },
    {
      field: 'releaseLocation',
      headerName: 'לאן שוחרר',
      width: 120,
      hide: true
    },
    {
      field: 'mainDiagnosis',
      headerName: 'אבחנה ראשית',
      width: 250,
      disableExport: true
    },
  ];

  if(isLoading) {
    return <Spinner />
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ height: 450, width: '100%' }}>
        <Typography
            sx={{height: '50px'}}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            תיקים רפואיים
            {selected.length > 0 && (
              <Tooltip title="Delete">
                <IconButton onClick={() => onDelete(selected)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>)}
          <Button variant="contained" onClick={() => navigate('/create-file')}
          sx={{position: 'absolute', right: '50px', backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
            הוסף
          </Button>
          <Button variant="contained" onClick={() => navigate('/management')}
          sx={{position: 'absolute', right: '120px', backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
            ניהול
          </Button>
        </Typography>
        <DataGrid
        columns={headCells}
        rows={medicalFiles}
        sx={{ height: 400, width: '100%', cursor: 'pointer' }}
        getRowId={row => row._id}
        checkboxSelection
        onRowClick={(row) => navigate(`/medical-file/${row.id}`)}
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
  )
}

export default MedicalFilesList
