import Search from '@/components/_pages/search'
import { getBakeryList } from '@/app/search/actions'

export default async function SearchPage() {
  // const { data } = await getBakeryList()
 
  return <Search />
  // return <Search bakeryList={data} />
}
