describe("attributes", () => {
  it("should have attributes", async () => {
    let territory = await factory.create('territory')

    expect(territory).toEqual(matchers.territory_db())
  })
})
