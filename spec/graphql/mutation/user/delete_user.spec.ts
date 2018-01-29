import { User } from "config/initialize/mongoose"

describe("valid params given", () => {
  let res
  let user
  const password = "password"

  beforeEach(async () => {
    user = await factory.create('user', { password })

    const query = `
      mutation deleteUser($input: IdInput!) {
        deleteUser(input: $input) {
          name
          email
        }
      }
    `
    const variableValues = {
      input: {
        id: user.id,
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return valid response', async () => {
    expect(res.data.deleteUser).toEqual(matchers.user_json(user))
  })

  it('should destroy user', async () => {
    user = await User.findById(user.id)

    expect(user).toEqual(null)
  })
})

describe("wrong params given", () => {
  it('should return error', async () => {
    const query = `
      mutation deleteUser($input: IdInput!) {
        deleteUser(input: $input) {
          name
          email
        }
      }
    `
    const variableValues = {
      input: {
        id: "1234567"
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
