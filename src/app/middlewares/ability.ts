import { User } from "config/initialize/mongoose"
import { defineAbilitiesFor } from 'app/policy'

export default async (req: any, res: any, next: any) => {
  if (!req.user_id) {
    req.ability = await defineAbilitiesFor()
    return next()
  }

  const user = await User.findById(req.user_id)

  req.user = user
  req.ability = await defineAbilitiesFor(user)

  return next()
}
