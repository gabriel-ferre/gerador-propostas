-- T05: bucket publico `midia` (leitura via URL publica; escrita so para admin logado)

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'midia',
  'midia',
  true,
  52428800, -- 50 MB
  array['image/png','image/jpeg','image/webp','image/svg+xml','image/gif','video/mp4','video/webm']
)
on conflict (id) do nothing;

-- Sem policy de select para anon: o bucket publico serve as URLs diretas,
-- mas ninguem consegue listar os arquivos.

drop policy if exists "midia_insert_authenticated" on storage.objects;
create policy "midia_insert_authenticated" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'midia');

drop policy if exists "midia_update_authenticated" on storage.objects;
create policy "midia_update_authenticated" on storage.objects
  for update to authenticated
  using (bucket_id = 'midia')
  with check (bucket_id = 'midia');

drop policy if exists "midia_delete_authenticated" on storage.objects;
create policy "midia_delete_authenticated" on storage.objects
  for delete to authenticated
  using (bucket_id = 'midia');
