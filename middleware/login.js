import jwt from 'jsonwebtoken'

export const login = async (req, res, next) => {
  const token = req.cookies['access-token']
  if (token) {
    const validateToken = await jwt.verify(token, process.env.SECRET_KEY)
    if (validateToken) {
      res.user = validateToken.id
      next()
    } else {
      console.log('token is expired!')
      res.json('Redirecting to Login Page')
    }
  } else {
    res.json('Redirecting to Login')
    console.log('Token is Not Found')
  }
}
