import settings from 'config/settings'

export const timeout = (ms: number): object => {
  if (settings.isEnvTest) return
  return new Promise(resolve => setTimeout(resolve, ms))
}
