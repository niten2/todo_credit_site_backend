import { createJwt, verifyJwt } from "app/services/jwt"

describe(__filename, () => {

  describe('createJwt', () => {
    it("should return string", async () => {
      let user = await factory.create('user')
      let res = createJwt(user)

      expect(res).toBeType("string")
    })
  })

  describe('verifyJwt', () => {
    it("should return payload", async () => {
      let user = await factory.create('user')
      let token = createJwt(user)
      let res = verifyJwt(token)

      expect(res).toEqual(
        expect.objectContaining({
          user_id: user.id,
          email: user.email,
          iat: expect.any(Number),
          exp: expect.any(Number),
        }),
      )
    })

    it("should return error", async () => {
      expect(() => verifyJwt("string")).toThrow("jwt malformed")
    })
  })

})
