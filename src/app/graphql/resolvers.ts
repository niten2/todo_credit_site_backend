import { User } from "app/models"

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
    const user = await User.findById(args.input.id)
    await user.remove()
    return user

    // const user = await User.findByIdAndRemove(args.input.id)
  },

}

export default { Query, Mutation }
