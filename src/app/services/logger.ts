import settings from "config/settings"
import * as intel from "intel"

interface Logger {
  info: (content: string) => void
  error: (content: string) => void
}

const buildLogger = (): any => {

  if (settings.isEnvTest) {
    return {
      info: (context: string): void => {},
      error: (context: string): void => {},
    }
  }

  return intel
}

const logger: Logger = buildLogger()

export default logger
