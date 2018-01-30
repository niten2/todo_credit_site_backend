import { User, Client } from "config/initialize/mongoose"
import { factory } from "factory-girl"
import * as faker from "faker"

factory.define('user', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  role: "admin",
})

factory.define('userAdmin', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  role: "admin",
})

factory.define('userManager', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  role: "manager",
})

factory.define('client', Client, {
  full_name: faker.name.findName,
  passport: faker.phone.phoneNumber,
  phone: faker.phone.phoneNumber,
  email: faker.internet.email,
  user: factory.assoc('user', '_id'),
  territory: "one",
})

export default factory
