import settings from "config/settings"
// import * as intel from "intel"

const createLogger = () => {

  if (settings.isEnvTest) {
    return {
      info: () => {},
      error: () => {},
    }
  }

  return require("intel")
}

export default createLogger()
