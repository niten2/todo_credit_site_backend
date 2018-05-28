import * as faker from "faker"
import { factory } from 'factory-girl'
import { User, Territory, Client } from "config/mongoose"

factory.define('user', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  role: "manager",
})

factory.define('client', Client, {
  full_name: faker.name.findName,
  passport: faker.phone.phoneNumber,
  phone: faker.phone.phoneNumber,
  email: faker.internet.email,
})

factory.define('territory', Territory, {
  name: faker.address.country,
  rate: faker.random.number,
})

export default factory
