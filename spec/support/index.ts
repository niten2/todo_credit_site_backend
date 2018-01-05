import {} from "jest"
import mongoose, { User, connectDb, dropDb, closeDb } from "config/initialize/mongoose"
import * as express from 'express'
import { initApp } from "config/app"
// import request from './request'

// export let app: any

// import * as request from "supertest"

// import sinon from 'sinon'
// import settings from 'config/settings'
// import { createJwt } from "app/services/jwt"

// import factory from "spec/factory"
// import nock from 'nock'

// import timekeeper from 'timekeeper'

// chai.use(chaiSubset)

// global.mongoose = mongoose

// global.User = User

// global.expect = chai.expect
// global.sinon = sinon
// global.nock = nock
// const app = express()

// global.connectDb = connectDb
// global.initApp = async () => await initApp(express())
// global.dropDb = dropDb
// global.closeDb = closeDb
// global.factory = factory
// global.timekeeper = timekeeper

// let app


beforeAll(async () => { await connectDb() })
beforeAll(async () => { await initApp(express()) })
beforeEach(async () => { await dropDb() })
afterAll(async () => { await closeDb() })
