import settings from 'config/settings'
import { User } from "config/initialize/mongoose"
import { verifyJwt } from 'app/services/jwt'

export default async (req: any, res: any, next: any) => {

  if (!req.header('Authorization') || !req.header('authorization')) {
    return next()
  }

  const parts = req.header('Authorization').split(' ');
  const token = parts[1]

  if (!token) {
    return next()
  }

  try {
    const payload = await verifyJwt(token)

    req.payload = payload
    req.user_id = payload.user_id

    if (payload.user_id) {
      req.user = await User.findById(payload.user_id)

      if (!req.user) {
        res.status(401)
        next(new Error("user not found"))
      }
    }

    req.log.info(`login as ${payload.user_id}, ${payload.email}`)

    next()
  } catch (err){
    return next()
  }

}
