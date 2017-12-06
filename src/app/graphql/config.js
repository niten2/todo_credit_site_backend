import schema from './schema'

export const buildOptions = (req, res) => {
  return {
    schema: schema,
    formatError: (err) => ({ message: err.message, status: err.status }),
    context: {
      payload: req.payload,
      body: req.body,
    },
  }
}
