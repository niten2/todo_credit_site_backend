import {} from "jest"
import mongoose, { User, connectDb, dropDb, closeDb } from "config/initialize/mongoose"
import * as express from 'express'
import { initApp } from "config/app"

import * as request from "supertest"

// import sinon from 'sinon'
// import settings from 'config/settings'
// import { createJwt } from "app/services/jwt"

// import factory from "spec/factory"
// import nock from 'nock'

// import timekeeper from 'timekeeper'

// chai.use(chaiSubset)

global.mongoose = mongoose

global.User = User

// global.expect = chai.expect
// global.sinon = sinon
// global.nock = nock
global.app = express()

global.connectDb = connectDb
// global.initApp = async () => await initApp(express())
global.dropDb = dropDb
global.closeDb = closeDb
// global.factory = factory
// global.timekeeper = timekeeper


global.request = async (url, options) => {
  let { params, method, unauth, user } = options || {}
  let authorization = ""

  method = method || "get"

  if (!unauth && !user) {
    const user = await factory.create("user")
    authorization = `Bearer ${createJwt(user)}`
  }

  if (user) {
    authorization = `Bearer ${createJwt(user)}`
  }

  switch(method) {
    case "get":
      return await request(app)
        .get(url)
        .set('Authorization', authorization)
        .send(params)
    case "post":
      return await request(app)
        .post(url)
        .set('Authorization', authorization)
        .send(params)
    case "put":
      return await request(app)
        .put(url)
        .set('Authorization', authorization)
        .send(params)
    case "delete":
      return await request(app)
        .delete(url)
        .set('Authorization', authorization)
        .send(params)
  }
}

beforeAll(async () => { await connectDb() })
beforeAll(async () => { await initApp(app) })
beforeEach(async () => { await dropDb() })
afterAll(async () => { await closeDb() })
