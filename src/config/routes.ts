import settings from "config/settings"
import { Response, Request, NextFunction } from "express"
import { Express } from "express"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import graphqOptions from 'app/graphql/config'

export default (app: Express) => {

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({
      name: settings.name,
      current_version: "/v1",
    })
  })

  app.use("/v1", graphqlExpress(graphqOptions))
  app.use("/v1", graphiqlExpress({ endpointURL: "/graphql" }))
}
