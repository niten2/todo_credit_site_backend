import { } from "jest"
import mongoose, { User, connectDb, dropDb, closeDb } from "config/initialize/mongoose"
import * as express from 'express'
import { initApp } from "config/app"
import factory from "factory"
import request from "support/request"
import grapql from "support/grapql"
import customExpect from "./custom_expect"

customExpect()

global.factory = factory

global.app = express()
global.request = request
global.grapql = grapql

beforeAll(async () => { await connectDb() })
beforeAll(async () => { await initApp(app) })
beforeEach(async () => { await dropDb() })
afterAll(async () => { await closeDb() })
