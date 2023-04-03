import mainLogo from '../logos/mainLogo.png'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMedicalFile } from '../features/medicalFiles/medicalFilesSlice';
import Spinner from '../components/Spinner';

function PDF() {

  const dispatch = useDispatch()
  const {medicalFileId} = useParams()
  const {isLoading, medicalFile} = useSelector(state => state.medicalFiles)

  useEffect(() => {
    dispatch(getMedicalFile(medicalFileId))
  }, [medicalFileId, dispatch])

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  if(isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <img src={mainLogo} style={{height: '70px'}}/>

      <div className="head">
        <h1 className='title'>דף טיפולים אשפוז חתולים</h1>
        <p>תאריך הדפסה: {today}</p>
      </div>

      <div className="details">
        <div className="column-details">
          <h3>מספר פנייה: {medicalFile && medicalFile.refNum}</h3>
          <h3>כלוב אשפוז: {medicalFile && medicalFile.hospitalizationCageNum}</h3>
          <h3>שם החתול:</h3>
          <h3>מין: {medicalFile && medicalFile.gender}</h3>
          <h3>מעוקר/מסורס: {medicalFile && medicalFile.neuteringStatus}</h3>
          <h3>צבע: {medicalFile && medicalFile.color}</h3>
        </div>
        <div className="column-details">
          <h3 className='subtitle'>פרטי הפונה:</h3>
          <h3>שם:{medicalFile && medicalFile.refName}</h3>
          <h3>טלפון: {medicalFile && medicalFile.phoneOne}</h3>
          <h3 className='subtitle'>מקום הלכידה:</h3>
          <h3>כתובת: {medicalFile && medicalFile.trappingAd}</h3>
          <h3 className='subtitle'>כללי:</h3>
          <h3>אבחנה: {medicalFile && medicalFile.mainDiagnosis}</h3>
          <h3>דגשים/מזון מיוחדים:</h3>
        </div>   
      </div>

      <table style={{width: '100%'}}>
        <thead>
          <tr>
            <th>מס</th>
            <th>תאריך</th>
            <th>שתן</th>
            <th>צואה</th>
            <th colSpan='2'>אוכל</th>
            <th colSpan='3'>תרופות ופרוצדורות</th>
          </tr>

          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>יבש</th>
            <th>רטוב</th>
            <th style={{width: '40%'}}>תרופה</th>
            <th>בוקר</th>
            <th>ערב</th>
          </tr>
          
            
          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td rowSpan='3'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

            
          
        </thead>
      </table>

    </div>
  )
}

export default PDF
