'use strict'

const bcrypt = require('bcryptjs')
const cryptr = require('cryptr')

const appCryptr = new cryptr(process.env.APP_SECRET)

/**
 * @param {*} args
 * @description utility method to check for empty strings in an array
 */
const containsEmptyString = args => {
  for (let i = 0; i < args.length; ++i)
    if (undefined === args[i] || '' === args[i]) return true
  return false
}

/**
 * @param {*} email
 * @description utility method to validate email address format
 */
const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

/**
 * @param {*} length
 * @description utility method to generate an alpha-numeric string
 */
const generateRandomAlphaNumericStr = length => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * @param {*} str
 * @description utility method to hash a string
 */
const hashStr = str => {
  let salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(str, salt)
}

/**
 * @param {*} hash
 * @param {*} str
 * @description utility method to compare hashed string to a plain text
 */
const verifyHashStr = (hash, str) => {
  return bcrypt.compareSync(str, hash)
}

/**
 * @param {*} str
 * @description utility method to encrypt a string
 */
const encryptStr = str => {
  return appCryptr.encrypt(str)
}

/**
 * @param {*} str
 * @description utility method to decrypt a string
 */
const decryptStr = str => {
  return appCryptr.decrypt(str)
}

module.exports = {
  containsEmptyString,
  validateEmail,
  generateRandomAlphaNumericStr,
  hashStr,
  verifyHashStr,
  encryptStr,
  decryptStr
}
