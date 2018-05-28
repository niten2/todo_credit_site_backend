import { User } from "config/mongoose"

const password = "password"
const query = `
  mutation createToken($input: TokenCreateInput!) {
    createToken(input: $input) {
      token
      user {
        ${matchers.user_attr}
      }
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
        login: user.login,
        password: password,
      }
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return token', async () => {
    expect(res.data.createToken.token).toEqual(expect.any(String))
  })

  it('should return user', async () => {
    expect(res.data.createToken.user).toEqual(matchers.user_json)
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
          login: user.login,
          password: "wrong_password",
        }
      }

      res = await execGraphql({ query, variableValues, unauth: true  })
      res = await execGraphql({ query, variableValues, unauth: true  })
      res = await execGraphql({ query, variableValues, unauth: true  })
      res = await execGraphql({ query, variableValues, unauth: true  })
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
          login: user.login,
          password: "other_password",
        }
      }

      const res = await execGraphql({ query, variableValues, unauth: true  })

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
          login: "otherUserLogin",
          password: "password",
        }
      }

      const res = await execGraphql({ query, variableValues, unauth: true })

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
