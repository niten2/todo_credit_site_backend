import * as faker from "faker"
import factory from 'factory-girl'
import { User, Client } from "config/initialize/mongoose"

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

export default factory
