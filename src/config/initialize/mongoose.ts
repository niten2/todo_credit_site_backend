import "app/models"
import * as mongoose from "mongoose"
import settings from "../settings"
import { ConnectionOptions } from "mongoose"

(<any>mongoose).Promise = Promise

if (!settings.isEnvTest) {
  mongoose.set("debug", true)
}

export const connectDb = async (): Promise<any> => {
  return await mongoose.connect(settings.dbUrl)
}

export const dropDb = async (): Promise<any> => {
  try {
    return await mongoose.connection.db.dropDatabase()
  } catch (err) {
    console.log(err)
  }
}

export const closeDb = async (): Promise<any> => {
  return await mongoose.connection.close
}

export const User = mongoose.model("User")
export const Client = mongoose.model("Client")
export const Territory = mongoose.model("Territory")
export const Loan = mongoose.model("Loan")

export default mongoose

