const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/medicalFiles', require('./routes/medicalFileRoutes'))
app.use('/api/operations', require('./routes/operationRoutes'))
app.use('/api/managment', require('./routes/managementRoute'))

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    // FIX: below code fixes app crashing on refresh in deployment
    app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })
  } else {
    app.get('/', (_, res) => {
        res.status(200).json({massage: 'Welcome to Medical Files API'})
    })
  }

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))