import User from '../models/user.js'
import cryptoRandomString from 'crypto-random-string'
import bcrypt from 'bcrypt'
import { transporter } from './auth.js'

/*   User signup with email Verification using nodemailer service  */

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const check = await User.findOne({ email })
    if (!check) {
      const user = new User({
        name,
        email,
        password,
        emailToken: cryptoRandomString({ length: 100, type: 'url-safe' }),
        isVerified: false
      })
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword

      /*    Saving User -> Database */
      const newUser = await user.save()

      /* Providing details to send mail to the user */
      const mailOptions = {
        from: '<>Password-reset Application built using Mern stack<>',
        to: user.email,
        subject: 'Please verify your credential fro account activation',
        html: `<h2> Hey ${user.name} ! Thanks for registering with us </h2>
    <h4>Please verify your mail to move forward. you are just a click away</h4>
    <a href='https://${req.headers.host}/api/verify-email?token=${user.emailToken}'>click to verify</a> 
    `
      }

      /*      Sending email to user   */
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.error('Error in sending verification email', err)
        } else {
          console.log('verification email is sent to your email account')
        }
      })
      res.status(200).json(newUser)
    } else {
      res
        .status(400)
        .json('USer with this given email is already exists. Please Login')
    }
  } catch (err) {
    console.error('Error in registering the user..', err)
    return res.status(400).json('Error in registering the user')
  }
}
