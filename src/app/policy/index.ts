import { AbilityBuilder, Ability } from "casl"

export default async (user?: any): Promise<any> => {
  const { rules, can, cannot } = await AbilityBuilder.extract()

  const role = user.role

  if (role == "manager") {
    can('create', "Client")
    can('update', "Client")

    can('create', "Loan")
  }


  if (role == "admin") {
    can('create', "User")
    can('update', 'User')
    can('delete', 'User')

    can('delete', 'Client')
  }

  return await new Ability(rules)
}
