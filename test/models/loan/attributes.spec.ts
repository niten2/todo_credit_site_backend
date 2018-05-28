describe("attributes", () => {

  it("should have attributes", async () => {
    let loan = await factory.create('loan')

    expect(loan).toEqual(matchers.loan_db)
  })

})
