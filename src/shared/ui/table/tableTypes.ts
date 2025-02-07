export type TdProps = {
  children?: React.ReactNode
  align?: 'left' | 'center' | 'right'
  colSpan?: number
  rowSpan?: number
  style?: any
}

export type ThProps = {
  children?: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  colSpan?: number
  rowSpan?: number
  style?: any
}

export type TrProps = {
  children?: React.ReactNode;
  isSelected?: boolean
  disabled?: boolean
  active?: boolean
  onClick?: ()=>void
  style?: any
}