import "app/models"
import * as mongoose from "mongoose"
import settings from "../settings"
import { ConnectionOptions } from "mongoose"

(<any>mongoose).Promise = Promise

settings.isEnvTest ? undefined : mongoose.set("debug", true)

export const connectDb = async () => {
  const options: ConnectionOptions = { useMongoClient: true }

  await mongoose.connect(settings.dbUrl, options)
}

export const dropDb = async () => {
  await mongoose.connection.db.dropDatabase()
}

export const closeDb = async () => {
  await mongoose.connection.close
}

export const User = mongoose.model("User")

export default mongoose

