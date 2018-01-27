
export default {

  user_json: (user: any): any => {
    return expect.objectContaining({
      name: user.name,
      email: user.email,
    })
  },

  errors_json: (): any => {
    return expect.objectContaining({
      message: expect.any(String),
      locations: expect.any(Array),
    })
  },

}
