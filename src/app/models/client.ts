import * as mongoose from "mongoose"

export type ClientType = mongoose.Document & {
  full_name: string,
  passport: string,
  phone: string,
  territory: string,

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

  territory: {
    type: String,
  },

}, {
  timestamps: true
})

export default mongoose.model<ClientType>('Client', schema)
