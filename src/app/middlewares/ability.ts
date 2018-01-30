import { User } from "config/initialize/mongoose"
import Policy from 'app/policy'

export default async (req: any, res: any, next: any): Promise<any> => {
  if (req.user) {
    req.ability = await Policy(req.user)
  }

  return next()
}
