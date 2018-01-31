import settings from 'config/settings'

export const timeout = (ms: number): object => {
  if (settings.isEnvTest) return
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const validateEmail = (email: string): boolean => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

interface CalculateLoan {
  sum: number
  territory: number
  date_start: Date
  date_end: Date
}

export const calculatePersentLoan = (options: CalculateLoan): number => {
  let { sum, territory, date_start, date_end } = options

  let count_days = days_between(date_end, date_start)

  let koeff = (sum / 100) * territory
  let additional = (sum * territory / 100) * count_days

  return koeff + additional
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
