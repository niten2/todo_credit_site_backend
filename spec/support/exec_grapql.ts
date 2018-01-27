import { graphql } from 'graphql'
import schema from 'app/graphql/schema'

export default async (options: object = {}): any => {
  const { query, variableValues, rootValue, context } = options

  console.log(33333333333333, query)
  return await graphql(schema, query, rootValue || {}, context || {}, variableValues || {})
}
