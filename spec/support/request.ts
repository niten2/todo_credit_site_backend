import * as request from "supertest"
import { createJwt } from "app/services/jwt"

export default async (url, options) => {
  let { params, method, unauth, user } = options || {}
  let authorization = ""

  method = method || "get"

  if (!unauth && !user) {
    const user = await factory.create("user")
    authorization = `Bearer ${createJwt(user)}`
  }

  if (user) {
    authorization = `Bearer ${createJwt(user)}`
  }

  return await request(app)
    .post(url)
    .set('Authorization', authorization)
    .send(params)

  // switch(method) {
  //   case "get":
  //     return await request(app)
  //       .get(url)
  //       .set('Authorization', authorization)
  //       .send(params)
  //   case "post":
  //     return await request(app)
  //       .post(url)
  //       .set('Authorization', authorization)
  //       .send(params)
  //   case "put":
  //     return await request(app)
  //       .put(url)
  //       .set('Authorization', authorization)
  //       .send(params)
  //   case "delete":
  //     return await request(app)
  //       .delete(url)
  //       .set('Authorization', authorization)
  //       .send(params)
  // }
}
