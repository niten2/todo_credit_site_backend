import * as express from 'express'
import middlewares from "app/middlewares"

describe(__filename, () => {

  it("should not throw", async () => {
    expect(() => middlewares(express())).not.toThrow()
  })

})
