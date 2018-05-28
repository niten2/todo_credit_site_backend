import * as express from 'express'
import { initApp } from "config/app"
import { connectDb, dropDb, closeDb } from "config/mongoose"
import factory from "factory"
import request from "support/request"
import execGraphql from "support/exec_grapql"
import addCustomExpect from "support/custom_expect"
import matchers from "support/matchers"

import settings from "config/settings"

addCustomExpect()

global.factory = factory
global.app = express()

global.request = request
global.execGraphql = execGraphql
global.matchers = matchers

jest.setTimeout(10000)

beforeAll(async () => { await connectDb() })
beforeAll(async () => { await initApp(app) })
afterEach(async () => { await dropDb() })
afterAll(async () => { await closeDb() })
