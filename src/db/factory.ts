import * as faker from "faker"
import { factory } from 'factory-girl'
import { User, Territory } from "config/initialize/mongoose"

factory.define('user', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  role: "manager",
})

factory.define('territory', Territory, {
  name: faker.address.country,
  rate: faker.random.number,
})

export default factory
