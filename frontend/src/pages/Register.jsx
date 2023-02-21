import { useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { register } from "../features/auth/authSlice"
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import mainLogo from '../logos/mainLogo.png'
import {Button} from '@mui/material';
import BackButton from "../components/BackButton"

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password: '',
        password2: '',
        isAdmin: false
    })

    const {name, email, password, password2, isAdmin} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading} = useSelector(state => state.auth)

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleRadio = (e) => {
      const isAdmin = e.target.value === 'true' ? true: false;
      setFormData(prevState => ({
        ...prevState,
        [e.target.name]: isAdmin
    }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(password !== password2) {
            toast.error('הסיסמאות לא תואמות')
        } else {
            const userData = {
                name,
                email,
                password,
                isAdmin
            }

            dispatch(register(userData)).unwrap().then((user) => {
                toast.success(`רישום משתמש חדש בוצע בהצלחה`)
                navigate('/')
            })
            .catch(toast.error)
        }
    }

    if(isLoading) {
        return <Spinner />
    }
  return (
    <>
    <header>
      <img src={mainLogo} alt='איגוד ערים גוש דן' className='main-logo' />
    </header>
    <div className="login">
      <h1>יצירת משתמש חדש</h1>
      <form onSubmit={onSubmit}>
        <p><input type="text" id="name" name="name" value={name} onChange={onChange} placeholder="שם מלא" dir="rtl" required/></p>
        <p><input type="email" id="email"  name="email" value={email} onChange={onChange} placeholder="אימייל" dir="rtl" required/></p>
        <p><input type="password" id="password" name="password" value={password} onChange={onChange} placeholder="סיסמה" dir="rtl" required/></p>
        <p><input type="password" id="password2" name="password2" value={password2} onChange={onChange} placeholder="אימות סיסמה" dir="rtl" required/></p>
        <div className="radio">
          <p>הרשאות מנהל</p>
          <div>
            <p><input type="radio" name="isAdmin" value={true} checked={isAdmin === true} onChange={handleRadio}/></p>
            <label>כן</label>
          </div>
          <div>
            <p><input type="radio" name="isAdmin" value={false} checked={isAdmin === false} onChange={handleRadio}/></p>
            <label>לא</label>
          </div>
        </div>
          <Button
          type="submit"
          variant='contained'
          sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}
          >
            רשום משתמש חדש
          </Button>
      </form>
    </div>
    <BackButton />
  </>
    
  )
}

export default Register
