import { Client } from "config/initialize/mongoose"

describe("attributes", () => {
  it("should have attributes", async () => {
    let client = await factory.create('client')

    expect(client).toEqual(matchers.client_db())
  })
})
