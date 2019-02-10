const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/social-network')
// Config
const config = require('./config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/assets', express.static('public'))
app.use('/static', express.static('client/build/static')) // For react production version
app.use(require('./routes-middleware'))
app.use(require('./routes'))
require('./sockets')(io)


http.listen(config.env.PORT, config.env.IP)

