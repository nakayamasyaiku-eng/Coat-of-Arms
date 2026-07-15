create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(), slug text not null unique, sku text not null unique,
  currency text not null default 'EUR', price_cents integer not null check (price_cents > 0),
  stock integer not null default 0 check (stock >= 0), edition_total integer not null default 10,
  edition_number integer not null default 1, available boolean not null default true,
  image_path text not null, orientation text not null check (orientation in ('portrait','landscape')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists product_localizations (
  product_id uuid not null references products(id) on delete cascade, locale text not null check (locale in ('en','zh')),
  city text not null, title text not null, summary text not null, city_story text not null,
  heraldry text not null, alt_text text not null, primary key(product_id,locale)
);
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null, phone text not null,
  country text not null, address text not null, city text not null, postal_code text not null,
  preferred_language text not null check (preferred_language in ('en','zh')), contact_time text, notes text,
  privacy_consented_at timestamptz not null, created_at timestamptz not null default now()
);
create table if not exists orders (
  id uuid primary key default gen_random_uuid(), reference text not null unique,
  status text not null check (status in ('draft','contact_submitted','payment_pending','paid','contacted','preparing','shipped','completed')),
  currency text not null default 'EUR', amount_cents integer not null check (amount_cents >= 0),
  contact_submission_id uuid references contact_submissions(id), stripe_session_id text unique,
  stripe_payment_id text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(), order_id uuid not null references orders(id) on delete cascade,
  product_slug text not null, sku text not null, title_en text not null, title_zh text not null,
  quantity integer not null default 1 check (quantity > 0), unit_price_cents integer not null check (unit_price_cents > 0)
);
create table if not exists payment_events (
  id uuid primary key default gen_random_uuid(), stripe_event_id text not null unique, event_type text not null,
  processing_status text not null, created_at timestamptz not null default now()
);
alter table products enable row level security;
alter table product_localizations enable row level security;
alter table contact_submissions enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table payment_events enable row level security;
create policy "catalogue is publicly readable" on products for select using (true);
create policy "localizations are publicly readable" on product_localizations for select using (true);
