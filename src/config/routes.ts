import { Express, Response, Request, NextFunction } from "express"
import { graphqlExpress, graphiqlExpress } from "apollo-server-express"
import graphqOptions from 'app/graphql/config'
import settings from "config/settings"

export default (app: Express) => {
  app.get("/", (req: Request, res: Response, next: NextFunction): void => {
    res.json({
      name: settings.name,
      current_version: "/v1",
    })
  })

  app.use("/v1", graphqlExpress(graphqOptions))
  app.use("/v1", graphiqlExpress({ endpointURL: "/graphql" }))

  app.put("/api/v2/auth/token", (req: Request, res: Response, next: NextFunction): any => {

      console.log(11)

      // console.log(999, req.header("Cookie"))
      // console.log(999, req.header("cookie"))
      // console.log(req.headers["cookie"])
      // console.log(req.headers)

      // res.cookie('userid', '1111', { expires: new Date(Date.now() + 900000), httpOnly: true });

      // console.log(res.cookie())

      // console.log(req.cookies)
      // console.log(22)

      // res.header("Access-Control-Allow-Headers", "Content-Type")
      // res.set("Access-Control-Allow-Headers: Content-Type, *")
      // res.set("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS")
      // res.set("Access-Control-Allow-Credentials", "true")
      // res.set("Access-Control-Allow-Origin", "http://localhost:3000/")

      // res.set("11111", "http://localhost:3000/")

      res.cookie('cart', 'test', {
        // expires: new Date(Date.now() + 300000000),
        domain: "localhost",
        httpOnly: false,
        path: "/",
        // permanent: true,
      });

      // console.log(res)
      // res.cookie('zzzzzzzzzzzz', '222test')

      // res.cookie("cookie", "jar");



      // res.send("Ok");

      res.json({ name: 333 })
  })


}


// для того, чтобы браузер сохранял куки, которые нам присылает сервер. Необходимо отдать 4 заголовка
// включение cors
// "Access-Control-Allow-Headers: Content-Type"

// показываем клиенту, что эти запросы используют cors
// "Access-Control-Allow-Methods: POST, OPTIONS"
// за место POST, OPTIONS может стоять любая экзотика, которую вы отправляете
// разрешаем браузеру сохранять от данного сервера куки
// Access-Control-Allow-Credentials: true

// ну а чтобы браузер сохранил эту куку для вашего домена SPA-приложения не забываем
// Access-Control-Allow-Origin: http://localhost:3000
// где http://localhost:3000 - адрес вашего SPA-приложения
// в надбавку не забываем отвечать на запросы OPTIONS
// HTTP/1.1 200 OK
// если вы используете rest-api, обычно это делает библиотека

// чтобы отправлять куки в своих запросах вы должны отметить
// withCredentials: true
