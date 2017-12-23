import settings from "config/settings"
import { Response, Request, NextFunction } from "express"
import { Express } from "express"
// import { User } from "config/initialize/mongoose"
// import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
// import { buildOptions } from '../app/graphql/config'

export default (app: Express) => {

  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({
      name: settings.name,
      current_version: "/v1",
    })
  })

  // app.get("/test", async (req: Request, res: Response, next: NextFunction) => {
  //   const users = await User.find()

  //   res.json(users)
  // })

  // this.express.use('/v1', graphqlExpress(buildOptions))
  // this.express.use('/v1', graphiqlExpress({ endpointURL: '/graphql' }))


}
