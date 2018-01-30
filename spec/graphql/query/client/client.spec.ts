const query = `
  query client($id: ID!) {
    client(id: $id) {
      ${matchers.client_attr()}
    }
  }
`

describe("valid params given", () => {

  it('should return client', async () => {
    let client = await factory.create('client')

    const variableValues = {
      id: client.id
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.data.client).toEqual(matchers.client_json())
  })

})

describe("wrong params given", () => {

  it('should return error', async () => {
    const variableValues = {
      id: "string"
    }

    const res = await execGraphql({ query, variableValues })

    expect(res.errors).toContainEqual(matchers.errors_json())
  })

})
