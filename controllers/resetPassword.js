import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import _ from 'lodash'

/*      Reset the Password */

export const resetPassword = async (req, res) => {
  try {
    let { password, resetLink } = req.body
    if (resetLink) {
      resetLink = resetLink.slice(10)
      jwt.verify(
        resetLink,
        process.env.SECRET_KEY,
        function (err, decodedData) {
          if (err) {
            return res.status(401).json('Incorrect token or token expired')
          }
          User.findOne({ resetLink }, async (err, user) => {
            if (err || !user) {
              return res.status(400).json('Password reset link is expired')
            }

            // hashing Password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const obj = {
              password: hashedPassword,
              resetLink: ''
            }

            user = _.extend(user, obj)
            user.save((err, result) => {
              if (err) {
                return res.status(400).json('Reset Password error', err)
              } else {
                return res.status(200).json('Password changed Successfully')
              }
            })
          })
        }
      )
    } else {
      res
        .status(400)
        .json('It seems the token is expired. Please generate new one')
    }
  } catch (err) {
    console.log('Error in resetting the password', err)
    res.status(400).json('Error in resetting the password')
  }
}
