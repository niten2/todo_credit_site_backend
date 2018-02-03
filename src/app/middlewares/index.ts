import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as morganBody from 'morgan-body'
// import * as morgan from 'morgan'
import settings from 'config/settings'
import logger from "app/services/logger"
import { Express, Response, Request, NextFunction } from "express"

export default (app: Express): void => {
  app.use(bodyParser.json())
  app.use(cors())

  if (!settings.isEnvTest) {
    app.use((req: any, res: Response, next: NextFunction): void => {
      req.log = logger
      next()
    })

    morganBody(app)
  }
}
