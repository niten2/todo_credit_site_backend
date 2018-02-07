import settings from 'config/settings'

// NOTE Because import sometimes not build it
const jsonwebtoken = require("jsonwebtoken")

export const createJwt = (user: any): any => {
  if (!settings.jwt_secret_key) {
    throw new Error('Jwt Secret Key should be present')
  }

  return jsonwebtoken.sign(
    {
      user_id: user.id,
      email: user.email,
    },
    settings.jwt_secret_key,
    {
      expiresIn: 10000000000
    }
  )
}

export const verifyJwt = async (token: string): Promise<any> => {
  const payload = await new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      token,
      settings.jwt_secret_key,
      {},
      (err: any, data: any) => {
        if (err !== null) {
          return reject(err)
        }

        return resolve(data)
      }
    )
  })

  return payload
}
