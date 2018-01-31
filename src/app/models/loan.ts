import * as mongoose from "mongoose"
import { Client } from "config/initialize/mongoose"
import { calculatePersentLoan, days_between } from "app/services/utils"

export type LoanType = mongoose.Document & {
  sum: number
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

schema.virtual('total').get(function (): number {
  if (!(this.client && this.client.territory && this.client.territory.rate)) {
    throw new Error("need this.client.territory.rate")
  }

  const current_date = new Date()

  let values =  {
    sum: this.sum,
    territory: this.client.territory.rate,
    date_start: this.date_start,
    date_end: this.date_end,
  }

  let persent = calculatePersentLoan(values)

  if (current_date < this.date_end) {
    return this.sum + persent
  }

  const overdue_rate = 15

  const overdue_values =  {
    sum: this.sum,
    territory: overdue_rate,
    date_start: this.date_end,
    date_end: current_date,
  }

  let overdue_persent = calculatePersentLoan(overdue_values)

  return this.sum + persent + overdue_persent
})

export default mongoose.model<LoanType>('Loan', schema)
