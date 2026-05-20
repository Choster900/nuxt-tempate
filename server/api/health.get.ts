export default defineEventHandler(() => {
  const config = useRuntimeConfig()

  return {
    status: 'ok',
    appName: config.public.appName,
    now: new Date().toISOString(),
  }
})
