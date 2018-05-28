import factory from 'db/factory'
import { connectDb, closeDb } from "config/mongoose"

const create = async (): Promise<void> => {
  try {
    await connectDb()

    let territory1 = await factory.create('territory', { rate: 0.5 })
    let territory2 = await factory.create('territory', { rate: 1 })
    let territory3 = await factory.create('territory', { rate: 1.5 })

    await factory.create('user', { login: "admin", password: "12345", role: "admin", territory: territory1 })
    await factory.create('user', { login: "manager", password: "12345", role: "manager", territory: territory2 })

    await factory.create('client', { territory: territory1 })
    await factory.create('client', { territory: territory2 })
    await factory.create('client', { territory: territory3 })

    await closeDb()

    console.log("models created")
  } catch (err) {
    console.log(err.stack)
  }

  process.exit()
}

create()
