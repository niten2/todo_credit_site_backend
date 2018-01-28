import * as mongoose from "mongoose"
import * as utils from "app/services/utils"

export type ClientType = mongoose.Document & {
  full_name: string,
  passport: string,
  phone: string,
  territory: string,
  email: string,
  user: string,

  createdAt: string,
  updatedAt: string,
}

const schema = new mongoose.Schema({

  full_name: {
    type: String,
  },

  passport: {
    type: String,
  },

  phone: {
    type: String,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [utils.validateEmail, 'Please fill a valid email address'],
  },

  territory: {
    type: String,
    default: "one",
    enum: ["one", "two", "three"],
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

}, {
  timestamps: true
})

export default mongoose.model<ClientType>('Client', schema)
