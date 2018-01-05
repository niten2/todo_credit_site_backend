// import { Status, Client } from "api/models"

const Query = {
  users: async (root: any, args: any) => {
    // const clients = await Client.findAll({
    //   include: {
    //     model: Status,
    //   },
    //   offset: args.pagination && args.pagination.offset,
    //   limit: args.pagination && args.pagination.limit,
    // })
    // return clients
  },

  user: async (root: any, args: any) => {
    // const client = await Client.findById(args.id)
    // return client
  },

}

const Mutation = {

  createUser: async (root: any, args: any) => {
    // const client = await Client.create(args.input)
    // return client
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
