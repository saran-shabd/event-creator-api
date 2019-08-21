'use string'

const jwt = require('jsonwebtoken')

// import string utility functions
const { containsEmptyString, encryptStr, decryptStr } = require('./string')

/**
 * @param {*} object
 * @param {*} tokenType
 * @description utility method to encode token
 */
const encodeToken = (object, tokenType) => {
  return encryptStr(jwt.sign(object, `${process.env.APP_SECRET}.${tokenType}`))
}

/**
 * @param {*} token
 * @param {*} tokenType
 * @description utility method to decode token
 */
const decodeToken = (token, tokenType) => {
  try {
    const decoded = jwt.verify(
      decryptStr(token),
      `${process.env.APP_SECRET}.${tokenType}`
    )
    return { status: true, decoded }
  } catch (err) {
    return { status: false, decoded: null }
  }
}

/**
 * @param {*} tokenType
 * @description utility method to verify tokens
 */
const verifyTokenMiddleware = (tokenType, dbCheck = false) => {
  return (request, response, next) => {
    let { token } = request.body
    if (containsEmptyString([token]))
      return response.status(401).json({
        status: false,
        message: 'private route. authorization required'
      })
    let decryptedToken = decodeToken(token, tokenType)
    if (!decryptedToken.status)
      return response.status(401).json({
        status: false,
        message: 'private route. authorization required'
      })

    if (dbCheck) {
      // check user access token in database
    }

    request.decryptToken = decryptedToken
    next()
  }
}

/**
 * @param {*} tokenType
 * @description utility method to verify tokens for GET requests
 */
const verifyTokenMiddlewareGetRequests = (tokenType, dbCheck = false) => {
  return (request, response, next) => {
    let { token } = request.query
    if (containsEmptyString([token]))
      return response.status(401).json({
        status: false,
        message: 'private route. authorization required'
      })
    let decryptedToken = decodeToken(token, tokenType)
    if (!decryptedToken.status)
      return response.status(401).json({
        status: false,
        message: 'private route. authorization required'
      })

    if (dbCheck) {
      // check user access token in database
    }

    request.decryptToken = decryptedToken
    next()
  }
}

module.exports = {
  encodeToken,
  decodeToken,
  verifyTokenMiddleware,
  verifyTokenMiddlewareGetRequests
}
