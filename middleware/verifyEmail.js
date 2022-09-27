import User from '../models/user.js'

export const verifyEmailBeforeLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      if (user.isVerified) {
        next()
      } else {
        console.log('Invalid Credentials')
        res.status(400).json('Enter invalid email or password')
      }
    } else {
      next()
    }
  } catch (err) {
    console.error('Error in verify middleware', err)
  }
}
