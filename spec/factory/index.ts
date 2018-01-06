import { User } from "config/initialize/mongoose"
import factory from 'factory-girl'
import * as faker from "faker"

factory.define('user', User, {
  name: faker.name.findName,
  email: faker.internet.email,
  password: faker.internet.password,
  role: "user",
})

export default factory
