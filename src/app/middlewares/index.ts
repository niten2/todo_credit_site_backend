import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import logger from "app/services/logger"
import loggerMiddleware from './access_logger'

export default (app: any) => {
  app.use(cors())

  app.use(bodyParser.json())

  app.use((req: any, res: any, next: any) => {
    req.log = logger
    next()
  })

  app.use(loggerMiddleware)
}
