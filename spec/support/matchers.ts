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

      territory: expect.objectContaining({
        id: expect.any(String),

        name: expect.any(String),
        rate: expect.any(Number),

        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })

      mark_as_deleted: expect.any(Boolean),
      total_sum_loans: expect.any(Number),

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
      territory: expect.any(Object),
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
      user
      mark_as_deleted
      total_sum_loans

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

  errors_unauthorized_json: (): any => {
    return expect.objectContaining({
      message: "token not found",
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

  loan_db: (): any => {
    return expect.objectContaining({
      _id: expect.any(Object),

      date_start: expect.any(Date),
      date_end: expect.any(Date),
    })
  },

  territory_db: (): any => {
    return expect.objectContaining({
      _id: expect.any(Object),

      name: expect.any(String),
      rate: expect.any(Number),
    })
  },

  loan_attr: (): string => {
    return `
      id

      date_start
      date_end
      total

      createdAt
      updatedAt

      client {
        id

        full_name
        email
        passport
        phone
        user
        mark_as_deleted
        total_sum_loans

        createdAt
        updatedAt

        territory {
          id
          rate
          name
        }
      }

    `
  }

  loan_json: (): any => {
    return expect.objectContaining({
      id: expect.any(String),

      date_start: expect.any(String),
      date_end: expect.any(String),
      total: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  },

  territory_attr: (): string => {
    return `
      id

      name
      rate

      createdAt
      updatedAt
    `
  }

  territory_json: (): any => {
    return expect.objectContaining({
      id: expect.any(String),

      name: expect.any(String),
      rate: expect.any(Number),

      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    })
  },

}
