import {} from "jest"
import mongoose, { User, connectDb, dropDb, closeDb } from "config/initialize/mongoose"
import * as express from 'express'
import { initApp } from "config/app"
import factory from "factory"

beforeAll(async () => { await connectDb() })
beforeAll(async () => { await initApp(express()) })
beforeEach(async () => { await dropDb() })
afterAll(async () => { await closeDb() })

describe("attributes", () => {
  it("should have attributes", async () => {
    let user = await factory.create('user')

    let currentUser = await User.findById(user.id)

    expect(currentUser.name).toBe(user.name)
    expect(currentUser.email).toBe(user.email)
  })
})
