import { Loan } from "config/initialize/mongoose"

const query = `
  mutation updateLoan($input: LoanUpdateInput!) {
    updateLoan(input: $input) {
      ${matchers.loan_attr()}
    }
  }
`

describe("valid params given", () => {

  describe("user admin", () => {
    const full_name = "new_name"
    let res
    let user
    let loan
    let new_loan

    beforeEach(async () => {
      user = await factory.create('userAdmin')
      loan = await factory.create('loan')
      new_loan = await factory.build('loan')

      const variableValues = {
        input: {
          id: loan.id,
          sum: new_loan.sum,
          date_start: new_loan.date_start,
          date_end: new_loan.date_end,
        }
      }

      res = await execGraphql({ query, variableValues, user })


    })

    it('should change loan', async () => {
      expect(res.data.updateLoan.id).toEqual(loan.id)
    })

    it('should update client', async () => {
      loan = await Loan.findById(loan.id)

      expect(loan).toEqual(expect.objectContaining({
        id: loan.id,
        sum: new_loan.sum,
      })
    })
  })

})

describe("wrong params given", () => {

  describe("user manager", () => {
    const full_name = "new_name"
    let res
    let user
    let loan
    let new_loan

    beforeEach(async () => {
      user = await factory.create('userManager')
      loan = await factory.create('loan')
      new_loan = await factory.build('loan')

      const variableValues = {
        input: {
          id: loan.id,
          sum: new_loan.sum,
          date_start: new_loan.date_start,
          date_end: new_loan.date_end,
        }
      }

      res = await execGraphql({ query, variableValues, user })
    })

    it('should not change loan, should return error response', async () => {
      expect(res.errors).toContainEqual(matchers.errors_json())
    })

    it('should not update loan', async () => {
      loan = await Loan.findById(loan.id)

      expect(loan).not.toEqual(expect.objectContaining({
        id: loan.id,
        sum: new_loan.sum,
      })
    })
  })

  describe("wrong id", () => {
    it('should return error', async () => {
      const variableValues = {
        input: {
          id: "1234567"
          full_name: "full_name",
        }
      }

      const res = await execGraphql({ query, variableValues })

      expect(res.errors).toContainEqual(matchers.errors_json())
    })
  })

})
