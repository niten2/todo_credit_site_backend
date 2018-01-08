import { createApolloFetch } from 'apollo-fetch'
import settings from 'config/settings'
import { createJwt } from "api/services/jwt"

const uri = `${settings.host}/v1`

const addHeader = ({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {}
  }

  // if (request.user) {
  //   const jwt = createJwt(request.user)
  //   options.headers['Authorization'] = `Token ${jwt}`
  // }

  // let { params, unauth, user } = options || {}
  // let authorization = ""

  // // method = method || "get"

  // if (!unauth && !user) {
  //   const user = await factory.create("user")
  //   authorization = `Bearer ${createJwt(user)}`
  // }

  // if (user) {
  //   authorization = `Bearer ${createJwt(user)}`
  // }



  next()
}

export default createApolloFetch({ uri }).use(addHeader)
