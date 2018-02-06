import schema from './schema'
import { getTokenFromHeader } from 'app/services/utils'

export default (req: any, res: any) => {
  return {
    schema: schema,

    formatError: (err: any) => ({
      message: err.message,
      status: err.status
    }),

    context: {
      token: getTokenFromHeader(req),
      payload: req.payload,
      user: req.user,
      ability: req.ability,
    },
  }
}
