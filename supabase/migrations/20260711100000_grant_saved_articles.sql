-- pgdelta経由の適用でデフォルト権限が付与されなかったため、明示的にGRANTする
-- 行レベルの保護はRLSポリシーが担保する（未ログインはlocalStorage運用のためanonには付与しない）
grant select, insert, delete on public.saved_articles to authenticated;
grant all on public.saved_articles to service_role;
