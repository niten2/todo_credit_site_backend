import { User, Client } from "config/initialize/mongoose"
import factory from 'factory-girl'
import * as faker from "faker"

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
  name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  role: "admin",
})

export default factory
