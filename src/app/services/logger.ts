import settings from "config/settings"
import * as intel from "intel"

const buildLogger = (): any => {
  if (settings.isEnvTest) {
    return {
      info: (context: string): void => {},
      error: (context: string): void => {},
    }
  }

  return intel
}

const logger = buildLogger()

export default logger
