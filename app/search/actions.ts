'use server'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
import { createClient } from '@/lib/api/supabase/server'

export async function registerBakery(formData: FormData) {
  const supabase = createClient()

  const data = {
    id: 1,
    name: formData.get('bakery_name') as string,
    station_name_1: formData.get('subway') as string,
    desc: formData.get('desc') as string,
  }
  console.log('=-=-=-=-=-=-=-=-=-=', data)

  try {
    const { error } = await supabase.from('registered_bakeries').insert(data)
    if (error) throw error
    console.log('success!')
  } catch (error) {
    console.log('failed!')
  } finally {
    console.log('finished!')
  }
}