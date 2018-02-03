import { User, Client, Loan } from "app/models"
import { createJwt } from "app/services/jwt"
import { calculatePersentLoan } from "app/services/utils"

const Query = {
  users: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('read', User)

    const users = await User.find()
    return users
  },

  user: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('read', ctx.user)

    const user = await User.findById(args.id)
    return user
  },

  me: async (root: any, args: any, ctx: any) => {
    if (!ctx.user) throw new Error("user not found")

    const user = await User.findById(ctx.user.id)
    return user
  },

  clients: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('read', Client)

    const clients = await Client.find()
    return clients
  },

  client: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('read', Client)

    const client = await Client.findById(args.id)

    await Loan.populate(client, { path: "loans" })

    return client
  },

}

const Mutation = {

  createUser: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('create', User)

    const user = await User.create(args.input)
    return user
  },

  updateUser: async (root: any, args: any, ctx: any) => {
    const user = await User.findById(args.input.id)

    ctx.ability.throwUnlessCan('update', user)

    await user.set(args.input)
    await user.save()

    return user
  },

  deleteUser: async (_: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('delete', User)

    const user = await User.findByIdAndRemove(args.input.id)
    return user
  },

  updateMe: async (root: any, args: any, ctx: any) => {
    const user = ctx.user

    await user.set(args.input)
    await user.save()

    return user
  },

  createToken: async (_: any, args: any): Promise<any> => {
    const { login, password } = args.input

    const user = await User.findOne({ login })

    if (!user) {
      throw new Error("user not found")
    }

    if (user.blocked) {
      throw new Error("user blocked, connect with admin")
    }

    if (!await user.comparePassword(password)) {
      await user.addAttempt()
      throw new Error("wrong password")
    }

    const token = await createJwt(user)

    await user.resetAttempt()

    return {
      user,
      token,
    }
  },

  createClient: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('create', Client)

    let client = await Client.create(args.input)

    await client.set({ territory: ctx.user.territory })
    await client.save()

    return client
  },

  updateClient: async (root: any, args: any, ctx: any) => {
    const client = await Client.findById(args.input.id)

    if (args.input.territory) {
      ctx.ability.throwUnlessCan('update.territory', Client)
    }

    ctx.ability.throwUnlessCan('update', Client)

    await client.set(args.input)
    await client.save()

    return client
  },

  deleteClient: async (_: any, args: any) => {
    const client = await Client.findByIdAndRemove(args.input.id)

    return client
  },

  createLoan: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('create', Loan)

    const client = await Client.findById(args.input.client)
    const loan = await Loan.create(args.input)

    await client.addLoan(loan)

    return loan
  },

  updateLoan: async (root: any, args: any, ctx: any) => {
    ctx.ability.throwUnlessCan('update', Loan)

    const loan = await Loan.findById(args.input.id)

    await loan.set(args.input)
    await loan.save()

    return loan
  },

  caclulateLoan: async (root: any, args: any, ctx: any) => {
    const { sum, territory, date_start, date_end, client } = args.input

    let client_object = await Client.findById(client).populate({ path: "territory" })

    let total = calculatePersentLoan({
      sum: sum,
      territory: client_object.territory.rate,
      date_start: new Date(date_start),
      date_end: new Date(date_end),
    })

    return { total }
  },

}

export default { Query, Mutation }
