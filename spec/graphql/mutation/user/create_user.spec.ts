import { User } from "config/initialize/mongoose"

const query = `
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
      ${matchers.user_attr}
    }
  }
`

describe("valid params given", () => {

  describe("user admin", () => {
    let res
    let user
    let new_user
    const password = "password"

    beforeEach(async () => {
      user = await factory.create('userAdmin')
      new_user = await factory.build('user', { password })

      const variableValues = {
        input: {
          full_name: new_user.full_name,
          email: new_user.email,
          login: new_user.login,
          password: password,
          phone: new_user.phone,
          territory: new_user.territory,
        }
      }

      res = await execGraphql({ query, variableValues, user })
    })

    it('should return valid response', async () => {
      expect(res.data.createUser.id).toBeType("string")
    })

    it('should create user', async () => {
      new_user = await User.findOne({ full_name: user.full_name })

      expect(new_user).toEqual(expect.objectContaining({
        full_name: new_user.full_name,
        email: new_user.email,
      })
    })
  })

})

describe("wrong params given", () => {
  describe("user manager", () => {
    let res
    let user
    let new_user
    const password = "password"

    beforeEach(async () => {
      user = await factory.create('userManager')
      new_user = await factory.build('user', { password })

      const variableValues = {
        input: {
          full_name: new_user.full_name,
          email: new_user.email,
          login: new_user.login,
          password: password,
          phone: new_user.phone,
          territory: new_user.territory,
        }
      }

      res = await execGraphql({ query, variableValues, user })
    })

    it('should return valid response', async () => {
      expect(res.errors).toContainEqual(expect.objectContaining({
        message: 'Cannot execute "create" on "User"',
      )
    })

    it('should create user', async () => {
      new_user = await User.findOne({ full_name: new_user.full_name })

      expect(new_user).toBeNull()
    })
  })

  describe("wrong id", () => {
    it('should return error', async () => {
      const variableValues = {
        input: {}
      }

      const res = await execGraphql({ query, variableValues })

      expect(res.errors).toContainEqual(matchers.errors_json)
    })
  })
})

describe("unauthorized", () => {
  let res
  let new_user

  beforeEach(async () => {
    new_user = await factory.build('user')

    const variableValues = {
      input: {
        full_name: new_user.full_name,
        email: new_user.email,
        login: new_user.login,
        password: "password",
        phone: new_user.phone,
        territory: new_user.territory,
      }
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
