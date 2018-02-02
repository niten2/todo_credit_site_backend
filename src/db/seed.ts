import { connectDb, closeDb } from "config/initialize/mongoose"
import factory from 'db/factory'

const create = async (): Promise<void> => {
  try {
    await connectDb()

    await factory.create('user', { login: "admin", password: "12345", role: "admin" })
    await factory.create('user', { login: "manager", password: "12345", role: "manager" })

    await factory.create('territory', { rate: 0.5 })
    await factory.create('territory', { rate: 1 })
    await factory.create('territory', { rate: 1.5 })

    await closeDb()

    console.log("models created")
  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

create()
