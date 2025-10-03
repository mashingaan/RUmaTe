create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  full_name text,
  avatar_url text,
  campus text,
  budget_min integer,
  budget_max integer,
  move_in_date date,
  verified boolean default false,
  is_active boolean default true,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create table if not exists preferences (
  profile_id uuid primary key references profiles(id) on delete cascade,
  cleanliness text check (cleanliness in ('low','mid','high')),
  pets text check (pets in ('no','cat','dog','ok')),
  smoking text check (smoking in ('no','outside','yes')),
  alcohol text check (alcohol in ('no','rare','social')),
  sleep text check (sleep in ('early','flex','late'))
);

create table if not exists listings (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text not null,
  price integer not null,
  address text not null,
  lat double precision,
  lng double precision,
  minutes_to_campus integer,
  roommates_count integer default 0,
  features jsonb default '{}',
  compatibility_index integer default 0,
  is_active boolean default true,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create table if not exists listing_images (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid references listings(id) on delete cascade,
  url text not null,
  sort integer default 0
);

create table if not exists saved_searches (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  query_json jsonb not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create table if not exists matches (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  listing_id uuid references listings(id) on delete cascade,
  compatibility_index integer not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create type thread_status as enum ('new','scheduled','closed');

create table if not exists threads (
  id uuid primary key default uuid_generate_v4(),
  listing_id uuid references listings(id) on delete cascade,
  initiator_id uuid references profiles(id) on delete cascade,
  recipient_id uuid references profiles(id) on delete cascade,
  status thread_status default 'new',
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  thread_id uuid references threads(id) on delete cascade,
  sender_id uuid references profiles(id) on delete cascade,
  text text check (char_length(text) <= 1000) not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create type verification_method as enum ('edu_email','student_card');
create type verification_status as enum ('pending','approved','rejected');

create table if not exists verifications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  method verification_method not null,
  status verification_status default 'pending',
  payload_json jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

create policy "Public listings" on listings
for select
using (is_active);

create policy "Profiles are self manageable" on profiles
for select using (true)
with check (auth.uid() = id);

create policy "Update own profile" on profiles
for update using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Manage own preferences" on preferences
for all using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "Read own saved searches" on saved_searches
for select using (auth.uid() = profile_id);

create policy "Manage own saved searches" on saved_searches
for insert with check (auth.uid() = profile_id);

create policy "Manage own saved searches update" on saved_searches
for update using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "Delete own saved searches" on saved_searches
for delete using (auth.uid() = profile_id);

create policy "Read related matches" on matches
for select using (auth.uid() = profile_id);

create policy "Insert matches via service role" on matches
for insert with check (auth.role() = 'service_role');

create policy "Listings insert verified" on listings
for insert with check (auth.uid() = owner_id);

create policy "Update own listings" on listings
for update using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Threads visibility" on threads
for select using (auth.uid() = initiator_id or auth.uid() = recipient_id);

create policy "Manage threads" on threads
for insert with check (auth.uid() = initiator_id)
with check (auth.uid() = initiator_id);

create policy "Messages visibility" on messages
for select using (
  exists (
    select 1 from threads t
    where t.id = messages.thread_id and (t.initiator_id = auth.uid() or t.recipient_id = auth.uid())
  )
);

create policy "Send messages" on messages
for insert with check (
  exists (
    select 1 from threads t
    where t.id = messages.thread_id and (t.initiator_id = auth.uid() or t.recipient_id = auth.uid())
  )
);

alter table profiles enable row level security;
alter table preferences enable row level security;
alter table listings enable row level security;
alter table listing_images enable row level security;
alter table saved_searches enable row level security;
alter table matches enable row level security;
alter table threads enable row level security;
alter table messages enable row level security;
alter table verifications enable row level security;

create policy "Read own verifications" on verifications
for select using (auth.uid() = profile_id);

create policy "Manage own verification" on verifications
for insert with check (auth.uid() = profile_id);

create policy "Update own verification" on verifications
for update using (auth.uid() = profile_id)
with check (auth.uid() = profile_id);

create policy "Public listing images" on listing_images
for select using (
  exists (
    select 1 from listings l
    where l.id = listing_images.listing_id and l.is_active
  )
);

create policy "Manage own listing images" on listing_images
for all using (
  exists (
    select 1 from listings l
    where l.id = listing_images.listing_id and l.owner_id = auth.uid()
  )
) with check (
  exists (
    select 1 from listings l
    where l.id = listing_images.listing_id and l.owner_id = auth.uid()
  )
);

create view listings_view as
select
  l.*, 
  coalesce(json_agg(li.url order by li.sort) filter (where li.url is not null), '[]'::json) as images
from listings l
left join listing_images li on li.listing_id = l.id
group by l.id;

