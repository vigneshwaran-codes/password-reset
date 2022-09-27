import { Router } from 'express'
import { register } from '../controllers/register.js'
import { verifyEmail, login } from '../controllers/login.js'
import { logout } from '../controllers/logout.js'
import { forgotPassword } from '../controllers/forgotPassword.js'
import { resetPassword } from '../controllers/resetPassword.js'
import { verifyEmailBeforeLogin } from '../middleware/verifyEmail.js'

const router = Router()

router.post('/register', register)
router.post('/login', verifyEmailBeforeLogin, login)
router.get('/verify-email', verifyEmail)
router.get('/logout', logout)

/*  For Password Reset Flow */
router.put('/forgot-password', forgotPassword)
router.put('/reset-password', resetPassword)

export default router
