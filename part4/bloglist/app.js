const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
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

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' })
    } else if (error.name ==='ValidationError') {
        return response.status(400).json(error.message)
    }
    next(error)
}

//must be at the end
app.use(unknownEndpoint)
app.use(errorHandler)
module.exports = app