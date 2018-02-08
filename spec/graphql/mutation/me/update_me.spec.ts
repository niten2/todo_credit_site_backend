import { User } from "config/initialize/mongoose"

const query = `
  mutation updateMe($input: MeUpdateInput!) {
    updateMe(input: $input) {
      ${matchers.user_attr}
    }
  }
`

describe("valid params given", () => {
  const new_full_name = "new_full_name"
  let res
  let user

  beforeEach(async () => {
    user = await factory.create('userAdmin')

    const variableValues = {
      input: {
        full_name: new_full_name,
      }
    }

    res = await execGraphql({ query, variableValues, user })
  })

  it('should return valid response', async () => {
    expect(res.data.updateMe).toEqual(
      expect.objectContaining({
        id: user.id,
        full_name: new_full_name,
      })
    )
  })

  it('should update userManager', async () => {
    user = await User.findById(user.id)

    expect(user.full_name).toEqual(new_full_name)
  })

})

describe("unauthorized", () => {
  const new_full_name = "new_full_name"
  let res
  let user

  beforeEach(async () => {
    user = await factory.create('userAdmin')

    const variableValues = {
      input: {
        full_name: new_full_name,
      }
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
