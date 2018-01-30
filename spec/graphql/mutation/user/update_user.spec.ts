import { User } from "config/initialize/mongoose"

const query = `
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      ${matchers.user_attr()}
    }
  }
`

describe("valid params given", () => {
  let res
  let user
  const new_full_name = "new_full_name"

  beforeEach(async () => {
    user = await factory.create('user')

    const variableValues = {
      input: {
        id: user.id,
        full_name: new_full_name,
      }
    }

    res = await execGraphql({ query, variableValues })
  })

  it('should return valid response', async () => {
    expect(res.data.updateUser).toEqual(
      expect.objectContaining({
        full_name: new_full_name,
        email: user.email,
      })
    )
  })

  it('should update user', async () => {
    user = await User.findById(user.id)

    expect(res.data.updateUser).toEqual(
      expect.objectContaining({
        full_name: new_full_name,
        email: user.email,
      })
    )
  })
})

describe("wrong params given", () => {
  it('should return error', async () => {
    const variableValues = {
      input: {
        id: "1234567"
        full_name: "test"
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })
})
