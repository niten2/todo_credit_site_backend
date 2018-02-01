const query = `
  query {
    users {
      ${matchers.user_attr()}
    }
  }
`

describe("valid params given", () => {

  it('should return users', async () => {
    let user = await factory.create('userAdmin')
    const res = await execGraphql({ query, user })

    expect(res.data.users).toContainEqual(matchers.user_json())
  })

})

describe("wrong params given", () => {
  it('should return error', async () => {
    const res = await execGraphql({ query })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
