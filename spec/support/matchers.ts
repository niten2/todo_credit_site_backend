export default {

  user_json: (user: any): any => {
    return expect.objectContaining({
      name: user.name,
      email: user.email,
    })
  },

  user_db: (user: any): any => {
    return expect.objectContaining({
      _id: expect.any(Object),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  },

  client_db: (client: any): any => {
    return expect.objectContaining({
      _id: expect.any(Object),

      full_name: client.full_name,
      passport: client.passport,
      phone: client.phone,
      territory: client.territory,

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

}
