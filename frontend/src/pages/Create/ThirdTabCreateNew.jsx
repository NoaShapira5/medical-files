import { Paper, TextField} from "@mui/material"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getExaminations, getTreatments } from "../../features/management/managementSlice"
import { getMedicalFileOperations } from "../../features/operation/operationSlice"
import {toast} from 'react-toastify'
import Spinner from '../../components/Spinner'

function ThirdTabCreateNew() {

    const dispatch = useDispatch()

    const {treatments, examinations, isLoading} = useSelector(state => state.management)
    const {operations} = useSelector(state => state.operation)
    const {medicalFile} = useSelector(state => state.medicalFiles)

    const relOperations = operations.filter(operation => (operation.type === 'טיפול' || operation.type === 'בדיקה') && operation.financed)
    const counts = relOperations.reduce((c, { content: key }) => (c[key] = (c[key] || 0) + 1, c), {})
    const relevantTreat = treatments.filter(treatment => treatment.price !== undefined)
    const relevantExam = examinations.filter(examination => examination.price !== undefined)


    useEffect(() => {
      if(medicalFile) {
        dispatch(getExaminations())
        dispatch(getTreatments())
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
    <Paper 
    component="form"
    sx={{
        '& .MuiTextField-root': { m: 1 },
      }}>
        <div className="row">
            <h3 className="header">סיכום בדיקות</h3>
            <h3 className="header">כמות</h3>
            <h3 className="header">עלות</h3>
        </div>

        {relevantExam.map(examination => (
            <div className="row" key={examination._id}>
                <TextField
                id="type"
                size="small"
                value={examination.examinationName}
                InputProps={{
                    readOnly: true,
                  }}
                />
                
                <TextField
                id="amount"
                size="small"
                value={counts[examination.examinationName] ? (counts[examination.examinationName] <= examination.range[1] ? counts[examination.examinationName] : examination.range[1]) : 0}
                type='number'
                sx={{width: '90px', height: '20px'}}
                InputProps={{
                    readOnly: true,
                    inputProps: { min: examination.range[0], max: examination.range[1] }
                }}
                />

                <TextField
                id="price"
                size="small"
                value={examination.price * (counts[examination.examinationName] ? (counts[examination.examinationName] <= examination.range[1] ? counts[examination.examinationName] : examination.range[1]) : 0)}
                InputProps={{
                    readOnly: true,
                  }}
                />

                
            </div>
        ))}
        <div className="row">
            <h3 className="header">סיכום טיפולים</h3>
            <h3 className="header">כמות</h3>
            <h3 className="header">עלות</h3>
        </div>

        {relevantTreat.map(treatment => (
            <div className="row" key={treatment._id}>
                <TextField
                id="type"
                size="small"
                value={treatment.treatmentName}
                InputProps={{
                    readOnly: true,
                  }}
                />
                
                <TextField
                id="amount"
                size="small"
                value={counts[treatment.treatmentName] ? (counts[treatment.treatmentName] <= treatment.range[1] ? counts[treatment.treatmentName] : treatment.range[1]) : 0}
                sx={{width: '90px', height: '20px'}}
                type='number'
                InputProps={{
                    readOnly: true,
                    inputProps: { min: treatment.range[0], max: treatment.range[1] }
                }}
                />

                <TextField
                id="price"
                size="small"
                value={treatment.price * (counts[treatment.treatmentName] ? counts[treatment.treatmentName] : 0)}
                InputProps={{
                    readOnly: true,
                  }}
                />

                
            </div>
        ))}
        <div className="row">
            <h3 className="header">כללי</h3>
            <h3 className="header">כמות</h3>
            <h3 className="header">עלות</h3>
        </div>
        <div className="row">
                <TextField
                id="type"
                size="small"
                value='ימי אשפוז'
                InputProps={{
                    readOnly: true,
                  }}
                />
                
                <TextField
                id="amount"
                size="small"
                value={medicalFile.totalHospitalDays}
                sx={{width: '90px', height: '20px'}}
                type='number'
                InputProps={{
                    readOnly: true,
                }}
                />

                <TextField
                id="price"
                size="small"
                value={30 * medicalFile.totalHospitalDays}
                InputProps={{
                    readOnly: true,
                  }}
                />

        </div>
        <div className="row">
            <TextField
                id="type"
                size="small"
                value='המתת חסד'
                InputProps={{
                    readOnly: true,
                  }}
                />
                
                <TextField
                id="true/false"
                size="small"
                value={medicalFile.death === 'המתת חסד' ? 'כן' : 'לא'}
                sx={{width: '90px', height: '20px'}}
                InputProps={{
                    readOnly: true,
                }}
                />

                <TextField
                id="price"
                size="small"
                type='number'
                value={medicalFile.death === 'המתת חסד' ? 90 : 0}
                InputProps={{
                    readOnly: true,
                  }}
                />
        </div>
    </Paper>
  )
}

export default ThirdTabCreateNew
