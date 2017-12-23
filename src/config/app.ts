import initRoutes from "config/routes"
import settings from "config/settings"
import { connectDb } from "config/initialize/mongoose"
import { Express } from "express"

export const initApp = async (app: Express) => {
  initRoutes(app)

  // if (!settings.isEnvTest) {
  //   logger.info(`App ${settings.name}, running on port ${settings.port}, NODE_ENV ${settings.env}`)
  // }
}

export const listen = async (app: Express) => {
  try {
    await connectDb()
    await initApp(app)
    await app.listen(settings.port)
  } catch (err) {
    // logger.error(err.message)
    console.log(err.message)
  }
}

