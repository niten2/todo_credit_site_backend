import * as mongoose from "mongoose"
import Client from "./client"
import { calculatePersentLoan, days_between } from "app/services/utils"

const OVERDUE_RATE = 15

export interface LoanType extends mongoose.Document {
  sum: number
  date_start: string
  date_end: string
  client: string

  total: any
}

const schema = new mongoose.Schema({
  sum: {
    required: true,
    type: Number,
  },

  date_start: {
    required: true,
    type: Date,
  },

  date_end: {
    required: true,
    type: Date,
  },

  client: {
    required: true,
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

  let options =  {
    sum: this.sum,
    territory: client.territory.rate,
    date_start: this.date_start,
    date_end: this.date_end,
  }

  let persent = calculatePersentLoan(options)

  if (current_date < this.date_end) {
    return this.sum + persent
  }

  const increase_options =  {
    sum: this.sum,
    territory: client.territory.rate,
    date_start: this.date_end,
    date_end: current_date,
    overdue: OVERDUE_RATE,
  }

  let overdue_persent = calculatePersentLoan(increase_options)

  return this.sum + persent + overdue_persent
})

export default mongoose.model<LoanType>('Loan', schema)
