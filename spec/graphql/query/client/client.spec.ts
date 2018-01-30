import { Client, Loan } from "config/initialize/mongoose"

const query = `
  query client($id: ID!) {
    client(id: $id) {
      ${matchers.client_attr()}
    }
  }
`

describe("valid params given", () => {
  let client
  let loan
  let res

  beforeEach(async () => {
    client = await factory.create('client')
    loan = await factory.create('loan')
    await client.addLoan(loan)

    const variableValues = {
      id: client.id
    }

    res = await execGraphql({ query, variableValues })
  })


  it('should have client_json', async () => {
    expect(res.data.client).toEqual(matchers.client_json())
  })

  it('should have loan_json', async () => {
    expect(res.data.client.loans).toContainEqual(matchers.loan_json())
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
