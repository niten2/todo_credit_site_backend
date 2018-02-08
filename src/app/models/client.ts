import * as mongoose from "mongoose"
import { validateEmail } from "app/services/utils"

export interface ClientType extends mongoose.Document {
  full_name: string
  passport: string
  phone: string
  territory: any | string // NOTE should be TerritoryType || string

  email: string
  mark_as_deleted: boolean
  total_sum_loans: number
  loans: [string]

  createdAt: string
  updatedAt: string

  addLoan: (loan: any) => Promise<any>
}

const schema = new mongoose.Schema({
  full_name: {
    required: true,
    type: String,
  },

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  passport: {
    required: true,
    type: String,
  },

  phone: {
    required: true,
    type: String,
  },

  territory: {
    required: true,
    ref: 'Territory',
    type: mongoose.Schema.Types.ObjectId,
  },

  mark_as_deleted: {
    default: false,
    type: Boolean,
  },

  loans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Loan'
  }],
}, {
  timestamps: true
})

schema.methods.addLoan = async function(loan: any): Promise<any> {
  if (!loan) throw new Error("loan not found")

  await this.loans.addToSet(loan)
  await this.save()

  await loan.set({ client: this.id })
  await loan.save()

  return this
}

schema.virtual('total_sum_loans').get(function(): number {
  return this.loans.reduce((acc: number, loan: { sum: number }) => {
    return acc += loan.sum
  }, 0)
})

export default mongoose.model<ClientType>('Client', schema)
