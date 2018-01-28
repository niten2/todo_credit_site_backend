import { User } from "config/initialize/mongoose"

const query = `
  mutation createToken($input: TokenInput!) {
    createToken(input: $input) {
      id
      email
      value
    }
  }
`

const password = "password"

describe("valid params given", () => {
  let res
  let user
  const password = "password"

  beforeEach(async () => {
    user = await factory.create('user', { password })

    const variableValues = {
      input: {
        email: user.email,
        password: password,
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return valid response', async () => {
    expect(res.data.createToken).toEqual(
      expect.objectContaining({
        id: user.id,
        email: user.email,
        value: expect.any(String),
      }),
    )
  })
})

describe("wrong params given", () => {
  it('should return wrong password', async () => {
    let user = await factory.create('user', { password })

    const variableValues = {
      input: {
        email: user.email,
        password: "other_password",
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors[0]).toEqual(
      expect.objectContaining({
        message: 'wrong password',
        locations: expect.any(Array),
        path: expect.any(Array),
      }),
    )
  })

  it('should return user not found', async () => {
    let user = await factory.create('user', { password })

    const variableValues = {
      input: {
        email: "otherUser@email.com",
        password: "password",
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors[0]).toEqual(
      expect.objectContaining({
        message: 'user not found',
        locations: expect.any(Array),
        path: expect.any(Array),
      }),
    )
  })
})
