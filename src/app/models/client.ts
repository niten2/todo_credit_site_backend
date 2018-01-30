import * as mongoose from "mongoose"
import { validateEmail } from "app/services/utils"

export type ClientType = mongoose.Document & {
  full_name: string
  passport: string
  phone: string
  territory: string
  email: string
  mark_as_deleted: boolean
  loans: [string]

  createdAt: string
  updatedAt: string

  addLoan: (loan: any) => Promise<any>
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
    validate: [validateEmail, 'Please fill a valid email address'],
  },

  passport: {
    type: String,
  },

  phone: {
    type: String,
  },

  territory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Territory'
  },

  mark_as_deleted: {
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

const autoPopulateLoans = function(next: any) {
  this.populate('loans')
  next()
}

schema.
  pre('findOne', autoPopulateLoans).
  pre('find', autoPopulateLoans)

export default mongoose.model<ClientType>('Client', schema)
