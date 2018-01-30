const query = `
  query {
    clients {
      ${matchers.client_attr()}
    }
  }
`

describe("", () => {

  it('should return users', async () => {
    let client = await factory.create('client')
    const res = await execGraphql({ query })

    expect(res.data.clients).toContainEqual(matchers.client_json())
  })

})
