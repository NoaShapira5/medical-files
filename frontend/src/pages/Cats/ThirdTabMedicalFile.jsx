import { Paper } from "@mui/material"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getExaminations, getTreatments } from "../../features/management/managementSlice"
import { getMedicalFileOperations } from "../../features/operation/operationSlice"
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ThirdTabMedicalFile() {

    const dispatch = useDispatch()

    const {treatments, examinations, isLoading} = useSelector(state => state.management)
    const {operations} = useSelector(state => state.operation)
    const {medicalFile} = useSelector(state => state.medicalFiles)

    const relOperations = operations.filter(operation => (operation.type === 'טיפול' || operation.type === 'בדיקה') && operation.financed)
    const contents = relOperations.map(relOperations => relOperations.content)
    const flatContents = contents.flat()
    const counts = flatContents.reduce((accumulator, value) => {
      accumulator[value] = ++accumulator[value] || 1;
      return accumulator;
    }, {})
    const relevantTreat = treatments.filter(treatment => treatment.price !== undefined)
    const relevantExam = examinations.filter(examination => examination.price !== undefined)  

    const calcAmount = (item) => {
        if(item.examinationName) {
            return counts[item.examinationName] ? (counts[item.examinationName] <= item.range[1] ? counts[item.examinationName] : item.range[1]) : 0
        } else {
            return counts[item.treatmentName] ? (counts[item.treatmentName] <= item.range[1] ? counts[item.treatmentName] : item.range[1]) : 0
        }  
    }
    let totalCount = 0
    for(const examination of relevantExam) {
        totalCount += (calcAmount(examination) * examination.price)
    }
    for(const treatment of relevantTreat) {
        totalCount += (calcAmount(treatment) * treatment.price)
    }
    totalCount += (medicalFile.totalHospitalDays * 30) + (medicalFile.death === 'המתת חסד' ? 90 : 0)


    useEffect(() => {
      if(medicalFile) {
        dispatch(getMedicalFileOperations(medicalFile._id))
      }
    }, [dispatch, medicalFile])

    if(!medicalFile) {
      toast.error('עליך ליצור קודם תיק רפואי')
      return 
    }
    if(isLoading) {
      return <Spinner />
    }
  return (
    <div className='tables'>
        <TableContainer component={Paper} sx={{ maxWidth: 350, marginBottom: '30px'}}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>סיכום בדיקות</TableCell>
                    <TableCell>כמות</TableCell>
                    <TableCell>עלות</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {relevantExam.map((examination) => (
                    <TableRow
                    key={examination._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {examination.examinationName}
                        </TableCell>
                        <TableCell>{calcAmount(examination)}</TableCell>
                        <TableCell>{calcAmount(examination) * examination.price}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ maxWidth: 350, marginBottom: '30px'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>סיכום טיפולים</TableCell>
                        <TableCell>כמות</TableCell>
                        <TableCell>עלות</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {relevantTreat.map((treatment) => (
                    <TableRow
                    key={treatment._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {treatment.treatmentName}
                        </TableCell>
                        <TableCell>{calcAmount(treatment)}</TableCell>
                        <TableCell>{calcAmount(treatment) * treatment.price}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TableContainer component={Paper} sx={{ maxWidth: 350, marginBottom: '30px'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>כללי</TableCell>
                        <TableCell>כמות</TableCell>
                        <TableCell>עלות</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            ימי אישפוז
                        </TableCell>
                        <TableCell>{medicalFile.totalHospitalDays}</TableCell>
                        <TableCell>{30 * medicalFile.totalHospitalDays}</TableCell>
                    </TableRow>
                    <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            המתת חסד
                        </TableCell>
                        <TableCell>{medicalFile.death === 'המתת חסד' ? 'כן' : 'לא'}</TableCell>
                        <TableCell>{medicalFile.death === 'המתת חסד' ? 90 : 0}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <h2 style={{textAlign: 'center'}}>סך הכל: {totalCount}</h2>
        </TableContainer>
    </div>
  )
}

export default ThirdTabMedicalFile
