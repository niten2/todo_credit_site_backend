import { User } from "config/initialize/mongoose"

describe("valid params given", () => {
  let res
  let user
  const password = "password"

  beforeEach(async () => {
    user = await factory.build('user', { password })

    const query = `
      mutation createUser($input: UserInput!) {
        createUser(input: $input) {
          name
          email
        }
      }
    `
    const variableValues = {
      input: {
        name: user.name,
        email: user.email,
        password: password,
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return valid response', async () => {
    expect(res.data.createUser).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
      }),
    )
  })

  it('should create user', async () => {
    user = await User.findOne({ name: user.name })

    expect(user).toEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
      }),
    )
  })

})

describe("wrong params given", () => {

  it('should return error', async () => {
    const query = `
      mutation createUser($input: UserInput!) {
        createUser(input: $input) {
          name
          email
        }
      }
    `
    const variableValues = {
      input: {}
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors[0]).toEqual(
      expect.objectContaining({
        message: expect.any(String),
        locations: expect.any(Array),
        path: undefined,
      }),
    )
  })

})
