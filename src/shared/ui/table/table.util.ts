export function getRowOrder(
  index: number,
  curPage: number, 
  rowsPerPage: number | null
): number {
  return (curPage - 1) * (rowsPerPage ?? 0) + index + 1
} 