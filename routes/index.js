'use strict'

const { Router } = require('express')

const router = Router()

// load all API routes
router.use('/auth', require('./auth'))
router.use('/event', require('./event'))

module.exports = router
