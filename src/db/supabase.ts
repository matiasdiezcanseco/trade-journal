import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

export const supabase = createClient(env.PUBLIC_API_ENDPOINT, env.PUBLIC_API_KEY);
