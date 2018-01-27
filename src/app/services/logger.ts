import settings from "config/settings"
import * as intel from "intel"

// declare interface LoggerType {
//   // (source: string, subString: string): boolean;


//   // info(header: string): any;

//   info: (content: string) => void;
//   error: (content: string) => void;

//   // info: any
//   // error: any
//   // info(content: string)
//   // error(content: string)

//   // info(content: string): void
//   // error(content: string): void
// //   info: () =>
// //   error: string
// }

// interface Logger {
//   info: (content: string) => void;
//   error: (content: string) => void;
// }



const buildLogger = (): any => {
  // const logger: Logger = {
  //   info: (content: string): void => {},
  //   error: (content: string): void => {},
  // }

  // return logger
  // return params

  if (settings.isEnvTest) {
    return {
      info: (context: string): void => {},
      error: (context: string): void => {},
    }
  }

  return intel
}

// const res: LoggerType = logger()

const logger = buildLogger()

// export const logger = buildLogger()
export default logger
// export default res
