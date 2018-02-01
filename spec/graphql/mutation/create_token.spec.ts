import { User } from "config/initialize/mongoose"

const password = "password"
const query = `
  mutation createToken($input: TokenCreateInput!) {
    createToken(input: $input) {
      id
      email
      value
    }
  }
`

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

  describe("attempt more", () => {
    let res
    let user

    beforeEach(async () => {
      user = await factory.create('user', { password, blocked: false })

      const variableValues = {
        input: {
          email: user.email,
          password: "wrong_password",
        }
      }

      res = await execGraphql({ query, variableValues })
      res = await execGraphql({ query, variableValues })
      res = await execGraphql({ query, variableValues })
      res = await execGraphql({ query, variableValues })
    })

    it('should return wrong password', async () => {
      expect(res.errors[0]).toEqual(
        expect.objectContaining({
          message: 'wrong password',
          locations: expect.any(Array),
          path: expect.any(Array),
        }),
      )
    })

    it('should blocker user', async () => {
      user = await User.findById(user.id)
      expect(user.blocked).toEqual(true)
    })
  })

  describe("password not valid", () => {
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
  })

  describe("user not found", () => {
    it('should error', async () => {
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

})
