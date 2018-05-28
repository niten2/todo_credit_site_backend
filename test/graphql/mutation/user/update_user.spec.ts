import { User } from "config/mongoose"

const query = `
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      ${matchers.user_attr}
    }
  }
`

describe("valid params given", () => {

  describe("user admin", () => {
    const new_full_name = "new_full_name"
    let res
    let user
    let userManager

    beforeEach(async () => {
      user = await factory.create('userAdmin')
      userManager = await factory.create('userManager')

      const variableValues = {
        input: {
          id: userManager.id,
          full_name: new_full_name,
        }
      }

      res = await execGraphql({ query, variableValues, user })
    })

    it('should return valid response', async () => {
      expect(res.data.updateUser).toEqual(
        expect.objectContaining({
          id: userManager.id,
          full_name: new_full_name,
        })
      )
    })

    it('should update userManager', async () => {
      userManager = await User.findById(userManager.id)

      expect(userManager.full_name).toEqual(new_full_name)
    })
  })

})

describe("wrong params given", () => {

  describe("user manager", () => {
    const new_full_name = "new_full_name"
    let res
    let userAdmin
    let userManager

    beforeEach(async () => {
      userAdmin = await factory.create('userAdmin')
      userManager = await factory.create('userManager')

      const variableValues = {
        input: {
          id: userAdmin.id,
          full_name: new_full_name,
        }
      }

      res = await execGraphql({ query, variableValues, user: userManager })
    })

    it('should return wrong response', async () => {
      expect(res.errors).toContainEqual(matchers.errors_json)
    })

    it('should not update userManager', async () => {
      userAdmin = await User.findById(userAdmin.id)

      expect(userAdmin.full_name).not.toEqual(new_full_name)
    })
  })

  describe("user admin", () => {
    const new_full_name = "new_full_name"
    let res
    let user
    let userAdmin

    beforeEach(async () => {
      user = await factory.create('userAdmin')
      userAdmin = await factory.create('userAdmin')

      const variableValues = {
        input: {
          id: userAdmin.id,
          full_name: new_full_name,
        }
      }

      res = await execGraphql({ query, variableValues, user })
    })

    it('should return wrong response', async () => {
      expect(res.errors).toContainEqual(expect.objectContaining({
        message: 'Cannot execute "update" on "User"',
      )
    })

    it('should not update userManager', async () => {
      userAdmin = await User.findById(userAdmin.id)

      expect(userAdmin.full_name).not.toEqual(new_full_name)
    })
  })

  it('should return error', async () => {
    const variableValues = {
      input: {
        id: "1234567"
        full_name: "test"
      }
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json)
  })

})

describe("unauthorized", () => {
  const new_full_name = "new_full_name"
  let res
  let user
  let userManager

  beforeEach(async () => {
    user = await factory.create('userAdmin')
    userManager = await factory.create('userManager')

    const variableValues = {
      input: {
        id: userManager.id,
        full_name: new_full_name,
      }
    }

    res = await execGraphql({ query, variableValues, unauth: true })
  })

  it('should return valid response', async () => {
    expect(res.errors).toContainEqual(matchers.errors_unauthorized_json)
  })
})
