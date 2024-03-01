'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/api/supabase/server'

export async function registerBakery(formData: FormData) {
  const supabase = createClient()

  const data = {
    id: 1,
    bakeryName: formData.get('bakery_name') as string,
    subway: formData.get('subway') as string,
    desc: formData.get('desc') as string,
  }
  console.log(data)

  try {
    const { error } = await supabase.from('test_bakery').insert(data)
    if (error) throw error
    console.log('Bakery updated!')
  } catch (error) {
    console.log('Error updating the data!')
  } finally {
    console.log('Updating data is finished.')
  }

  // const { error } = await supabase.auth.signUp(data)

  // if (error) {
  //   redirect('/error')
  // }

  // revalidatePath('/', 'layout')
  // redirect('/')
}