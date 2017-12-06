import settings from "./settings"
import { Response, Request, NextFunction } from "express"
import { Router } from "express"

export default (router: Router) => {
  // console.log(app)

  // router.get("/", (req, res) => {
  //   res.json({
  //     message: "Hello!"
  //   })
  // })


  router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({
      name: settings.name,
      current_version: "/v1",
    })
  })

}
