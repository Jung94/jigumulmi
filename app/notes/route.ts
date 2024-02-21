import { supabase } from '@/lib/api/supabase';
export async function GET() {
  const { data, error } = await supabase
    .from("bakeries")
    .select()

  if (error) console.log("error", error)
  console.log(data)
  return Response.json(data);
}