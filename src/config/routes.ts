import { Express, Response, Request, NextFunction } from "express"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import graphqOptions from 'app/graphql/config'
import settings from "config/settings"

export default (app: Express) => {

  app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    res.json({
      name: settings.name,
      current_version: "/v1",
    })
  })

  app.use("/v1", graphqlExpress(graphqOptions))
  app.use("/v1", graphiqlExpress({ endpointURL: "/graphql" }))
}
