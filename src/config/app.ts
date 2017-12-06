import * as express from "express"
import initRoutes from "./routes"
import { Express } from "express"
// import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
// import { buildOptions } from '../app/graphql/config'

console.log(process.env.NODE_PATH)

class App {
  public express: Express

  constructor () {
    this.express = express()
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()


    // this.express.use('/v1', graphqlExpress(buildOptions))
    // this.express.use('/v1', graphiqlExpress({ endpointURL: '/graphql' }))
    // initRoutes(router)


    // this.express.use("/", router)
  }
}

export default new App().express
