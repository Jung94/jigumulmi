// import { supabase } from '@/lib/api/supabase/client';
import { createClient } from '@/lib/api/supabase/server';

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('test_02')
    .select('*')

  if (error) console.log("error", error)
  
  for (let bakery of data!) {
    if (bakery.position) bakery.position = JSON.parse(bakery.position)
  }
  // data?.forEach((e: any) => {
  //   if (e.position) e.position = JSON.parse(e.position)
  // })
  console.log(data[data.length - 1], typeof data)
  // console.log(bakeryList.position)
  // bakeryList["position"] = JSON.parse(bakeryList.position)
  // console.log(bakeryList.position)

  // const bakeries = JSON.stringify(data, null, 2);
  return Response.json({ data });
}