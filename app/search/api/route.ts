import { supabase } from '@/lib/api/supabase';
export async function GET() {
  const { data, error } = await supabase
    .from('test')
    .select()

  if (error) console.log("error", error)
  // console.log('11111-1-1-1-1-1--', supabase)
  return new Response(`GET - sear`);
}