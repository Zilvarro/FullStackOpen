const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

logger.info('Connecting to database...')
mongoose.connect(config.MONGODB_URI).then(()=>{
    logger.info('Connected to MongoDB')
}).catch((error)=>{
    logger.error('Error connecting to MongoDB:', error.message)
})
app.use('/api/blogs', blogsRouter)

module.exports = app