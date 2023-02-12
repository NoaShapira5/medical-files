import { useState, useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { login } from "../features/auth/authSlice"
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import mainLogo from '../logos/mainLogo.png'
import {Button} from '@mui/material';

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password: '',
    })

    const {email, password} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading, user} = useSelector(state => state.auth)

    useEffect(() => {
      if(user) {
        navigate('/')
      }
    }, [user, navigate])

    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
    
        const userData = {
          email,
          password
        }

        dispatch(login(userData)).unwrap().then((user) => {
          toast.success(`התחברת בהצלחה`)
          navigate('/')
        })
        .catch(toast.error)

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
      <h1>כניסה</h1>
      <form onSubmit={onSubmit}>
          <p><input type="email" name="email" id="email" value={email} onChange={onChange} placeholder="אימייל" dir="rtl" required/></p>
          <p><input type="password" name="password" id="password" value={password} onChange={onChange} placeholder="סיסמה" dir="rtl" required/></p>
          <Button
          type="submit"
          variant='contained'
          sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop: '20px'}}
          >
            כניסה
          </Button>
      </form>
    </div>
  </>
    
  )
}

export default Login
