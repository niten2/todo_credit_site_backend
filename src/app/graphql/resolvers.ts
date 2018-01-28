import { User } from "app/models"
import { createJwt } from "app/services/jwt"

const Query = {
  users: async (root: any, args: any) => {
    const users = await User.find()
    return users
  },

  user: async (root: any, args: any) => {
    const user = await User.findById(args.id)
    return user
  },

}

const Mutation = {

  createUser: async (root: any, args: any) => {
    const client = await User.create(args.input)

    return client
  },

  updateUser: async (root: any, args: any) => {
    const user = await User.findById(args.input.id)
    await user.set(args.input)
    await user.save()

    return user
  },

  deleteUser: async (_: any, args: any) => {
    // const user = await User.findByIdAndRemove(args.input.id)

    const user = await User.findById(args.input.id)
    await user.remove()

    return user
  },

  createToken: async (_: any, args: any): Promise<object> | never => {
    const { email, password } = args.input

    const user = await User.findOne({ email: email })

    if (!user) {
      throw new Error("user not found")
    }

    if (!await user.comparePassword(password)) {
      throw new Error("wrong password")
    }

    const value = await createJwt(user)

    return {
      id: user.id,
      email: user.email,
      value,
    }
  },

}

export default { Query, Mutation }
