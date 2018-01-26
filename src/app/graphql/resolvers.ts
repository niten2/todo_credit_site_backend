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
    // console.log(111111, args.input)
    // return {}
    const client = await User.create(args.input)
    return client
  },

  updateUser: async (root: any, args: any) => {
    // const client = await Client.findById(args.id)
    // await client.update(args.input)
    // return client
  },

  deleteUser: async (_: any, args: any) => {
    // await Client.destroy({
    //   where: {
    //     id: args.input.id
    //   }
    // })
  },


}

export default { Query, Mutation }
