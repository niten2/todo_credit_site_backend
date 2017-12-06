import app from "./config/app"
import settings from "./config/settings"

app.listen(settings.port, (err: string) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${settings.port}`)
})

