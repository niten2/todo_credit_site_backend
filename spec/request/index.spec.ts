describe("GET /", () => {
  it("should return 200", async () => {

    let res = await request("/", {
      unauth: true
    })

    expect(res.body).toEqual({
      name: 'credit_site',
      current_version: '/v2'
    })

  })
})
