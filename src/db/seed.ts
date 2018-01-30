import { connectDb, closeDb } from "config/initialize/mongoose"
import factory from 'db/factory'

const create = async (): Promise<void> => {
  try {
    await connectDb()

    await factory.create('userAdmin', { password: "12345" })
    await factory.create('userManager', { password: "12345" })

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
