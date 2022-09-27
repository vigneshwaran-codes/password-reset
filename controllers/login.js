import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/*      Verification of link sent to user email   */

export const verifyEmail = async (req, res) => {
  try {
    const emailToken = req.query.token
    const user = await User.findOne({ emailToken })
    if (user) {
      user.emailToken = null
      user.isVerified = true
      await user.save()
      res.status(200).json('Email Verification done Successfully')
    } else {
      res.status(400).json('Email Verification Unsuccessful')
    }
  } catch (err) {
    console.error('Email is verifying the email', err)
  }
}
/*      Creating a token using jwt (JSONWEBTOKEN) so that the routes are protected based on login */

export const createToken = (id) => {
  return jwt.sign(id, process.env.SECRET_KEY)
}
/*  User -> Login */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const findUser = await User.findOne({ email })
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password)
      if (match) {
        // create token
        const token = createToken(findUser.password)
        // store a token in  cookie
        res.cookie('access-token', token)
        res.status(200).json('Login Successfully')
      } else {
        res
          .status(400)
          .json('Incorrect password! Check your password and try again')
      }
    } else {
      res
        .status(400)
        .json("User doesn't exists with this email. Please register.")
    }
  } catch (err) {
    console.error('Error in user login...')
    res.status(400).json('Error in user login. Please try login again ')
  }
}
