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
  let authorization = ""

  if (!unauth && !user) {
    const user = await factory.create("user")
    authorization = `Bearer ${createJwt(user)}`
  }

  if (user) {
    authorization = `Bearer ${createJwt(user)}`
  }

  let req = { header: () => { return authorization } }
  let res = { status: () => {} }
  let next = () => {}

  await AuthMiddleware(req, res, next)
  await AbilityMiddleware(req, res, next)

  return {
    payload: req.payload,
    user: req.user,
    ability: req.ability,
  }
}
