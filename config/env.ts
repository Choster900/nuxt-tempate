import Joi from 'joi'

export interface AppEnv {
  DATABASE_URL: string
  DIRECT_URL: string
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  NUXT_PUBLIC_APP_NAME: string
  NUXT_PUBLIC_APP_URL: string
  NODE_ENV: 'development' | 'production' | 'test'
}

const envSchema = Joi.object<AppEnv>({
  DATABASE_URL: Joi.string().uri({ scheme: ['postgres', 'postgresql'] }).required(),
  DIRECT_URL: Joi.string().uri({ scheme: ['postgres', 'postgresql'] }).required(),
  SUPABASE_URL: Joi.string().uri({ scheme: ['https'] }).required(),
  SUPABASE_ANON_KEY: Joi.string().min(10).required(),
  SUPABASE_SERVICE_ROLE_KEY: Joi.string().min(10).required(),
  NUXT_PUBLIC_APP_NAME: Joi.string().min(1).required(),
  NUXT_PUBLIC_APP_URL: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
}).unknown(true)

let validatedEnv: AppEnv | null = null

export function validateEnv(): AppEnv {
  if (validatedEnv) {
    return validatedEnv
  }

  const { error, value } = envSchema.validate(process.env, {
    abortEarly: false,
    convert: true,
  })

  if (error) {
    const details = error.details.map(detail => `- ${detail.message}`).join('\n')
    throw new Error(`Environment validation failed:\n${details}`)
  }

  validatedEnv = value
  return validatedEnv
}
