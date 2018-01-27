import { } from "jest"
import mongoose, { connectDb, dropDb, closeDb } from "config/initialize/mongoose"
import * as express from 'express'
import { initApp } from "config/app"
import factory from "factory"
import request from "support/request"
import execGraphql from "support/exec_grapql"
import customExpect from "support/custom_expect"
import matchers from "support/matchers"

customExpect()

global.factory = factory

global.app = express()
global.request = request
global.execGraphql = execGraphql
global.matchers = matchers

beforeAll(async () => { await connectDb() })
beforeAll(async () => { await initApp(app) })
beforeEach(async () => { await dropDb() })
afterAll(async () => { await closeDb() })
