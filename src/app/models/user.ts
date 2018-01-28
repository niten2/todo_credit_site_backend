import * as mongoose from "mongoose"
import * as bcrypt from "bcrypt"
import * as crypto from "crypto"

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
    unique: true
  },

  password: String,
  passwordResetToken: String,

  role: {
    type: String,
    default: "manager",
    enum: ["admin", "manager"],
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
