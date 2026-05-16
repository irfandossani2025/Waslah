-- Demo seed for Waslah.
-- Password for both seeded accounts: `password123`

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
values
  (
    '00000000-0000-0000-0000-000000000000',
    '11111111-1111-1111-1111-111111111111',
    'authenticated',
    'authenticated',
    'owner@waslah.app',
    '$2a$10$7EqJtq98hPqEX7fNZaFWoO8kBY2NU4VFIfE88ll/aT0wZqV/6xY9.',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Aisha Al Balushi"}',
    timezone('utc', now()),
    timezone('utc', now()),
    '',
    '',
    '',
    ''
  ),
  (
    '00000000-0000-0000-0000-000000000000',
    '22222222-2222-2222-2222-222222222222',
    'authenticated',
    'authenticated',
    'admin@waslah.app',
    '$2a$10$7EqJtq98hPqEX7fNZaFWoO8kBY2NU4VFIfE88ll/aT0wZqV/6xY9.',
    timezone('utc', now()),
    timezone('utc', now()),
    timezone('utc', now()),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"Platform Admin"}',
    timezone('utc', now()),
    timezone('utc', now()),
    '',
    '',
    '',
    ''
  )
on conflict (id) do nothing;

insert into public.users (id, full_name, email, role)
values
  ('11111111-1111-1111-1111-111111111111', 'Aisha Al Balushi', 'owner@waslah.app', 'business_owner'),
  ('22222222-2222-2222-2222-222222222222', 'Platform Admin', 'admin@waslah.app', 'admin')
on conflict (id) do update
set full_name = excluded.full_name,
    email = excluded.email,
    role = excluded.role;

insert into public.businesses (
  id,
  owner_id,
  slug,
  name,
  description,
  whatsapp_number,
  instagram_handle,
  address,
  logo_url,
  banner_url,
  currency,
  status,
  plan
)
values (
  '33333333-3333-3333-3333-333333333333',
  '11111111-1111-1111-1111-111111111111',
  'cakehouse',
  '{"en":"Cake House","ar":"كيك هاوس"}',
  '{"en":"Fresh cakes, gift boxes, and celebration desserts delivered across Muscat.","ar":"كيك طازج وصناديق هدايا وحلويات مناسبات مع التوصيل داخل مسقط."}',
  '96891234567',
  '@cakehouse.om',
  '{"en":"Muscat, Oman","ar":"مسقط، عمان"}',
  'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1559622214-5085a9b4d82d?auto=format&fit=crop&w=1200&q=80',
  'OMR',
  'active',
  'business'
)
on conflict (id) do nothing;

update public.users
set business_id = '33333333-3333-3333-3333-333333333333'
where id = '11111111-1111-1111-1111-111111111111';

insert into public.categories (id, business_id, name, sort_order)
values
  ('44444444-4444-4444-4444-444444444441', '33333333-3333-3333-3333-333333333333', '{"en":"Celebration Cakes","ar":"كيكات المناسبات"}', 1),
  ('44444444-4444-4444-4444-444444444442', '33333333-3333-3333-3333-333333333333', '{"en":"Gift Bundles","ar":"باقات الهدايا"}', 2)
on conflict (id) do nothing;

insert into public.products (
  id,
  business_id,
  category_id,
  name,
  description,
  price,
  image_urls,
  status,
  available,
  featured
)
values
  (
    '55555555-5555-5555-5555-555555555551',
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444441',
    '{"en":"Chocolate Celebration Cake","ar":"كيكة شوكولاتة للمناسبات"}',
    '{"en":"Rich layered chocolate cake with premium ganache and custom topper.","ar":"كيكة شوكولاتة بطبقات غنية مع جاناش فاخر وتزيين حسب الطلب."}',
    8,
    array['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80'],
    'active',
    true,
    true
  ),
  (
    '55555555-5555-5555-5555-555555555552',
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444442',
    '{"en":"Red Roses Bundle","ar":"باقة ورد أحمر"}',
    '{"en":"Hand-tied red roses paired for birthdays and gifting moments.","ar":"باقة ورد أحمر منسقة يدويًا للهدايا والمناسبات."}',
    5,
    array['https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=900&q=80'],
    'active',
    true,
    true
  ),
  (
    '55555555-5555-5555-5555-555555555553',
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444442',
    '{"en":"Mini Gift Box","ar":"صندوق هدية صغير"}',
    '{"en":"A compact box with cake slice, flowers, and handwritten card.","ar":"صندوق صغير يحتوي على قطعة كيك وورد وبطاقة مكتوبة بخط اليد."}',
    6,
    array['https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80'],
    'active',
    true,
    false
  )
on conflict (id) do nothing;

insert into public.customers (
  id,
  business_id,
  full_name,
  phone,
  notes,
  total_orders,
  total_spent
)
values
  ('66666666-6666-6666-6666-666666666661', '33333333-3333-3333-3333-333333333333', 'Mariam Al Harthy', '+968 9911 2233', 'Prefers evening delivery.', 4, 46),
  ('66666666-6666-6666-6666-666666666662', '33333333-3333-3333-3333-333333333333', 'Saeed Al Lawati', '+968 9922 3344', null, 2, 18)
on conflict (id) do nothing;

insert into public.orders (
  id,
  business_id,
  customer_id,
  customer_name,
  customer_phone,
  customer_location,
  notes,
  status,
  total_amount
)
values
  (
    '77777777-7777-7777-7777-777777777771',
    '33333333-3333-3333-3333-333333333333',
    '66666666-6666-6666-6666-666666666661',
    'Mariam Al Harthy',
    '+968 9911 2233',
    'Al Khuwair',
    'Please include candles.',
    'new',
    18
  ),
  (
    '77777777-7777-7777-7777-777777777772',
    '33333333-3333-3333-3333-333333333333',
    '66666666-6666-6666-6666-666666666662',
    'Saeed Al Lawati',
    '+968 9922 3344',
    'Bausher',
    null,
    'confirmed',
    14
  )
on conflict (id) do nothing;

insert into public.order_items (
  id,
  order_id,
  product_id,
  product_name,
  quantity,
  unit_price,
  line_total
)
values
  ('88888888-8888-8888-8888-888888888881', '77777777-7777-7777-7777-777777777771', '55555555-5555-5555-5555-555555555551', '{"en":"Chocolate Celebration Cake","ar":"كيكة شوكولاتة للمناسبات"}', 1, 8, 8),
  ('88888888-8888-8888-8888-888888888882', '77777777-7777-7777-7777-777777777771', '55555555-5555-5555-5555-555555555552', '{"en":"Red Roses Bundle","ar":"باقة ورد أحمر"}', 2, 5, 10),
  ('88888888-8888-8888-8888-888888888883', '77777777-7777-7777-7777-777777777772', '55555555-5555-5555-5555-555555555553', '{"en":"Mini Gift Box","ar":"صندوق هدية صغير"}', 1, 6, 6),
  ('88888888-8888-8888-8888-888888888884', '77777777-7777-7777-7777-777777777772', '55555555-5555-5555-5555-555555555552', '{"en":"Red Roses Bundle","ar":"باقة ورد أحمر"}', 1, 5, 5),
  ('88888888-8888-8888-8888-888888888885', '77777777-7777-7777-7777-777777777772', null, '{"en":"Delivery","ar":"التوصيل"}', 1, 3, 3)
on conflict (id) do nothing;

insert into public.subscriptions (id, business_id, plan, status, renewal_date)
values (
  '99999999-9999-9999-9999-999999999999',
  '33333333-3333-3333-3333-333333333333',
  'business',
  'active',
  timezone('utc', now()) + interval '30 days'
)
on conflict (id) do nothing;

insert into public.analytics_events (business_id, event_name, payload)
values
  ('33333333-3333-3333-3333-333333333333', 'storefront_view', '{"source":"instagram"}'),
  ('33333333-3333-3333-3333-333333333333', 'whatsapp_checkout_started', '{"cart_size":2}');
