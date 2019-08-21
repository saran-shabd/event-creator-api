'use strict'

const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')

// storage location of email templates
const templates = path.join(__dirname, '..', 'email-templates')

/**
 * utility method to get configured email transport
 */
const getEmailTransport = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secureConnection: false,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      ciphers: 'SSLv3'
    }
  })
}

/**
 * utility method to get email template
 */
const getEmailTemplate = emailType => {
  return fs.readFileSync(path.join(templates, `../templates/${emailType}.html`))
}

module.exports = {
  getEmailTransport,
  getEmailTemplate
}
