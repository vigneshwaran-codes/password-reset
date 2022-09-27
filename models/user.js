import mongoose from 'mongoose'
const { Schema } = mongoose
const userSchema = Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name field is required',
    min: 5,
    max: 64
  },
  email: {
    type: String,
    trim: true,
    required: 'Email field is required',
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: 'Password must be min 8 characters',
    min: 8,
    max: 250
  },
  emailToken: {
    type: String
  },
  isVerified: {
    type: Boolean
  },
  resetLink: {
    data: String,
    default: ''
  }
},
{ timestamps: true }
)

export default mongoose.model('User', userSchema)
