const query = `
  query {
    users {
      ${matchers.user_attr()}
    }
  }
`

describe("", () => {

  it('should return users', async () => {
    let user = await factory.create('user')
    const res = await execGraphql({ query })

    expect(res.data.users).toContainEqual(matchers.user_json())
  })

})
