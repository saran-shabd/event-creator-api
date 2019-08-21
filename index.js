'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// load environment variables
require('dotenv').config()

const app = express()

// apply CORS middlware
app.use(cors())

// apply body-parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// load all API routes
app.use('', require('./routes'))

// listen for requests
const port = process.env.PORT || 2323
app.listen(port, () => console.log(`server is up and running at port ${port}`))
