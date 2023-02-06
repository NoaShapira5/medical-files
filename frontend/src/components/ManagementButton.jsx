import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
function ManagementButton() {
    const navigate = useNavigate()
  return (
    <Button variant="contained" onClick={() => navigate('/management')}
    sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'}, marginLeft: '20px'}}>
      ניהול
    </Button>
  )
}

export default ManagementButton
