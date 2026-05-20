# Nuxt Enterprise Template

Plantilla profesional para Nuxt con TypeScript, Tailwind, Pinia, TanStack Query, Prisma y Supabase PostgreSQL, lista para escalar en frontend y backend.

## 1) Descripción del proyecto

Base modular para aplicaciones full-stack con Nuxt/Nitro. Incluye pantalla inicial `Hola mundo`, arquitectura por `presentation`, validación estricta de entorno y contenedorización para desarrollo/producción.

## 2) Stack usado

- Nuxt 4 + Nitro
- TypeScript
- Tailwind CSS
- Pinia (`@pinia/nuxt`)
- TanStack Query (`@tanstack/vue-query`)
- Prisma ORM
- PostgreSQL (Supabase)
- Joi (validación de entorno)
- Docker + Docker Compose
- ESLint + Prettier + EditorConfig

## 3) Estructura de carpetas

```txt
.
├─ app/
│  ├─ app.vue
│  ├─ assets/
│  │  ├─ images/ icons/ svg/ fonts/ logos/
│  │  └─ styles/
│  │     ├─ base/
│  │     ├─ themes/dark/
│  │     ├─ themes/light/
│  │     └─ tailwind/
│  ├─ components/
│  ├─ composables/
│  ├─ config/
│  ├─ constants/
│  ├─ presentation/
│  │  ├─ auth/
│  │  ├─ register/
│  │  ├─ landing/
│  │  └─ view/
│  ├─ interfaces/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ plugins/
│  ├─ services/
│  ├─ stores/
│  ├─ types/
│  └─ utils/
├─ config/
│  └─ env.ts
├─ prisma/
│  ├─ schema.prisma
│  ├─ migrations/
│  └─ seed/
├─ server/
│  ├─ api/
│  ├─ database/
│  ├─ services/
│  ├─ repositories/
│  ├─ utils/
│  ├─ validators/
│  └─ middleware/
└─ docker files...
```

## 4) Convenciones para nombrar rutas

```txt
app/presentation/view/
  index.vue
  auth/
    login.vue
    register.vue
  dashboard/
    index.vue
```

- Rutas públicas en `app/presentation/view`.
- Rutas protegidas con middleware en `app/middleware`.
- Evitar lógica compleja en vistas de ruta; moverla a `app/presentation/*`.

## 5) Convenciones para módulos/features

Cada módulo vive en `app/presentation/<feature-name>/` con:

- `components/`
- `interfaces/`
- `view/`
- `composables/`
- `services/`
- `stores/`

`view` contiene ensamblado de UI del módulo; `components` piezas reutilizables internas.

## 6) Convenciones para componentes

- Compartidos globales en `app/components`.
- Específicos de dominio dentro de su módulo.
- Nombrado PascalCase (`AuthLoginForm.vue`).

## 7) Convenciones para interfaces y tipos

- Tipos globales en `app/types`.
- Interfaces compartidas de contrato en `app/interfaces`.
- Interfaces de dominio dentro de cada módulo.

## 8) Convenciones para servicios y repositorios

- Cliente HTTP frontend en `app/services/http`.
- Lógica server-side en `server/services`.
- Acceso a datos server-side en `server/repositories`.
- Prisma singleton en `server/database/prisma.ts`.

## 9) Variables de entorno

Crear `.env` desde `.env.example`:

```env
DATABASE_URL=
DIRECT_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NUXT_PUBLIC_APP_NAME=
NUXT_PUBLIC_APP_URL=
NODE_ENV=
```

La validación está en `config/env.ts` (Joi). Si falta una variable crítica, Nuxt falla al arrancar/build con mensaje explícito.

## 10) Supabase + Prisma

1. Crear proyecto en Supabase y obtener connection strings.
2. Asignar `DATABASE_URL` y `DIRECT_URL` (pooling y direct).
3. Ejecutar:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 11) Instalación de dependencias

```bash
npm install
```

## 12) Ejecutar en desarrollo (local)

```bash
# Linux/macOS
cp .env.example .env
# PowerShell
Copy-Item .env.example .env
npm run dev
```

## 13) Ejecutar con Docker (desarrollo)

```bash
docker compose up --build
```

## 14) Build de producción

```bash
npm run build
npm run preview
```

Nuxt genera `.output/` (no `dist`) para runtime Node con Nitro. El contenedor de producción arranca con:

```bash
node .output/server/index.mjs
```

## 15) Ejecutar con Docker (producción)

```bash
docker compose -f docker-compose.prod.yml up --build
```

## 16) Migraciones Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

## 17) Recomendaciones para escalar

- Crear feature por dominio de negocio, no por tipo técnico.
- Mantener contratos DTO/interface versionados.
- Centralizar errores y validadores en `server/validators`.
- Implementar repositorios por agregado y tests por feature.
- Evitar exponer secretos en `runtimeConfig.public`.
- Usar `DIRECT_URL` para migraciones y `DATABASE_URL` para runtime.
- Mantener imágenes Docker pequeñas y reproducibles con `npm ci`.

## Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run lint:fix
npm run format
npm run prepare
npm run nuxt:prepare
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

## Husky para formateo

- Hook `pre-commit` configurado para ejecutar `lint-staged`.
- `lint-staged` formatea archivos staged con Prettier.
- No se configuraron reglas de conventional commits.
