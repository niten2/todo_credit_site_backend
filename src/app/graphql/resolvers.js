import { Status, Client } from "api/models"

const Query = {
  users: async (root, args) => {
    // const clients = await Client.findAll({
    //   include: {
    //     model: Status,
    //   },
    //   offset: args.pagination && args.pagination.offset,
    //   limit: args.pagination && args.pagination.limit,
    // })
    // return clients
  },

  user: async (root, args) => {
    const client = await Client.findById(args.id)
    return client
  },

}

const Mutation = {

  createUser: async (root, args) => {
    // const client = await Client.create(args.input)
    // return client
  },

  updateUser: async (root, args) => {
    // const client = await Client.findById(args.id)
    // await client.update(args.input)
    // return client
  },

  deleteUser: async (_, args) => {
    // await Client.destroy({
    //   where: {
    //     id: args.input.id
    //   }
    // })
  },


}

export const resolvers = { Query, Mutation }
