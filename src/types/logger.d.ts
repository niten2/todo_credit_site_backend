interface Logger {
  info: (content: string) => void;
  error: (content: string) => void;
}

declare const logger: Logger

declare module "app/services/logger" {
	export default logger
}
