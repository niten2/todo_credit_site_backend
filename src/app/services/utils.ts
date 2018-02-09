import { User } from "app/models"
import { verifyJwt } from 'app/services/jwt_token'
import settings from 'config/settings'
import Policy from 'app/policy'

export const timeout = (ms: number): object => {
  if (settings.isEnvTest) return
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const validateEmail = (email: string): boolean => {
  if (email === "" || email === undefined) {
    return true
  }

  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return emailRegexp.test(email)
}

interface CalculateLoan {
  sum: number
  territory: number
  date_start: Date
  date_end: Date
  overdue?: number
}

export const calculatePersentLoan = (options: CalculateLoan): number => {
  let { sum, territory, date_start, date_end, overdue } = options
  let res

  let count_days = days_between(date_end, date_start)
  let increase = count_days * (overdue || 1)

  let koeff = (sum * territory) / 100
  let additional = (sum * increase) / 100

  return Number((koeff + additional).toFixed(2))
}

export const days_between = (date1: Date, date2: Date): number => {
  const one_day = 1000 * 60 * 60 * 24
  const date1_ms = date1.getTime()
  const date2_ms = date2.getTime()
  const difference_ms = Math.abs(date1_ms - date2_ms)

  return Math.round(difference_ms/one_day)
}

export const addDays = (date: Date, days: number): Date => {
  date.setDate(date.getDate() + days)
  return date
}

export const getTokenFromHeader = (req: any): string | null => {
  if (!req.header('Authorization') || !req.header('authorization')) {
    return null
  }

  const parts = req.header('Authorization').split(' ')
  const token = parts[1]

  return token
}

export const authenticated = (fn: any) => async (parent: any, args: any, ctx: any, info: any) => {
  let { token } = ctx

  if (!token) {
    throw new Error("token not found")
  }

  let payload

  try {
    payload = await verifyJwt(token)
  } catch (err){
    console.log("ERORR verifyJwt", err)
    throw new Error("token not valid")
  }

  const user = await User.findById(payload.user_id)

  if (!user) {
    throw new Error("user not found")
  }

  ctx.user = user
  ctx.ability = await Policy(user)

  return fn(parent, args, ctx, info)
}
