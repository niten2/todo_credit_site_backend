const query = `
  query {
    users {
      ${matchers.user_attr}
    }
  }
`

describe("valid params given", () => {
  it('should return other users', async () => {
    let user = await factory.create('userAdmin')
    await factory.create('user')
    const res = await execGraphql({ query, user })

    expect(res.data.users).toContainEqual(matchers.user_json)
  })

  it('should not return current users', async () => {
    let user = await factory.create('userAdmin')
    const res = await execGraphql({ query, user })

    expect(res.data.users).toEqual([])
  })

  describe("filter role manager", () => {
    const query = `
      query users($input: UsersInput) {
        users(input: $input) {
          ${matchers.user_attr}
        }
      }
    `

    it('should only role manager', async () => {
      let user = await factory.create('userAdmin')
      let userAdmin = await factory.create('userAdmin')
      let userManager = await factory.create('userManager')

      const variableValues = {
        input: {
          role: "manager",
        }
      }

      const res = await execGraphql({ query, variableValues, user })

      expect(res.data.users).toContainEqual(expect.objectContaining({
        id: userManager.id
      })

      expect(res.data.users).not.toContainEqual(expect.objectContaining({
        id: userAdmin.id
      })
    })

  })

})

describe("wrong params given", () => {
  it('should return error', async () => {
    const res = await execGraphql({ query })

    expect(res.errors).toContainEqual(matchers.errors_json)
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
