import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/auth.js'

dotenv.config()
const app = express()

/*  Middleware  */
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

const PORT = process.env.PORT

// create mongo Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database Established'))
  .catch((err) => console.log(err))

/*  Middleware -> route */
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Welcome ! Reset Password App ')
})

app.listen(PORT, () => {
  console.log('Server is Connected Successfully', PORT)
})
