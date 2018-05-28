import "app/models"
import * as mongoose from "mongoose"
import settings from "config/settings"

(<any>mongoose).Promise = Promise

if (!settings.isEnvTest) {
  mongoose.set("debug", true)
}

export const User = mongoose.model("User")
export const Client = mongoose.model("Client")
export const Territory = mongoose.model("Territory")
export const Loan = mongoose.model("Loan")

export const connectDb = async (): Promise<any> => {
  console.log(settings.isEnvTest)
  console.log(settings.dbTestUrl)


  if (settings.isEnvTest) {
    return await mongoose.connect(settings.dbTestUrl)
  }

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

export default mongoose
