export const params = (req, keys) => {
  let res = req.body

  Object.keys(res)
    .filter(key => !keys.includes(key))
    .forEach(key => delete res[key])

  return res
}
