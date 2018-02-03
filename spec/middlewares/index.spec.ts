import * as express from 'express'
import middlewares from "app/middlewares"

describe("", () => {

  it("should not throw", async () => {
    expect(() => middlewares(express())).not.toThrow()
  })

  describe("with mock", () => {
    let app

    beforeEach(async () => {
      app = { use: jest.fn() }

      middlewares(app)
    })

    it("should have first call jsonParser", async () => {
      const firstCall = app.use.mock.calls[0][0]

      expect(firstCall.name).toEqual("jsonParser")
    })

    it("should have second call corsMiddleware", async () => {
      const secondCall = app.use.mock.calls[1][0]

      expect(secondCall.name).toEqual("corsMiddleware")
    })
  })

})
