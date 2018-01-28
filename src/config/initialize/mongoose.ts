import "app/models"
import * as mongoose from "mongoose"
import settings from "../settings"
import { ConnectionOptions } from "mongoose"

(<any>mongoose).Promise = Promise

if (!settings.isEnvTest) {
  mongoose.set("debug", true)
}

export const connectDb = async (): void => {
  await mongoose.connect(settings.dbUrl)
}

export const dropDb = async (): void => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase()
  }
}

export const closeDb = async (): void => {
  await mongoose.connection.close
}

export const User = mongoose.model("User")
export const Client = mongoose.model("Client")

export default mongoose

