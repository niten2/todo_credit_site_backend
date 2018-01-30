import schema from './schema'

export default (req: any, res: any) => {
  return {
    schema: schema,

    formatError: (err: any) => ({
      message: err.message,
      status: err.status
    }),

    context: {
      payload: req.payload,
      user: req.user,
      ability: req.ability,
    },
  }
}
