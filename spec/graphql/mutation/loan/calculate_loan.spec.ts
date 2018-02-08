import { Loan, Client } from "config/initialize/mongoose"

const query = `
  mutation calculateLoan($input: LoanCalculateInput!) {
    calculateLoan(input: $input) {
      total
    }
  }
`

describe("valid params given", () => {
  describe("user manager", () => {
    let res
    let loan
    let client
    const password = "password"

    beforeEach(async () => {
      client = await factory.create('client')

      const variableValues = {
        input: {
          sum: 100,
          date_start: new Date(),
          date_end: new Date(),
          client: client.id,
        }
      }

      res = await execGraphql({ query, variableValues })
    })

    it('should return valid response', async () => {
      expect(res.data.calculateLoan.total).toBeType("number")
    })

  })
})

describe("wrong params given", () => {
  it('should return error', async () => {
    const variableValues = {
      input: {}
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json)
  })
})

describe("unauthorized", () => {
  let res
  let loan
  let client
  const password = "password"

  beforeEach(async () => {
    client = await factory.create('client')

    const variableValues = {
      input: {
        sum: 100,
        date_start: new Date(),
        date_end: new Date(),
        client: client.id,
      }
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
