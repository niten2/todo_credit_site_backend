import "support"

describe("GET /", () => {
  it("should return 200", async () => {
    let res = await request("/", { unauth: true })

    expect(res.body).toEqual({
      name: 'credit_site',
      current_version: '/v1'
    })

  })
})

describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request.get("/reset")
      .expect(404, done);
  });
});
