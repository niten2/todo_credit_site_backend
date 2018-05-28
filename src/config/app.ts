import settings from "config/settings"
import initRoutes from "config/routes"
import initMiddlewares from "app/middlewares"
import { connectDb } from "config/mongoose"
import { Express } from "express"
import logger from "app/services/logger"

export const initApp = async (app: Express) => {
  await initMiddlewares(app)
  await initRoutes(app)

  logger.info(`App ${settings.name}, running on port ${settings.port}, NODE_ENV ${settings.env}`)
}

export const listen = async (app: Express) => {
  try {
    await connectDb()
    await initApp(app)
    await app.listen(settings.port)
  } catch (err) {
    logger.error(err.message)
  }
}
