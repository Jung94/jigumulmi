// import { createClient } from '@/lib/api/supabase/server';

// export async function GET() {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from('test_02')
//     .select('*')

//   if (error) console.log("error", error)
  
//   for (let bakery of data!) {
//     if (bakery.position) bakery.position = JSON.parse(bakery.position)
//   }
//   // const bakeries = JSON.stringify(data, null, 2);
//   return Response.json({ data });
// }