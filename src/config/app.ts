import settings from "config/settings"
import initRoutes from "config/routes"
import initMiddlewares from "app/middlewares"
import { connectDb } from "config/initialize/mongoose"
import { Express } from "express"
import logger from "app/services/logger"
import socketio from 'socket.io'
var cookieParser = require('cookie-parser')

export const initApp = async (app: Express) => {
  await initMiddlewares(app)

  app.use(cookieParser())

  await initRoutes(app)

  let z: any = socketio

  let io = z.listen(app, {
    // cookie: "ufrontsio",
    transports: ['polling', 'websocket'],
    // transports: ["websocket"],
    // origins: "*",
    origins: 'http://localhost:3000/',
    path: "/socket.io",
    // wsEngine: 'ws',
    // allowRequest: (req, cb) => { cb(null, true) }
  })


  io.on('connection', (client: any) => {

    let z = client.request.headers.cookie
    console.log("cookie", z)

    client.on('subscribeToTimer', (interval: any) => {

      console.log('client is subscribing to timer with interval ', interval)

      setInterval(() => {
        client.emit('timer', new Date())
      }, interval)

    });


    client.on('message', function(msg: any){

      console.log(11111)
      console.log(2222)

      io.sockets.emit('message', {zzzzzzzz: 11111111111})
    })


  });






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
