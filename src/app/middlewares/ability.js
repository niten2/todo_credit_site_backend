import { defineAbilitiesFor } from 'app/policy'

export default async (req, res, next) => {
  if (!req.user_id) {
    req.ability = await defineAbilitiesFor()
    return next()
  }

  const user = await User.findById(req.user_id)

  req.user = user
  req.ability = await defineAbilitiesFor(user)

  return next()
}
