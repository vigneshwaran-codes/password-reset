import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

/*   Using Nodemailer to send verification email to user for activating the account through link */

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})
