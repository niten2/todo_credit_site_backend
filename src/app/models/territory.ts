import * as mongoose from "mongoose"

export interface TerritoryType extends mongoose.Document {
  name: string
  rate: number
}

const schema = new mongoose.Schema({
  name: {
    type: String,
  },

  rate: {
    type: Number,
  },
}, {
  timestamps: true
})

export default mongoose.model<TerritoryType>('Territory', schema)
