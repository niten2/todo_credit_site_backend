import { User, Client, Loan } from "config/initialize/mongoose"
import Acl from 'app/policy'




describe("user manager", () => {
  let acl
  // let user
  // let ability

  describe("user blocked", () => {
    beforeAll(async () => {
      acl = new Acl()

      await acl.setupRoles()

      // user = await factory.create('userManager', { blocked: true })
      // ability = await Policy(user)
    })

    it("should cannot all", async () => {

      console.log(acl)
      // console.log(Policy)

      // await Policy.connect()


      // console.log(Policy)

      // expect(ability.can('read', 'User', { _id: user.id })).toBeFalsy()
      // expect(ability.can('update', 'User', { _id: user.id })).toBeFalsy()

      // expect(ability.can("read", Client)).toBeFalsy()
      // expect(ability.can("create", Client)).toBeFalsy()
      // expect(ability.can("update", Client)).toBeFalsy()

      // expect(ability.can("create", Loan)).toBeFalsy()
    })
  })

  // describe("user not blocked", () => {
  //   beforeAll(async () => {
  //     user = await factory.create('userManager', { blocked: false })
  //     ability = await Policy(user)
  //   })

  //   it("should can", async () => {
  //     expect(ability.can('read', 'User', { _id: user.id })).toBeTruthy()

  //     expect(ability.can('update', 'User', { _id: user.id })).toBeTruthy()

  //     expect(ability.can("read", Client)).toBeTruthy()
  //     expect(ability.can("create", Client)).toBeTruthy()
  //     expect(ability.can("update", Client)).toBeTruthy()

  //     expect(ability.can("create", Loan)).toBeTruthy()
  //   })
  // })

})
