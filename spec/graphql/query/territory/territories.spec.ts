const query = `
  query {
    territories {
      ${matchers.territory_attr()}
    }
  }
`

describe("", () => {

  it('should return territories', async () => {
    let territory = await factory.create('territory')
    const res = await execGraphql({ query })

    expect(res.data.territories).toContainEqual(matchers.territory_json())
  })

})

describe("unauthorized", () => {
  let res

  beforeEach(async () => {
    let territory = await factory.create('territory')

    res = await execGraphql({ query, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json())
  })
})
