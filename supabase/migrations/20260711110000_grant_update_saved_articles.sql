-- upsert（INSERT ... ON CONFLICT DO UPDATE）はUPDATE権限とRLSポリシーを要求するため追加する
grant update on public.saved_articles to authenticated;

create policy "自分の保存記事のみ更新可"
  on public.saved_articles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
