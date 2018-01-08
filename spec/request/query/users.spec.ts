describe("GET /", () => {

  it("should return 200", async () => {
    const query = `
      query {
        users {
          name
          email
        }
      }
    `

    let res = await grapql({ query })
      // unauth: true
      // params,
    // })

    console.log(res.body)

    // expect(res.body).toEqual({
    //   name: 'credit_site',
    //   current_version: '/v1'
    // })

  })
})
