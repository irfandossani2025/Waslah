create extension if not exists "pgcrypto";

create type public.user_role as enum ('business_owner', 'admin');
create type public.business_status as enum ('pending', 'active', 'suspended');
create type public.business_plan as enum ('starter', 'business', 'premium');
create type public.product_status as enum ('draft', 'active', 'archived');
create type public.order_status as enum ('new', 'confirmed', 'preparing', 'delivered', 'cancelled');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'cancelled');

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  role public.user_role not null default 'business_owner',
  business_id uuid null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.users(id) on delete cascade,
  slug text not null unique,
  name jsonb not null,
  description jsonb not null default '{"en":"","ar":""}'::jsonb,
  whatsapp_number text not null,
  instagram_handle text not null default '',
  address jsonb not null default '{"en":"","ar":""}'::jsonb,
  logo_url text,
  banner_url text,
  currency text not null default 'OMR',
  status public.business_status not null default 'pending',
  plan public.business_plan not null default 'starter',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.users
  add constraint users_business_id_fkey
  foreign key (business_id) references public.businesses(id) on delete set null;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name jsonb not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  category_id uuid null references public.categories(id) on delete set null,
  name jsonb not null,
  description jsonb not null default '{"en":"","ar":""}'::jsonb,
  price numeric(12,2) not null check (price >= 0),
  image_urls text[] not null default '{}',
  status public.product_status not null default 'draft',
  available boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  full_name text not null,
  phone text not null,
  notes text,
  total_orders integer not null default 0,
  total_spent numeric(12,2) not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  customer_id uuid null references public.customers(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_location text not null default '',
  notes text,
  status public.order_status not null default 'new',
  total_amount numeric(12,2) not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid null references public.products(id) on delete set null,
  product_name jsonb not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  line_total numeric(12,2) not null check (line_total >= 0)
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  plan public.business_plan not null,
  status public.subscription_status not null default 'trialing',
  renewal_date timestamptz not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  business_id uuid null references public.businesses(id) on delete cascade,
  event_name text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists businesses_owner_id_idx on public.businesses(owner_id);
create index if not exists businesses_status_idx on public.businesses(status);
create index if not exists categories_business_id_idx on public.categories(business_id);
create index if not exists products_business_id_idx on public.products(business_id);
create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_status_idx on public.products(status);
create index if not exists customers_business_id_idx on public.customers(business_id);
create index if not exists customers_phone_idx on public.customers(phone);
create index if not exists orders_business_id_idx on public.orders(business_id);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists subscriptions_business_id_idx on public.subscriptions(business_id);
create index if not exists analytics_events_business_id_idx on public.analytics_events(business_id);
create index if not exists analytics_events_event_name_idx on public.analytics_events(event_name);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

drop trigger if exists set_businesses_updated_at on public.businesses;
create trigger set_businesses_updated_at
before update on public.businesses
for each row execute procedure public.set_updated_at();

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row execute procedure public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row execute procedure public.set_updated_at();

create or replace function public.current_role()
returns public.user_role
language sql
stable
as $$
  select role from public.users where id = auth.uid()
$$;

create or replace function public.current_business_id()
returns uuid
language sql
stable
as $$
  select business_id from public.users where id = auth.uid()
$$;

alter table public.users enable row level security;
alter table public.businesses enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.subscriptions enable row level security;
alter table public.analytics_events enable row level security;

create policy "Users can read own profile"
on public.users
for select
using (auth.uid() = id or public.current_role() = 'admin');

create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id or public.current_role() = 'admin');

create policy "Admin can manage users"
on public.users
for all
using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "Owners can manage own business"
on public.businesses
for all
using (owner_id = auth.uid() or public.current_role() = 'admin')
with check (owner_id = auth.uid() or public.current_role() = 'admin');

create policy "Public can view active storefronts"
on public.businesses
for select
using (status = 'active' or owner_id = auth.uid() or public.current_role() = 'admin');

create policy "Owners can manage categories"
on public.categories
for all
using (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
)
with check (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

create policy "Public can read categories for active storefronts"
on public.categories
for select
using (
  exists (
    select 1 from public.businesses
    where businesses.id = categories.business_id
      and businesses.status = 'active'
  )
  or business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

create policy "Owners can manage products"
on public.products
for all
using (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
)
with check (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

create policy "Public can read active products"
on public.products
for select
using (
  (
    status = 'active'
    and available = true
    and exists (
      select 1 from public.businesses
      where businesses.id = products.business_id
        and businesses.status = 'active'
    )
  )
  or business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

create policy "Owners can manage customers"
on public.customers
for all
using (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
)
with check (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

create policy "Owners can manage orders"
on public.orders
for all
using (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
)
with check (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

create policy "Owners can manage order items"
on public.order_items
for all
using (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and (orders.business_id = public.current_business_id() or public.current_role() = 'admin')
  )
)
with check (
  exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and (orders.business_id = public.current_business_id() or public.current_role() = 'admin')
  )
);

create policy "Owners can manage subscriptions"
on public.subscriptions
for all
using (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
)
with check (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

create policy "Owners can manage analytics"
on public.analytics_events
for all
using (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
)
with check (
  business_id = public.current_business_id()
  or public.current_role() = 'admin'
);

insert into storage.buckets (id, name, public)
values
  ('business-assets', 'business-assets', true),
  ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can read business assets"
on storage.objects
for select
using (bucket_id in ('business-assets', 'product-images'));

create policy "Authenticated users can upload business assets"
on storage.objects
for insert
with check (
  auth.role() = 'authenticated'
  and bucket_id in ('business-assets', 'product-images')
);

create policy "Authenticated users can update business assets"
on storage.objects
for update
using (
  auth.role() = 'authenticated'
  and bucket_id in ('business-assets', 'product-images')
);
