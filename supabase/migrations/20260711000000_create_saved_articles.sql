create table public.saved_articles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  link text not null,
  source text not null,
  published_at timestamptz,
  hatebu integer,
  summary text,
  matched_keywords text[],
  saved_at timestamptz default now() not null,
  unique(user_id, link)
);

alter table public.saved_articles enable row level security;

create policy "自分の保存記事のみ参照可"
  on public.saved_articles for select using (auth.uid() = user_id);

create policy "自分の保存記事のみ挿入可"
  on public.saved_articles for insert with check (auth.uid() = user_id);

create policy "自分の保存記事のみ削除可"
  on public.saved_articles for delete using (auth.uid() = user_id);
