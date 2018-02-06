import { graphql } from 'graphql'
import { createJwt } from "app/services/jwt"
import { Context } from "app/grapql/config"
import schema from 'app/graphql/schema'

import AuthMiddleware from "app/middlewares/auth"
import AbilityMiddleware from "app/middlewares/ability"

export default async (options: object = {}): any => {
  const { query, variableValues, rootValue, user, unauth } = options
  const context = await buildContext(user, unauth)

  return await graphql(schema, query, rootValue || {}, context, variableValues || {})
}

const buildContext = async (user: any, unauth: boolean): Context => {
  let token = null

  if (!unauth && !user) {
    const user = await factory.create("user")
    token = await createJwt(user)
  }

  if (user) {
    token = await createJwt(user)
  }

  return {
    token
  }
}
