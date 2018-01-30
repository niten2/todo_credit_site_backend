import { User, Client, Territory, Loan } from "config/initialize/mongoose"
import { factory } from "factory-girl"
import * as faker from "faker"

factory.define('user', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  territory: factory.assoc('territory', '_id'),
  role: "manager",
})

factory.define('userAdmin', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  territory: factory.assoc('territory', '_id'),
  role: "admin",
})

factory.define('userManager', User, {
  full_name: faker.name.findName,
  email: faker.internet.email,
  login: faker.name.findName,
  password: faker.internet.password,
  phone: faker.phone.phoneNumber,
  territory: factory.assoc('territory', '_id'),
  role: "manager",
})

factory.define('client', Client, {
  full_name: faker.name.findName,
  passport: faker.phone.phoneNumber,
  phone: faker.phone.phoneNumber,
  email: faker.internet.email,
  user: factory.assoc('user', '_id'),
  mark_as_deleted: false,
  // territory: factory.assoc('territory', '_id'),
})

factory.define('territory', Territory, {
  name: faker.address.country,
  rate: faker.random.number,
})

factory.define('loan', Loan, {
  date_start: faker.date.past,
  date_end: faker.date.future,
})

export default factory
