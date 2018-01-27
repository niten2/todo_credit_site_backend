describe("", () => {

  it('should return users', async () => {
    let user = await factory.create('user')

    const query = `
      query {
        users {
          name
          email
        }
      }
    `

    const res = await execGraphql({ query })

    expect(res.data.users).toContainEqual(
      expect.objectContaining({
        name: user.name,
        email: user.email,
      }),
    )
  })

})
