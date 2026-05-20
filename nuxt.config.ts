import { validateEnv } from './config/env'

const env = validateEnv()

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/eslint'],
  devtools: { enabled: true },
  app: {
    head: {
      title: env.NUXT_PUBLIC_APP_NAME,
    },
  },
  css: [
    '~/assets/styles/base/globals.css',
    '~/assets/styles/themes/light/theme.css',
    '~/assets/styles/themes/dark/theme.css',
    '~/assets/styles/tailwind/main.css',
  ],
  runtimeConfig: {
    databaseUrl: env.DATABASE_URL,
    directUrl: env.DIRECT_URL,
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY,
    public: {
      appName: env.NUXT_PUBLIC_APP_NAME,
      appUrl: env.NUXT_PUBLIC_APP_URL,
      supabaseUrl: env.SUPABASE_URL,
      supabaseAnonKey: env.SUPABASE_ANON_KEY,
    },
  },
  alias: {
    '@presentation': '/app/presentation',
    '@interfaces': '/app/interfaces',
    '@types': '/app/types',
    '@utils': '/app/utils',
    '@constants': '/app/constants',
    '@services': '/app/services',
  },
  compatibilityDate: '2025-07-15',
  tailwindcss: {
    configPath: 'tailwind.config.ts',
  },
})
