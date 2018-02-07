import settings from 'config/settings'
import { sign, verify } from 'jsonwebtoken'
import { UserType } from 'app/models/user'

export const createJwt = (user: UserType): any => {
  if (!settings.jwt_secret_key) {
    throw new Error('Jwt Secret Key should be present')
  }

  const payload: object = {
    user_id: user.id,
    email: user.email,
  }

  return sign(
    payload,
    settings.jwt_secret_key,
    { expiresIn: 10000000000 }
  )
}

export const verifyJwt = async (token: string): Promise<any> => {
  const payload = await new Promise((resolve, reject) => {
    verify(
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
