import * as acl from "acl"
import { concat } from "ramda"
import mongoose, { User } from "config/mongoose"

export default class Acl {
  acl: any

  constructor() {
    let db = mongoose.connection.db
    if (!db) { throw new Error("mongoose.connection.db should be exist") }
    this.acl = new acl(new acl.mongodbBackend(db, "acl"))
  }

  async initRoles (): Promise<any> {
    return await this.acl.allow([
      {
        roles: 'root',
        allows:[
          { resources: 'company', permissions: ["read", "create", "update", "delete"] },
          { resources: 'company-admin', permissions: ["read", "create", "update", "delete"] },
          { resources: 'events', permissions: ["read", "create", "update", "delete"] },
          { resources: 'admin', permissions: ["read", "create", "update", "delete"] },
        ],
      },

      {
        roles: 'admin',
        allows:[
          { resources: 'company', permissions: ["read"] },
        ],
      },

      {
        roles: 'guest',
        allows:[
          { resources: 'me', permissions: ["read", "create", "update", "delete"] },
        ],
      },
    ])
  }

  // NOTE proxy methods
  async allow (roles, resources, permissions) {
    return await this.acl.allow(roles, resources, permissions)
  }

  async isAllowed (userId, resource, permissions): Promise<boolean> {
    let res = await this.acl.isAllowed(userId, resource, permissions)
    return res
  }

  async whatResources (role): Promise<boolean> {
    let res = await this.acl.whatResources(role)
    return res
  }

  async allowedPermissions (...options): Promise<boolean> {
    let res = await this.acl.allowedPermissions(...options)
    return res
  }

  async addUserRoles (...options) {
    return await this.acl.addUserRoles(...options)
  }

  async areAnyRolesAllowed (roles, resource, permissions) {
    return await this.acl.areAnyRolesAllowed(roles, resource, permissions)
  }

  async hasRole (...options) {
    return await this.acl.hasRole(...options)
  }

  // NOTE custom methods
  async addRoleRoot (userId: string) {
    return await this.acl.addUserRoles(userId, 'root')
  }

  async addRoleAdmin (userId: string) {
    return await this.acl.addUserRoles(userId, 'admin')
  }

  async removeUserRoles (...options) {
    return await this.acl.removeUserRoles(...options)
  }

  async addRoleGuest (userId: string) {
    return await this.acl.addUserRoles(userId, 'guest')
  }

  async roleUsers (role: string) {
    return this.acl.roleUsers(role)
  }

  async userRoles (id: string): Promise<any> {
    return this.acl.userRoles(id)
  }

  async addRoleParents (...options): Promise<any> {
    return this.acl.addRoleParents(...options)
  }

  async isPermited (userId: any, resource: any, permissions: any): Promise<boolean> {
    let res = await this.acl.isAllowed(userId, resource, permissions)
    return !res
  }

  async isNotRoot (id) {
    let res = await this.acl.hasRole(id, "root")
    return !res
  }

  async isRoot (id) {
    let res = await this.acl.hasRole(id, "root")
    return res
  }

  // example await acl.addRoleCompany(company.id, user.id)
  async addRoleCompany (companyId, userId) {
    if (!companyId) { throw new Error("companyId should be exist") }
    if (!userId) { throw new Error("userId should be exist") }

    const acl = this.acl
    const role = `company-${companyId}`

    await acl.addUserRoles(userId, role)
  }

  // await acl.policyCreateCompany(companyId)
  async policyCreateCompany (companyId) {
    if (!companyId) { throw new Error("companyId should be exist") }

    const acl = this.acl
    const role = `company-${companyId}`

    // NOTE add roots this role
    const rootIds = await acl.roleUsers("root")

    await Promise.all(
      rootIds.map(async (id) => {
        await acl.addUserRoles(id, role)
      })
    )
  }

  // await acl.policyDeleteCompany(companyId)
  async policyDeleteCompany (companyId) {
    if (!companyId) { throw new Error("companyId should be exist") }

    const acl = this.acl
    const role = `company-${companyId}`

    // NOTE add roots this role
    const ids = await acl.roleUsers("root")
    await Promise.all(
      ids.map(async (id) => {
        await acl.removeUserRoles(id, role)
      })
    )
  }

  async permitCompany (companyId, userId) {
    if (!companyId) { return true }

    const acl = this.acl
    const role = `company-${companyId}`

    let res = await acl.hasRole(userId, role)
    return !res
  }

  async removeUserRolesCompany (companyId, userId) {
    if (!companyId) { throw new Error("companyId should be exist") }
    if (!userId) { throw new Error("userId should be exist") }

    const acl = this.acl
    const role = `company-${companyId}`

    await acl.removeUserRoles(userId, role)

    return true
  }
}
