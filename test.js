require('dotenv').config()
const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully!')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message)
  })
