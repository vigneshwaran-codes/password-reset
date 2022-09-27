import User from '../models/user.js'
import { transporter } from './auth.js'
import { createToken } from './login.js'

/*  Forget Password */

export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email
    console.log('Email:', email)
    const user = await User.findOne({ email })
    // Checking if user is exists
    if (user) {
      // create token
      const resetLink = createToken(user.password)

      // Providing details to send user mail with forget password link
      const mailOptions = {
        from: '<>Password-reset Application built using Mern stack<>',
        to: user.email,
        subject: 'Reset Password',
        html: `<h3> Hey ${user.name} ! Good Day </h3>
                <h2>Forgot your password? Let's get you a new one</h2>
                <h5><strong>Note :</strong> The below link expires in 15 minutes</h5>
                <a href='${process.env.CLIENT_URL}/reset-password/resetLink=${resetLink}'>Reset Your Password</a> 
                `
      }

      /*  Updating password reset Link in db */
      const userUpdate = await User.updateOne({ resetLink })
      if (userUpdate.acknowledged) {
        // Sending email to user
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log('Error in sending password reset email', err)
            res.status(400).json('Error in sending password reset email')
          } else {
            console.log('Password reset email sent Successfully')
            res
              .status(200)
              .json(
                'Password reset email sent successfully. Please Check in spam folder if not found in'
              )
          }
        })
      } else {
        return res.status(400).json('Error in updating link in the db')
      }
    } else {
      return res
        .status(400)
        .json("USer with this email doesn't exists. Please check your email")
    }
  } catch (err) {
    console.log('Error in forget password route', err)
    res.status(400).json('Error in forgetPassword route')
  }
}
