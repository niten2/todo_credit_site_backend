const query = `
  query loans {
    loans {
      ${matchers.loan_attr}
    }
  }
`

describe("with LoansInput", () => {

  const query = `
    query loans($input: LoansInput) {
      loans(input: $input) {
        ${matchers.loan_attr}
      }
    }
  `

  let loan1
  let loan2
  let client
  let res

  beforeEach(async () => {
    client1 = await factory.create('client')
    client2 = await factory.create('client')

    loan1 = await factory.create('loan', {client: client1})
    loan2 = await factory.create('loan', {client: client2})

    const variableValues = {
      input: {
        client: client1.id
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return loans current client', async () => {
    expect(res.data.loans).toContainEqual(expect.objectContaining({
      id: loan1.id
    })
  })

  it('should not return loans other client', async () => {
    expect(res.data.loans).not.toContainEqual(expect.objectContaining({
      id: loan2.id
    })
  })
})

describe("without LoansInput", () => {
  let loan1
  let loan2
  let client
  let res

  beforeEach(async () => {
    client1 = await factory.create('client')
    client2 = await factory.create('client')

    loan1 = await factory.create('loan', {client: client1})
    loan2 = await factory.create('loan', {client: client2})

    res = await execGraphql({ query })
  })

  it('should return loans current client', async () => {
    expect(res.data.loans).toContainEqual(expect.objectContaining({
      id: loan1.id
    })
  })

  it('should return loans other client', async () => {
    expect(res.data.loans).toContainEqual(expect.objectContaining({
      id: loan2.id
    })
  })
})

describe("unauthorized", () => {
  let res

  beforeEach(async () => {
    res = await execGraphql({ query, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
