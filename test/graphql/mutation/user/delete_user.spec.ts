import { User } from "config/mongoose"

const query = `
  mutation deleteUser($input: IdInput!) {
    deleteUser(input: $input) {
      ${matchers.user_attr}
    }
  }
`

describe("valid params given", () => {

  describe("user admin", () => {
    let res
    let user
    const password = "password"

    beforeEach(async () => {
      user = await factory.create('userAdmin', { password })

      const variableValues = {
        input: {
          id: user.id,
        }
      }

      res = await execGraphql({ query, variableValues, user })
    })

    it('should return valid response', async () => {
      expect(res.data.deleteUser).toEqual(matchers.user_json)
    })

    it('should destroy user', async () => {
      user = await User.findById(user.id)

      expect(user).toEqual(null)
    })
  })

})

describe("wrong params given", () => {
  it('should return error', async () => {
    const variableValues = {
      input: {
        id: "1234567"
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json)
  })
})

describe("unauthorized", () => {
  let res
  let user
  const password = "password"

  beforeEach(async () => {
    user = await factory.create('userAdmin', { password })

    const variableValues = {
      input: {
        id: user.id,
      }
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
