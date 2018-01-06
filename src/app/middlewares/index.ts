import settings from 'config/settings'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import logger from "app/services/logger"
import loggerMiddleware from './access_logger'

export default (app) => {
  app.use(cors())

  app.use(bodyParser.json())

  app.use((req, res, next) => {
    req.log = logger
    next()
  })

  app.use(loggerMiddleware())
}
