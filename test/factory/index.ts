import { User, Client, Territory, Loan } from "config/mongoose"
import { factory } from "factory-girl"
import * as faker from "faker"

factory.define('user', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  role: "manager",

  territory: factory.assoc('territory', '_id'),
})

factory.define('userAdmin', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  role: "admin",

  territory: factory.assoc('territory', '_id'),
})

factory.define('userManager', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  role: "manager",

  territory: factory.assoc('territory', '_id'),
})

factory.define('client', Client, {
  full_name: faker.name.findName,
  passport: faker.phone.phoneNumber,
  phone: faker.phone.phoneNumber,
  email: faker.internet.email,
  mark_as_deleted: false,

  user: factory.assoc('user', '_id'),
  territory: factory.assoc('territory', '_id'),
})

factory.define('territory', Territory, {
  name: faker.address.country,
  rate: faker.random.number,
})

factory.define('loan', Loan, {
  date_start: faker.date.past,
  date_end: faker.date.future,
  sum: faker.random.number,

  client: factory.assoc('client', '_id'),
})

export default factory
