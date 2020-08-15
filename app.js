const express = require('express')
const path = require('path')
const http = require('http')
//const hbs = require('express-handlebars')
const expressLayouts = require('express-ejs-layouts')
const createError = require('http-errors')

require('dotenv/config')

//Logger helpers
const morgan = require('morgan')
const rfs = require('rotating-file-stream')

//import routes from routes folder in ./routes
const postRoute = require('./routes')

//initiate express application
const app = express()

//connect to mongodb
const mongoose = require('mongoose')
const dbURL = process.env.mongoUrl
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err) => {
    err && console.log('connection failed')
    !err && console.log('Connected Successfully!')
})

//allow body requests and limit request size to 50mb
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: false, parameterLimit: 50000, limit: '50mb' }))

//set view engine
app.use(expressLayouts)
app.set('view engine', 'ejs')

//join static files so we can load css, images and js files from public folder in our views
app.use(express.static(path.join(__dirname, '/public')))

//Set up logging functionality
let logStream = rfs.createStream(`access_log`, {
    interval: '1d',
    path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: logStream }))

//Set up routing
app.use('/', postRoute)

//Error 404 page
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function (err, req, res, next) {
    res.locals.error = err
    res.locals.message = err.message

    //render error page
    res.status(err.status || 500);
    res.render('error')
})

//start server listener on port 3000
http.createServer(app).listen('3000', () => {
    console.log('server listening on port 3000')
})