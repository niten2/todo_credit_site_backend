import { Express, Response, Request, NextFunction } from "express"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import graphqOptions from 'app/graphql/config'
import settings from "config/settings"

import AuthMiddleware from "app/middlewares/auth"

export default (app: Express) => {

  app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    res.json({
      name: settings.name,
      current_version: "/v1",
    })
  })

  app.use("/v1", AuthMiddleware, graphqlExpress(graphqOptions))
  app.use("/v1", graphiqlExpress({ endpointURL: "/graphql" }))
}
