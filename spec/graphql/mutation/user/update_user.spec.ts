import { User } from "config/initialize/mongoose"

describe("valid params given", () => {
  let res
  let user
  const new_name = "new_name"

  beforeEach(async () => {
    user = await factory.create('user')

    const query = `
      mutation updateUser($input: UserUpdateInput!) {
        updateUser(input: $input) {
          name
          email
        }
      }
    `
    const variableValues = {
      input: {
        id: user.id,
        name: new_name,
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return valid response', async () => {
    expect(res.data.updateUser).toEqual(
      expect.objectContaining({
        name: new_name,
        email: user.email,
      })
    )
  })

  it('should update user', async () => {
    user = await User.findById(user.id)

    expect(res.data.updateUser).toEqual(
      expect.objectContaining({
        name: new_name,
        email: user.email,
      })
    )
  })
})

describe("wrong params given", () => {
  it('should return error', async () => {
    const query = `
      mutation updateUser($input: UserUpdateInput!) {
        updateUser(input: $input) {
          name
          email
        }
      }
    `
    const variableValues = {
      input: {
        id: "1234567"
        name: "test"
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
