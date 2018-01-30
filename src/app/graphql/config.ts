import schema from './schema'
import { Response, Request } from "express"

export interface Context {
  payload: any
  user: any
  ability: any
}

export default (req: any, res: Response) => {
  return {
    schema: schema,
    formatError: (err: any) => ({
      message: err.message,
      status: err.status
    }),
    context<Context>: {
      payload: req.payload,
      user: req.user,
      ability: req.ability,
    },
  }
}
