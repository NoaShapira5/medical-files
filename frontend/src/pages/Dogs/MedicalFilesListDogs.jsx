import { DataGrid } from '@mui/x-data-grid'
import { getDogMedicalFiles, deleteDogMedicalFile, back } from '../../features/dogMedicalFiles/dogsMedicalFilesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Button, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { heIL } from '@mui/x-data-grid';
import { heIL as coreHeIl } from '@mui/material/locale';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@mui/private-theming';
import CustomToolBar from '../../components/CustomToolBar';
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import subLogo from '../../logos/subLogo.png'
// import {deleteOperationsByMedicalFile} from '../../features/operation/operationSlice'

const theme = createTheme(
  {
    palette: {
      primary: { main: '#5f9ea0' },
    },
  },
  heIL, // x-data-grid translations
  coreHeIl, // core translations
);

function MedicalFilesListDogs() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {dogMedicalFiles, isLoading} = useSelector(state => state.dogMedicalFiles)
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    dispatch(getDogMedicalFiles())
    dispatch(back())
  }, [dispatch])

  const onDelete = (medicalFileIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteDogMedicalFile(medicalFileIds)).unwrap().then(() => {
        // dispatch(deleteOperationsByMedicalFile(medicalFileIds)).unwrap().then(() => {
        //   setSelected([])
        //   toast.success('המחיקה בוצעה בהצלחה')
        // }).catch(toast.error)
        
      })
      .catch(toast.error)        
    }
  }

  const headCells = [
    {
      field: 'arrivalDate',
      headerName: 'תאריך הגעה',
      width: 120,
      type: 'date',
      valueFormatter: (cellValues) => new Date(cellValues?.value).toLocaleString(["ban", "id"]).split(' ')[0]

    },
    {
      field: 'refNum',
      headerName: 'מספר פנייה',
      width: 120,
      type: 'number',
      headerAlign: 'left',
      align: 'left'
    },
    {
      field: 'refName',
      headerName: 'שם הפונה',
      width: 120,
      type: 'string'
    },
    {
      field: 'trappingAd',
      headerName: 'כתובת הלכידה',
      width: 120,
      type: 'string'
    },
    {
      field: 'gender',
      headerName: 'מין',
      width: 120,
      type: 'string'
    },
    {
      field: 'neuteringStatus',
      headerName: 'מעוקרת/מסורס',
      width: 120,
      hide: true,
      type: 'string'
    },
    {
      field: 'age',
      headerName: 'גיל',
      width: 120,
      hide: true,
      type: 'number',
      headerAlign: 'left'
    },
    {
      field: 'color',
      headerName: 'צבע',
      width: 120,
      type: 'string'
    },
    {
      field: 'physicalCon',
      headerName: 'מצב גופני',
      width: 120,
      hide: true,
      type: 'number',
      headerAlign: 'left',
      align: 'left'
    },
    {
      
        field: 'severityLev',
        headerName: 'דרגת חומרה',
        width: 120,
        hide: true,
        type: 'string'

    },
    {
      field: 'medicalProb',
      headerName: 'בעיה רפואית',
      width: 120,
      hide: true,
      type: 'string'

    },
    {
      field: 'examinations',
      headerName: 'בדיקות דם / שתן / צואה / ציטולוגיה',
      width: 120,
      hide: true,
      type: 'string'

    },
    {
      field: 'imaging',
      headerName: 'הדמייה',
      width: 120,
      hide: true,
      type: 'string'

    },
    {
      field: 'nonSurgical',
      headerName: 'טיפולים שאינם כירורגיים',
      width: 120,
      hide: true,
      type: 'string'

    },
    {
      field: 'surgical',
      headerName: 'טיפולים כירורגיים',
      width: 120,
      hide: true,
      type: 'string'

    },
    {
      field: 'totalHospitalDays',
      headerName: 'סך הכל ימי אישפוז',
      width: 120,
      hide: true,
      type: 'number',
      headerAlign: 'left',
      align: 'left'

    },
    {
      field: 'death',
      headerName: 'מוות',
      width: 120,
      hide: true,
      type: 'string'
    },
    {
      field: 'neuteringDate',
      headerName: 'תאריך עיקור/סירוס',
      width: 120,
      hide: true,
      type: 'date',
      valueFormatter: (cellValues) => {
        if(cellValues.value) {
          return new Date(cellValues?.value).toLocaleString(["ban", "id"]).split(' ')[0]
        } else {
          return null
        }  
      } 

    },
    {
      field: 'releaseDate',
      headerName: 'תאריך שחרור',
      width: 120,
      type: 'date',
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
      hide: true,
      type: 'string'
    },
    {
      field: 'mainDiagnosis',
      headerName: 'אבחנה ראשית',
      width: 250,
      disableExport: true,
      type: 'string'
    },
  ];

  if(isLoading) {
    return <Spinner />
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
       sx={{ height: 470, width: '100%' }}
       >
          <div className="container">
            <div className="title">
              <h3>תיקים רפואיים</h3>
            </div>
            <div className="image">
              <img src={subLogo} alt='איגוד ערים גוש דן' className='sub-logo' />
            </div>
            <Button variant="contained" onClick={() => navigate('/create-dog-medicalFile')}
            sx={{position: 'absolute', right: '50px', backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}}}>
              הוסף
            </Button>
          </div>
          {selected.length > 0 && (
          <Tooltip title="Delete">
            <IconButton onClick={() => onDelete(selected)}>
              <DeleteIcon /> <span style={{fontSize: '19px'}}>מחיקה</span>
            </IconButton>
          </Tooltip>)}
          
          <DataGrid
          className='data-grid'
          columns={headCells}
          rows={dogMedicalFiles}
          sx={{ height: 400, width: '100%', cursor: 'pointer' }}
          getRowId={row => row._id}
          checkboxSelection
          onRowClick={(row) => navigate(`/medical-file-dogs/${row.id}`)}
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

export default MedicalFilesListDogs
