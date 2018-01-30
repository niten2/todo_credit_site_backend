import * as mongoose from "mongoose"

export type TerritoryType = mongoose.Document & {
  name: string,
  rate: string,
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
