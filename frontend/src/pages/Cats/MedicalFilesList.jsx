import { DataGrid } from '@mui/x-data-grid'
import { getMedicalFiles, back } from '../../features/medicalFiles/medicalFilesSlice';
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
import { deleteMedicalFile } from '../../features/medicalFiles/medicalFilesSlice';
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import subLogo from '../../logos/subLogo.png'
import {deleteOperationsByMedicalFile} from '../../features/operation/operationSlice'

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
  const [filterModel, setFilterModel] = useState({
    items: []
  })

  useEffect(() => {
    dispatch(getMedicalFiles())
    dispatch(back())
  }, [dispatch])

  const onDelete = (medicalFileIds) => {
    if(window.confirm('האם אתה בטוח שאתה רוצה למחוק?')) {
      dispatch(deleteMedicalFile(medicalFileIds)).unwrap().then(() => {
        dispatch(deleteOperationsByMedicalFile(medicalFileIds)).unwrap().then(() => {
          setSelected([])
          toast.success('המחיקה בוצעה בהצלחה')
        }).catch(toast.error)
        
      })
      .catch(toast.error)        
    }
  }

  const headCells = [
    {
      field: 'cageNum',
      headerName: 'כלוב מספר',
      width: 80,
      disableExport: true,
      type: 'number',
      headerAlign: 'left',
      align: 'left'
    },
    {
      field: 'arrivalDate',
      headerName: 'תאריך הגעה',
      width: 90,
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
      field: 'feederName',
      headerName: 'שם המאכיל',
      width: 120,
      type: 'string'
    },
    {
      field: 'phoneOne',
      headerName: 'טלפון 1',
      width: 120,
      type: 'string',
      disableExport: true
    },
    {
      field: 'gender',
      headerName: 'מין',
      width: 50,
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
      width: 90,
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
    {
      field: 'hospitalizationCageNum',
      headerName: 'מספר כלוב אשפוז',
      width: 120,
      type: 'number',
      disableExport: true,
      headerAlign: 'left',
      align: 'left'
    },
    {
      field: 'images',
      headerName: 'תמונה',
      width: 100,
      disableExport: true,
      type: 'string',
      renderCell: (cellValues) => (<a className='link' target="_blank" rel="noreferrer noopener" href={cellValues.value[0]}>{cellValues?.value[0]?.split('/')[4]}</a>),

    },


  ];

  if(isLoading) {
    return <Spinner />
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper
       sx={{ height: 500, width: '100%' }}
       >
          <div className="container">
            <div className="title">
              <h3>תיקים רפואיים</h3>
            </div>
            <div className="image">
              <img src={subLogo} alt='איגוד ערים גוש דן' className='sub-logo' />
            </div>
            <Button variant="contained" onClick={() => navigate('/create-file')}
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
          <Button variant="outlined" onClick={() => setFilterModel({items : [{
            columnField: "releaseDate",
            operatorValue: "isEmpty"
          }]})}
          >
            חתולים שלא שוחררו
          </Button>

          <Button variant='outlined' onClick={() => setFilterModel({items: [{
            columnField: 'arrivalDate',
            operatorValue: 'onOrAfter',
            value: `${new Date().getFullYear()}-${new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)}-01`
          }]})}>
            הגיעו החודש
          </Button>

          <Button variant='outlined' onClick={() => setFilterModel({items: [{
            columnField: 'releaseDate',
            operatorValue: 'onOrAfter',
            value: `${new Date().getFullYear()}-${new Date().getMonth() + 1 > 10 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1)}-01`
          }]})}>
            שוחררו החודש
          </Button>

          <Button variant='outlined' onClick={() => setFilterModel({items: [{
            columnField: 'arrivalDate',
            operatorValue: 'onOrAfter',
            value: `${new Date().getFullYear()}-01-01`
          }]})}>
            הגיעו השנה
          </Button>

          <Button variant="outlined" onClick={() => setFilterModel({items: []})}>
            איפוס הפילטרים
          </Button>

          <DataGrid
          className='data-grid'
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
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
