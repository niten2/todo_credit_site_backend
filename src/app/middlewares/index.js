import settings from 'config/settings'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from "app/services/logger"
import loggerMiddleware from './access_logger'
import passport from './passport'

export default (app) => {
  app.use(cors())

  app.use(bodyParser.json())

  app.use((req, res, next) => {
    req.log = logger
    next()
  })

  app.use(loggerMiddleware())
  app.use(passport.initialize())
}
