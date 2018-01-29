import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"
import * as crypto from "crypto"
import { validateEmail } from "app/services/utils"

export type UserType = mongoose.Document & {
  name: string,
  email: string,
  password: string,
  passwordResetToken: string,
  role: string

  comparePassword: (candidatePassword: string) => Promise<boolean>,

  createdAt: string,
  updatedAt: string,
}

const schema = new mongoose.Schema({

  name: {
    type: String,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  password: String,
  passwordResetToken: String,

  role: {
    type: String,
    default: "manager",
    enum: ["admin", "manager"],
  },

  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  }],

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
