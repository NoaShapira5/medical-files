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
        password2: ''
    })

    const {name, email, password, password2} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading} = useSelector(state => state.auth)

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
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
                password
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
        <p><input type="text" name="name" value={name} onChange={onChange} placeholder="שם מלא" dir="rtl" required/></p>
        <p><input type="email" name="email" value={email} onChange={onChange} placeholder="אימייל" dir="rtl" required/></p>
        <p><input type="password" name="password" value={password} onChange={onChange} placeholder="סיסמה" dir="rtl" required/></p>
        <p><input type="password" name="password2" value={password2} onChange={onChange} placeholder="אימות סיסמה" dir="rtl" required/></p>
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
