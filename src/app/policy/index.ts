import { AbilityBuilder, Ability } from "casl"

export const defineAbilitiesFor = async (user?: any) => {
  const { rules, can, cannot } = await AbilityBuilder.extract()

  return await new Ability(rules)
}
