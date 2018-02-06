const query = `
  query {
    users {
      ${matchers.user_attr()}
    }
  }
`

describe("valid params given", () => {

  it('should return other users', async () => {
    let user = await factory.create('userAdmin')
    await factory.create('user')
    const res = await execGraphql({ query, user })

    expect(res.data.users).toContainEqual(matchers.user_json())
  })

  it('should not return current users', async () => {
    let user = await factory.create('userAdmin')
    const res = await execGraphql({ query, user })

    expect(res.data.users).toEqual([])
  })
})

describe("wrong params given", () => {
  it('should return error', async () => {
    const res = await execGraphql({ query })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})

describe("unauthorized", () => {
  let res

  beforeEach(async () => {
    res = await execGraphql({ query, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json())
  })
})
