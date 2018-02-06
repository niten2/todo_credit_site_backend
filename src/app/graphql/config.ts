import schema from './schema'

export default (req: any, res: any) => {
  return {
    schema: schema,

    formatError: (err: any) => ({
      message: err.message,
      status: err.status
    }),

    context: {
      token: getHeader(req),
      payload: req.payload,
      user: req.user,
      ability: req.ability,
    },
  }
}

const getHeader = (req: any): string | null => {
  if (!req.header('Authorization') || !req.header('authorization')) {
    return null
  }

  const parts = req.header('Authorization').split(' ')
  const token = parts[1]

  return token
}
