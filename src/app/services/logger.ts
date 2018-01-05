import settings from "config/settings"

// import * as intel from "intel"

let logger

if (!settings.isEnvTest) {
  const intel = require("intel")
  logger = intel
}

if (settings.isEnvTest) {
  logger = {
    info: () => {},
    error: () => {},
  }
}

export default logger
