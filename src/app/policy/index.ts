import { AbilityBuilder, Ability } from "casl"

export default async (user: any): Promise<any> => {
  const { rules, can } = await AbilityBuilder.extract()

  if (user.role == "manager" && !user.blocked) {
    can('read', 'User', { _id: user.id })
    can('update', 'User', { _id: user.id })

    can('read', "Client")
    can('create', "Client")
    can('update', "Client")

    can('read', "Loan")
    can('create', "Loan")
  }

  if (user.role == "admin") {
    can('read', "User")
    can('create', "User")
    can('update', 'User', { role: "manager" })
    can('delete', 'User')

    can('read', "Client")
    can('update', "Client")
    can('update.territory', "Client")
    can('delete', 'Client')

    can('read', "Loan")
    can('update', "Loan")
  }

  return await new Ability(rules)
}
