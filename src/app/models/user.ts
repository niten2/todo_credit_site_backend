import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"
import * as crypto from "crypto"
import { validateEmail } from "app/services/utils"

export interface UserType extends mongoose.Document {
  full_name: string
  email: string

  login: string
  password: string
  role: string

  phone: string

  territory: string
  blocked: boolean
  attempt_login: number

  createdAt: string
  updatedAt: string

  comparePassword: (candidatePassword: string) => Promise<boolean>
  addAttempt: () => Promise<any>
  resetAttempt: () => Promise<any>
}

const schema = new mongoose.Schema({
  full_name: {
    unique: true,
    required: true,
    type: String,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  login: {
    unique: true,
    required: true,
    type: String,
  },

  password: {
    unique: true,
    required: true,
    type: String,
  },

  role: {
    type: String,
    default: "manager",
    enum: ["admin", "manager"],
  },

  phone: {
    unique: true,
    required: true,
    type: String,
  },

  territory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Territory'
  },

  blocked: {
    default: false,
    type: Boolean,
  },

  attempt_login: {
    default: 0,
    type: Number,
  },

}, {
  timestamps: true
})

schema.pre('save', async function(next: any): Promise<any> {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  return next()
})

schema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

schema.methods.addAttempt = async function(): Promise<any> {
  const count_attempt = 4

  await this.set({ attempt_login: this.attempt_login + 1 })

  if (this.attempt_login === count_attempt) {
    await this.set({ blocked: true })
  }

  await this.save()
}

schema.methods.resetAttempt = async function(): Promise<any> {
  if (this.attempt_login != 0) {
    await this.set({ attempt_login: 0 })
    await this.save()
  }
}

export default mongoose.model<UserType>('User', schema)
