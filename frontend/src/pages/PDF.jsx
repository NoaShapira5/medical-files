import mainLogo from '../logos/mainLogo.png'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getMedicalFile } from '../features/medicalFiles/medicalFilesSlice';
import Spinner from '../components/Spinner';

function PDF() {

  const dispatch = useDispatch()
  const {medicalFileId} = useParams()
  const {isLoading, medicalFile} = useSelector(state => state.medicalFiles)
  const [nextSevenDays, setNextSevenDays] = useState([])

  useEffect(() => {
    const formatDate = (date) => {
      const dd = String(date.getDate()).padStart(2, '0')
      let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = date.getFullYear();
      date = dd + '/' + mm + '/' + yyyy;
      return date
    }
    const getTheNextSevenDays = () => {
    let sevenDates = [0,1,2,3,4,5,6]
    let today = new Date();
    for(let i = 0; i < sevenDates.length; i++) {
      let newDate = new Date()
      newDate.setDate(today.getDate() + sevenDates[i])
      sevenDates[i] = formatDate(newDate)
    }
    return sevenDates
  }
    dispatch(getMedicalFile(medicalFileId))
    setNextSevenDays(getTheNextSevenDays())
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
      <img src={mainLogo} style={{height: '70px'}} alt='השירותים הוטרינרים גוש דן'/>

      <div className="head">
        <h1 className='title'>דף טיפולים אשפוז חתולים</h1>
        <p>תאריך הדפסה: {today}</p>
      </div>

      <div className="details">
        <div className="column-details">
          <h4>מספר פנייה: {medicalFile && medicalFile.refNum}</h4>
          <h4>כלוב אשפוז: {medicalFile && medicalFile.hospitalizationCageNum}</h4>
          <h4>שם החתול:</h4>
          <h4>מין: {medicalFile && medicalFile.gender}</h4>
          <h4>מעוקר/מסורס: {medicalFile && medicalFile.neuteringStatus}</h4>
          <h4>צבע: {medicalFile && medicalFile.color}</h4>
        </div>
        <div className="column-details">
          <h4 className='subtitle'>פרטי הפונה:</h4>
          <h4>שם: {medicalFile && medicalFile.refName}</h4>
          <h4>טלפון: {medicalFile && medicalFile.phoneOne}</h4>
          <h4 className='subtitle'>מקום הלכידה:</h4>
          <h4>כתובת: {medicalFile && medicalFile.trappingAd}</h4>
          <h4 className='subtitle'>כללי:</h4>
          <h4>אבחנה: {medicalFile && medicalFile.mainDiagnosis}</h4>
          <h4>דגשים/מזון מיוחדים:</h4>
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
          
            
          <tr style={{height: '20%'}}>
            <td rowSpan='5'></td>
            <td rowSpan='5'>{nextSevenDays[0]}</td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td rowSpan='5'></td>
            <td rowSpan='5'>{nextSevenDays[1]}</td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td rowSpan='5'></td>
            <td rowSpan='5'>{nextSevenDays[2]}</td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td rowSpan='5'></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '20%'}}>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr style={{height: '33.333%'}}>
            <td rowSpan='3'></td>
            <td rowSpan='3'>{nextSevenDays[3]}</td>
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
            <td rowSpan='3'>{nextSevenDays[4]}</td>
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
            <td rowSpan='3'>{nextSevenDays[5]}</td>
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
            <td rowSpan='3'>{nextSevenDays[6]}</td>
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
