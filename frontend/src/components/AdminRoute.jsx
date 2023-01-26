import {Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

function AdminRoute({children}) {
    const {user} = useSelector((state) => state.auth)

    if(user.isAdmin) {
        return children
    }
  return <Navigate to='/no-permission' />
}

export default AdminRoute
