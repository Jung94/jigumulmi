export type TableProps = {
  isFetching?: boolean
  items: any
  currentPage: number
  totalPage: number
  handlePage: (page: number)=>void
}

export type BodyProps = {
  data: any
  currentPage: number
  rowsPerPage: number
}