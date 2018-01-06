import * as jsonwebtoken from 'jsonwebtoken'
import settings from 'config/settings'

export const createJwt = (user: any) => {
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

export const verifyJwt = (token: any, cb?: any) => {
  return jsonwebtoken.verify(
    token,
    settings.jwt_secret_key,
    {},
    cb
  )
}

