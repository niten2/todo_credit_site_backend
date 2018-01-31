import * as mongoose from "mongoose"

export type LoanType = mongoose.Document & {
  date_start: string
  date_end: string
  client: string
  sum: number
}

const schema = new mongoose.Schema({
  date_start: {
    type: Date,
  },

  date_end: {
    type: Date,
  },

  sum: {
    type: Number,
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },

}, {
  timestamps: true
})

export default mongoose.model<LoanType>('Loan', schema)
