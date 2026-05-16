# Waslah

Waslah is a production-oriented MVP for WhatsApp-first ordering, built for small businesses in Oman and the GCC. It focuses on a clean mini storefront, WhatsApp checkout, order management, customer tracking, and simple analytics without becoming a full marketplace.

## Stack

- Next.js 13.5 App Router
- TypeScript
- Tailwind CSS
- ShadCN-style component structure
- Framer Motion
- Supabase Auth, Postgres, Storage, Realtime-ready architecture
- Node 17-compatible deployment baseline

## Core product paths

- Landing page for acquisition
- Email auth for business owners
- Public storefront at `/store/[slug]`
- Cart to WhatsApp prefilled checkout flow
- Dashboard for products, orders, customers, analytics, and settings
- Admin panel for platform oversight

## Project structure

```text
app/
  (marketing)/          Landing page
  (auth)/               Login, signup, forgot password, verify email
  (dashboard)/          Protected dashboard routes
  api/                  Locale and WhatsApp endpoints
  auth/callback/        Supabase email verification callback
components/
  dashboard/            Dashboard-specific UI blocks
  layout/               Headers, footer, sidebar
  marketing/            Landing page sections
  shared/               Shared UX helpers
  storefront/           Storefront shell and cart
  ui/                   ShadCN-style primitives
lib/
  data/                 Mock/demo data and data queries
  i18n/                 Locale configuration and dictionaries
  supabase/             Supabase clients and middleware helpers
  validations/          Zod schemas
supabase/
  migrations/           SQL schema + RLS
  seed/                 Demo seed
types/                  Domain and database types
```

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env.local
```

3. Add Supabase credentials:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

4. Run the database migration and seed:

```bash
supabase db push
psql "$SUPABASE_DB_URL" -f supabase/seed/seed.sql
```

5. Start the app:

```bash
npm run dev
```

## Demo mode

If Supabase environment variables are missing, the app falls back to mock data so the landing page, storefront, and dashboard UI can still render. This is useful for design review and quick prototyping, but authentication and persistence will be mocked.

## Supabase notes

- `public.users` mirrors `auth.users` through a trigger.
- Business storefront content uses JSONB fields for English and Arabic readiness.
- Storage buckets:
  - `business-assets`
  - `product-images`
- RLS policies protect owner data while allowing public storefront reads for active stores.

## Important tables

- `users`
- `businesses`
- `categories`
- `products`
- `customers`
- `orders`
- `order_items`
- `subscriptions`
- `analytics_events`

## Deployment

### Shared host with Node 17

This repository is pinned to a Node 17-friendly Next.js version because your hosting cannot run Node 18+.

1. Upload the project to your server.
2. Set these environment variables on the host:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run:

```bash
npm install
npm run build
npm run start
```

4. Point your domain or reverse proxy at the Next.js app.

### Important database note

Your host PostgreSQL 10.23 should not be used for this MVP backend. Waslah is designed to use an external Supabase project for:

- Postgres
- Auth
- Storage
- Row Level Security

That means your hosting provider's local PostgreSQL version does not block deployment as long as the app can reach Supabase over HTTPS.

### Vercel

Vercel still works well if you later choose to move hosting:

1. Import the repository into Vercel.
2. Add the same environment variables from `.env.local`.
3. Set the production `NEXT_PUBLIC_APP_URL`.
4. Deploy.

### Supabase

1. Create a new Supabase project.
2. Run the SQL in `supabase/migrations/20260516190000_initial_schema.sql`.
3. Create the storage buckets if they were not created by SQL.
4. Seed demo data if you want a preview store immediately.

## Compatibility notes

- This codebase was adapted away from Next 15 server actions so it can run on Node 17 hosting.
- Authentication and mutations now use standard POST route handlers instead of server actions.
- If you later move to Node 20+, the app can be upgraded back toward a newer Next.js baseline.

## MVP priorities implemented

- WhatsApp-first ordering flow
- Mobile-first public storefront
- Simple business onboarding
- Product CRUD architecture
- Order pipeline overview
- Customer management
- Subscription-ready platform model
- Admin visibility
- English and Arabic-ready dictionary architecture with RTL support

## Future-ready extensions

The codebase is intentionally structured so future work can slot in without major rewrites:

- Payment gateways
- Delivery integrations
- Inventory logic
- VAT invoicing
- Loyalty
- Native mobile app clients
- Multi-store support

## Current tradeoffs

- Product images are URL-based in the MVP UI even though the schema is ready for Supabase Storage integration.
- Charts are intentionally simple.
- Realtime subscriptions are prepared at the data-model level but not yet attached to live dashboard widgets.
- Payment and subscription billing flows are architecture-ready but mocked.
