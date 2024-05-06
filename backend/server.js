const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const codeBlockRoutes = require('./routes/codeBlock.routes');
const socketService = require('./services/socketService');


const app = express()
const http = require('http').createServer(app)

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}

app.use(cors(corsOptions))

socketService.initializeSocket(http);
const MONGO_URL = 'mongodb+srv://mister-toy:DOR1505te@mongo.rqczatz.mongodb.net/remocode_db?retryWrites=true&w=majority'


app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))



mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));


app.use('/codeBlock', codeBlockRoutes);



const logger = require('./services/logger.service')
const port = process.env.PORT || 3030

app.use('/', (req, res) => {
    res.send(`Server is running ${port}`)
})


http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})