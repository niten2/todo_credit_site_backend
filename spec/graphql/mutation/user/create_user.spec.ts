import { User } from "config/initialize/mongoose"

const query = `
  mutation createUser($input: UserCreateInput!) {
    createUser(input: $input) {
      full_name
      email
    }
  }
`

describe("valid params given", () => {
  let res
  let user
  const password = "password"

  beforeEach(async () => {
    user = await factory.build('user', { password })

    const variableValues = {
      input: {
        full_name: user.full_name,
        email: user.email,
        password: password,
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return valid response', async () => {
    expect(res.data.createUser).toEqual(matchers.user_json(user))
  })

  it('should create user', async () => {
    user = await User.findOne({ full_name: user.full_name })

    expect(user).toEqual(matchers.user_db(user))
  })

})

describe("wrong params given", () => {
  it('should return error', async () => {
    const variableValues = {
      input: {}
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
