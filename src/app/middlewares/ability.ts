import { User } from "config/initialize/mongoose"
import Policy from 'app/policy'

export default async (req: any, res: any, next: any): Promise<any> => {
  const user = await User.findById(req.user_id)

  req.user = user
  req.ability = await Policy(user)

  return next()
}
