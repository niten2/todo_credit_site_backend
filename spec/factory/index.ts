import { User, Client } from "config/initialize/mongoose"
import * as faker from "faker"
import factory from "factory-girl"

factory.define('user', User, {
  name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  role: "admin",
})

factory.define('userAdmin', User, {
  name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  role: "admin",
})

factory.define('userManager', User, {
  name: faker.name.findName,
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
