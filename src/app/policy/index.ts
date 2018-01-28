import { User } from "config/initialize/mongoose"
import { AbilityBuilder, Ability } from "casl"

export default async (user?: any) => {
  const { rules, can, cannot } = await AbilityBuilder.extract()

  const role = user.role

  if (role == "manager") {
    // can('read', "icoes", { approve: true, visibleUser: true,  visibleAdmin: true })
    // can('read', "icoes", { user: user.id })


    // can('delete', 'icoes', { user: user._id })

    // can('read', "users", { _id: user.id })
    // can('update', 'users', { _id: user.id, role: "user" })
    // can('delete', 'users', { _id: user.id })
  }


  if (role == "admin") {

    can('create', "User")
    can('update', 'User')
    can('delete', 'User')


    // can('read', "icoes")
    // can('create', 'icoes')
    // can('update', 'icoes')
    // can('delete', 'icoes')

    // can('access', "icoVisibleAdmin")
    // can('access', "updateOtherUsers")

    // can('read', "users", { role: "user" })
    // can('update', 'users', { _id: user.id })
    // can('delete', 'users', { _id: user.id })
  }

  return await new Ability(rules)
}
