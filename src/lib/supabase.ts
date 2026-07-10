import { createClient } from '@supabase/supabase-js';

const url = process.env.GATSBY_SUPABASE_URL ?? '';
const key = process.env.GATSBY_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(url, key);
