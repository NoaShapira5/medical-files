import { useState} from "react"
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { login } from "../features/auth/authSlice"
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password: '',
    })

    const {email, password} = formData

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
  <div className="login">
    <h1>כניסה</h1>
    <form onSubmit={onSubmit}>
        <p><input type="email" name="email" value={email} onChange={onChange} placeholder="אימייל" dir="rtl" required/></p>
        <p><input type="password" name="password" value={password} onChange={onChange} placeholder="סיסמה" dir="rtl" required/></p>
        <p className="submit"><input type="submit" name="commit" value="כניסה" /></p>
    </form>
  </div>
    
  )
}

export default Login
