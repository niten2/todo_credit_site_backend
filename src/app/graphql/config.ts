import schema from './schema'
import { Response, Request } from "express"

export default (req: Request, res: Response) => {
  return {
    schema: schema,
    formatError: (err: any) => ({
      message: err.message,
      status: err.status
    }),
    context: {
      // payload: req.payload,
      body: req.body,
    },
  }
}
