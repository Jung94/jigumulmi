// import { supabase } from '@/lib/api/supabase/client';

// export async function GET() {
//   const { data: bakeryData, error } = await supabase
//     .from('bakeries')
//     .select('*')

//   if (error) console.log("error", error)

//   const bakeries = JSON.stringify(bakeryData, null, 2);
//   console.log('11111-1-1-1-1-1--', bakeries, typeof bakeries)
//   return new Response(`GET - ${bakeries}`, );
// }