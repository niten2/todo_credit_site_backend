import * as mongoose from "mongoose"

const validateEmail = (email: string): boolean => {
  if (email === "" || email === undefined) {
    return true
  }

  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return emailRegexp.test(email)
}

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

schema.virtual('total_sum_loans').get(function(): number {
  return this.loans.reduce((acc: number, loan: { sum: number }) => {
    return acc += loan.sum
  }, 0)
})

export default mongoose.model<ClientType>('Client', schema)
