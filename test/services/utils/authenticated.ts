import { createJwt } from "app/services/jwt_token"
import { authenticated } from "app/services/utils"

describe("authenticated", () => {

  describe('valid token', () => {
    let user
    let token
    let ctx
    let res
    let fn = () => { return true }

    beforeEach(async () => {
      user = await factory.create("user")
      token = createJwt(user)
      ctx = { token }

      res = await authenticated(fn)({}, {}, ctx, {})
    })

    it("should return res", async () => {
      expect(res).toEqual(true)
    })

    it("ctx should have token", async () => {
      expect(ctx.token).toEqual(token)
    })

    it("ctx should have user", async () => {
      expect(ctx.user.id).toEqual(user.id)
    })

    it("ctx should have ability", async () => {
      expect(ctx.ability).toEqual(expect.any(Object))
    })
  })

  describe('user not found', async () => {
    let user
    let token
    let ctx
    let res
    let fn = () => { return true }

    beforeEach(async () => {
      user = await factory.build("user")
      token = createJwt(user)
      ctx = { token }
    })

    it("user not exist", async () => {
      expect.assertions(1)
      try {
        await authenticated(fn)({}, {}, ctx, {})
      } catch (err) {
        expect(err.message).toEqual("user not found")
      }
    })
  })

  describe('wrong token', async () => {
    let user
    let token
    let ctx
    let res
    let fn = () => { return true }

    beforeEach(async () => {
      token = "string"
      ctx = { token }
    })

    it("user not exist", async () => {
      expect.assertions(1)
      try {
        await authenticated(fn)({}, {}, ctx, {})
      } catch (err) {
        expect(err.message).toEqual("token not valid")
      }
    })
  })

  describe('empty token', async () => {
    let user
    let ctx
    let res
    let fn = () => { return true }

    beforeEach(async () => {
      ctx = {}
    })

    it("user not exist", async () => {
      expect.assertions(1)
      try {
        await authenticated(fn)({}, {}, ctx, {})
      } catch (err) {
        expect(err.message).toEqual("token not found")
      }
    })
  })

})
