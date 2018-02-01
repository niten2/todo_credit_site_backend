import * as dotenv from "dotenv"

const path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"

dotenv.config({ path })

interface Settings {
  readonly env: string
  readonly name: string
  readonly host: string
  readonly port: string
  readonly dbUrl: string
  readonly jwt_secret_key: string
  readonly salt_password: string

  readonly isEnvDev: boolean
  readonly isEnvTest: boolean
  readonly isEnvProd: boolean
}

const settings: Settings = {
  env: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  port: process.env.PORT || "3000",
  dbUrl: process.env.DB_URL,

  jwt_secret_key: process.env.JWT_SECRET_KEY,
  salt_password: process.env.SALT_PASSWORD,

  isEnvDev: process.env.NODE_ENV == "development",
  isEnvTest: process.env.NODE_ENV == "test",
  isEnvProd: process.env.NODE_ENV == "production",
}

export default settings
