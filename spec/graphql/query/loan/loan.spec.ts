import { Loan } from "config/initialize/mongoose"

const query = `
  query loan($id: ID!) {
    loan(id: $id) {
      ${matchers.loan_attr()}
    }
  }
`

describe("valid params given", () => {
  let loan
  let client
  let res

  beforeEach(async () => {
    client = await factory.create('client')
    loan = await factory.create('loan')
    await client.addLoan(loan)

    const variableValues = {
      id: loan.id
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should have loan_json', async () => {
    expect(res.data.loan).toEqual(matchers.loan_json())
  })

})

describe("wrong params given", () => {

  it('should return error', async () => {
    const variableValues = {
      id: "string"
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })

})

describe("unauthorized", () => {
  let res
  let client

  beforeEach(async () => {
    let client = await factory.create('client')
    let loan = await factory.create('loan')
    await client.addLoan(loan)

    const variableValues = {
      id: loan.id
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json())
  })
})
