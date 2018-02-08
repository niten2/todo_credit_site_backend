describe("GET /", () => {
  let res

  beforeEach(async () => {
    res = await request("/", { unauth: true })
  })

  it("should return 200", async () => {
    expect(res.body).toEqual({
      name: 'credit_site',
      current_version: '/v1'
    })
  })

  it("should return 200", async () => {
    expect(res.statusCode).toEqual(200)
  })
})
