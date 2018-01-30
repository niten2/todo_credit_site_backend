export default {

  user_json: (): any => {
    return expect.objectContaining({
      full_name: expect.any(String),
      email: expect.any(String),
    })
  },

  user_db: (): any => {
    return expect.objectContaining({
      _id: expect.any(Object),
      full_name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),

      role: expect.any(String),
      clients: expect.any(Array),

      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  },

  client_json: (client: any): any => {
    return expect.objectContaining({
      full_name: expect.any(String),
      email: expect.any(String),
    })
  },

  client_db: (): any => {
    return expect.objectContaining({
      _id: expect.any(Object),

      full_name: expect.any(String),
      email: expect.any(String),

      passport: expect.any(String),
      phone: expect.any(String),
      territory: expect.any(String),
      user: expect.any(Object),

      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  },

  errors_json: (): any => {
    return expect.objectContaining({
      message: expect.any(String),
      locations: expect.any(Array),
    })
  },

  payload_json: (): any => {
    return expect.objectContaining({
      user_id: expect.any(String),
      email: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    })
  },

}
