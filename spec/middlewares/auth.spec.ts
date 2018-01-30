import { createJwt } from "app/services/jwt"
import Auth from 'app/middlewares/auth'

describe(__filename, () => {

  describe('valid token', () => {
    it("should verifyJwt", async () => {
      const user = await factory.create("user")
      const token = createJwt(user)

      let req = { header: () => { return `Authorization ${token}` } }
      let res = { status: () => {} }
      let next = () => {}

      await Auth(req, res, next)

      expect(req.payload).toEqual(matchers.payload_json())
      expect(req.user).toEqual(matchers.user_db())
    })
  })

  describe('wrong token', async () => {
    it("user not exist", async () => {
      const user = await factory.build("user")
      const token = createJwt(user)

      let req = { header: () => { return `Authorization ${token}` } }
      let res = { status: () => {} }
      let next = jest.fn()

      await Auth(req, res, next)

      const error = next.mock.calls[0][0].message

      expect(error).toEqual("user not found")
    })

    it("should verifyJwt", async () => {
      let req = { header: () => { return "Authorization test" } }
      let res = { status: () => {} }
      let next = jest.fn()

      await Auth(req, res, next)

      expect(next.mock.calls[0]).toEqual([])
    })
  })

  describe('empty token', () => {
    it("should return error", async () => {
      let req = { header: () => { return "" } }
      let res = { status: () => {} }
      let next = jest.fn()

      await Auth(req, res, next)

      expect(next.mock.calls[0]).toEqual([])
    })
  })

})
