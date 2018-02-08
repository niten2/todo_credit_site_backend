const query = `
  query {
    clients {
      ${matchers.client_attr}
    }
  }
`

describe("", () => {

  it('should return users', async () => {
    let client = await factory.create('client')
    const res = await execGraphql({ query })

    expect(res.data.clients).toContainEqual(matchers.client_json)
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
