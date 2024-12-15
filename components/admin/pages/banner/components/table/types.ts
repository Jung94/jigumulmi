export type TableProps = {
  isFetching?: boolean
  items: any
  currentPage: number
  totalPage: number
  handlePage: (page: number)=>void
  handleClickRow: (member: any)=>void
}

export type BodyProps = {
  data: any
  currentPage: number
  rowsPerPage: number
  handleClickRow: (member: any)=>void
}