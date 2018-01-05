import { User } from "config/initialize/mongoose"
import factory from 'factory-girl'
import * as faker from "faker"

factory.define('user', User, {
  name: faker.name.findName,
  email: faker.internet.email,

  // password: faker.internet.password,
  // role: "user",
})

// factory.define('userWithEmailFake', User, {
//   email: factory.seq('User.email', (n) => `user${n}@fake.com`),
//   password: faker.internet.password,
// })

// factory.define('userWithFollowers', User, {
//   name: faker.name.findName,
//   email: faker.internet.email,
//   password: faker.internet.password,
//   role: "user",
//   followers: factory.assoc('ico', "_id"),
// })

// factory.define('superAdmin', User, {
//   name: faker.name.findName,
//   email: faker.internet.email,
//   password: faker.internet.password,
//   role: "superAdmin",
// })

// factory.define('ico', Ico, {
//   projectName: faker.name.findName,
//   source: faker.name.findName,
//   logo: faker.image.imageUrl,
//   title: faker.name.findName,
//   video: faker.name.findName,
//   description: faker.name.findName,
//   overview: faker.helpers.createTransaction,
//   articles: [{
//     title: faker.name.findName,
//     url: faker.image.imageUrl,
//   }],
//   team: {
//     members: [{
//       name: "test",
//       position: "position",
//     }],
//     countryOfOrigin: "countryOfOrigin",
//   },
//   technology: faker.helpers.createTransaction,
//   legal: faker.helpers.createTransaction,
//   github: {
//     url: faker.name.findName,
//     commitsData: [new Date()],
//     commitsCount: faker.random.number,
//     contributorsCount: faker.random.number,
//     contributorsCount: faker.random.number,
//     watchersCount: faker.random.number,
//     stargazersCount: faker.random.number,
//     forksCount: faker.random.number,
//     openIssues: faker.random.number,
//   },
//   links: [{
//     title: faker.name.findName,
//     url: faker.image.imageUrl,
//   }],
//   local: faker.name.findName,
// })

// factory.define('icoVisible', Ico, {
//   projectName: faker.name.findName,
//   source: faker.name.findName,
//   logo: faker.image.imageUrl,
//   title: faker.name.findName,
//   video: faker.name.findName,
//   description: faker.name.findName,
//   overview: faker.helpers.createTransaction,
//   articles: [{
//     title: faker.name.findName,
//     url: faker.image.imageUrl,
//   }],
//   team: {
//     members: [{
//       name: "test",
//       position: "position",
//     }],
//     countryOfOrigin: "countryOfOrigin",
//   },
//   technology: faker.helpers.createTransaction,
//   legal: faker.helpers.createTransaction,
//   github: {
//     url: faker.name.findName,
//     commitsData: [new Date()],
//     commitsCount: faker.random.number,
//     contributorsCount: faker.random.number,
//     contributorsCount: faker.random.number,
//     watchersCount: faker.random.number,
//     stargazersCount: faker.random.number,
//     forksCount: faker.random.number,
//     openIssues: faker.random.number,
//   },
//   links: [{
//     title: faker.name.findName,
//     url: faker.image.imageUrl,
//   }],
//   local: faker.name.findName,
//   approve: true,
//   visibleUser: true,
//   visibleAdmin: true,
// })

// factory.define('icoWithUser', Ico, {
//   projectName: faker.name.findName,
//   status: "approved",
//   user: factory.assoc('user', '_id'),
// })

// factory.define('icoApproved', Ico, {
//   projectName: faker.name.findName,
//   status: "approved",
// })

// factory.define('icoHidden', Ico, {
//   projectName: faker.name.findName,
//   status: "hidden",
// })

// factory.define('icoArchive', Ico, {
//   projectName: faker.name.findName,
//   status: "archive",
// })

// factory.define('icoClear', Ico, {})

// factory.define('article', Article, {
//   title: faker.name.findName,
//   metaTags: ["a", "b"],
//   keywords: ["a", "b"],
//   summary: faker.lorem.words,
//   text: faker.lorem.words,
//   image: faker.image.imageUrl,
//   publish: false,
//   publishAt: faker.date.past,
// })

export default factory
