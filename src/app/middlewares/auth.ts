import { verifyJwt } from 'app/services/jwt'

export default (req: any, res: any, next: any) => {

  if (!req.header('Authorization') || !req.header('authorization')) {
    return next(new Error("token not found"))
  }

  const parts = req.header('Authorization').split(' ');
  const token = parts[1]

  if (!token) {
    return next(new Error("invalid token"))
  }

  try {
    const payload: any = verifyJwt(token)

    req.payload = payload
    // req.user_id = payload.user_id
    next()
  } catch (err) {
    return next(err)
  }

}
