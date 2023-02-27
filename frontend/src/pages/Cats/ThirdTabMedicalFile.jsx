import { Paper } from "@mui/material"
import { useSelector } from "react-redux"
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function ThirdTabMedicalFile({relevantExam, relevantTreat, calcAmount, calcTotalCount}) {

    const {isLoading} = useSelector(state => state.management)
    const {medicalFile} = useSelector(state => state.medicalFiles)

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
            <h2 style={{textAlign: 'center'}}>סך הכל: {calcTotalCount()}</h2>
        </TableContainer>
    </div>
  )
}

export default ThirdTabMedicalFile
