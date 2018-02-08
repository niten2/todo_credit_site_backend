import * as mongoose from "mongoose"
import Client from "./client"
import { calculatePersentLoan, days_between } from "app/services/utils"

export interface LoanType extends mongoose.Document {
  sum: number
  date_start: string
  date_end: string
  client: string

  total: any
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

schema.virtual('total').get(async function(): Promise<number> {
  let client: any = await Client.findById(this.client).populate("territory")

  if (!(client && client.territory && client.territory.rate)) {
    throw new Error("need this.client.territory.rate")
  }

  const current_date = new Date()

  let values =  {
    sum: this.sum,
    territory: client.territory.rate,
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
