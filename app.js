const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
// Load environment variables from .env file
require('dotenv').config()  

app.use(bodyParser.json())
app.use(cors())
// Import Routes
const postRoute = require('./routes/post')
const authRoute = require('./routes/auth')
// Use Routes
app.use('/api/post', postRoute)
app.use('/api/auth', authRoute)
// API Root Route*/
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Piazza API!')
})

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

const MURL = 'mongodb+srv:
mongoose.connect(MURL).then(()=>{
    console.log('Your mongoDB connector is on...')
})

// Start Server
app.listen(3000, () => {
  console.log('Server is up and running on port 3000')
})
