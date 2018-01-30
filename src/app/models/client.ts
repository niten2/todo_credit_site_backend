import * as mongoose from "mongoose"
import { validateEmail } from "app/services/utils"

export type ClientType = mongoose.Document & {
  full_name: string,
  passport: string,
  phone: string,
  territory: string,
  email: string,
  user: string,
  mark_as_deleted: boolean

  createdAt: string,
  updatedAt: string,
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
    required: [true, 'Email address is required'],
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  passport: {
    type: String,
  },

  phone: {
    type: String,
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

  mark_as_deleted: {
    type: Boolean,
  },

}, {
  timestamps: true
})

export default mongoose.model<ClientType>('Client', schema)
