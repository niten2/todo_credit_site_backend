import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"
import * as crypto from "crypto"
import { validateEmail } from "app/services/utils"

export type UserType = mongoose.Document & {
  full_name: string
  email: string

  login: string
  password: string
  role: string

  phone: string

  territory: string

  createdAt: string
  updatedAt: string

  comparePassword: (candidatePassword: string) => Promise<boolean>
}

const schema = new mongoose.Schema({

  full_name: {
    type: String,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  login: String,
  password: String,

  role: {
    type: String,
    default: "manager",
    enum: ["admin", "manager"],
  },

  phone: {
    type: String,
  },

  territory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Territory'
  },

}, {
  timestamps: true
})

schema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  return next()
})

schema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model<UserType>('User', schema)
