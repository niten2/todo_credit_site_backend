import * as mongoose from "mongoose"

export type LoanType = mongoose.Document & {
  date_start: string
  date_end: string
  client: string
}

const schema = new mongoose.Schema({
  date_start: {
    type: Date,
  },

  date_end: {
    type: Date,
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },

}, {
  timestamps: true
})

export default mongoose.model<LoanType>('Loan', schema)
