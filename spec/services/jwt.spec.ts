import { createJwt, verifyJwt } from "app/services/jwt"

describe(__filename, () => {

  describe('createJwt', () => {
    it("should return string", async () => {
      let user = await factory.create('user')
      let res = await createJwt(user)

      expect(res).toBeType("string")
    })
  })

  describe('verifyJwt', () => {
    it("should return payload", async () => {
      let user = await factory.create('user')
      let token = createJwt(user)
      let res = await verifyJwt(token)

      expect(res).toEqual(matchers.payload_json())
    })

    it("should return error", async () => {
      expect.assertions(1)
      try {
        await verifyJwt("string")
      } catch (err) {
        expect(err).toEqual({
          name: "JsonWebTokenError",
          message: "jwt malformed",
        })
      }
    })
  })

})
