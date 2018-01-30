export default {

  user_attr: (): string => {
    return `
      id

      full_name
      email
      login
      password
      role
      phone
      territory
      createdAt
      updatedAt
    `
  }

  user_json: (): any => {
    return expect.objectContaining({
      id: expect.any(String),

      full_name: expect.any(String),
      email: expect.any(String),

      login: expect.any(String),
      password: expect.any(String),
      role: expect.any(String),
      phone: expect.any(String),
      territory: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  },

  user_db: (): any => {
    return expect.objectContaining({
      _id: expect.any(Object),
      full_name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),

      role: expect.any(String),

      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  },

  client_json: (client: any): any => {
    return expect.objectContaining({
      id: expect.any(String),

      full_name: expect.any(String),
      email: expect.any(String),
      passport: expect.any(String),
      phone: expect.any(String),
      territory: expect.any(String),
      mark_as_deleted: expect.any(Boolean),

      createdAt: expect.any(String),
      updatedAt: expect.any(String),
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
      mark_as_deleted: expect.any(Boolean),

      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  },

  client_attr: (): string => {
    return `
      id

      full_name
      email
      passport
      phone
      territory
      user
      mark_as_deleted

      createdAt
      updatedAt
    `
  }

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
