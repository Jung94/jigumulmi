import styles from './table.module.scss'
import type { TdProps, ThProps, TrProps } from './tableTypes'

export const Td = ({
  children, 
  align='center',
  colSpan=1,
  rowSpan=1,
  style,
}: TdProps) => {
  return <td className={styles.td} scope='row' align={align} colSpan={colSpan} rowSpan={rowSpan} style={style}>{children}</td>
}

export const Th = ({
  children, 
  align='center',
  colSpan,
  rowSpan,
  style
}: ThProps) => {
  return <th className={styles.th} scope="col" align={align} colSpan={colSpan} rowSpan={rowSpan} style={style}>{children}</th>
}

export const Tr = ({
  children, 
  isSelected,
  disabled,
  active,
  onClick,
  style
}: TrProps) => {
  return (
    <tr 
      className={`
        ${styles.tr} 
        ${active ? styles.tr_active : ""}
        ${disabled ? styles.tr_disabled : ""}
        ${isSelected ? styles.tr_is_selected : ""}
      `} 
      onClick={onClick} 
      style={style}
    >
      {children}
    </tr>
  )
}

export function BooleanCircle({ value }: { value: boolean }) {
  if (value) return <div style={{width: '0.75rem', height: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#0D9276'}}></div>
    else return <div style={{width: '0.75rem', height: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#EF4040'}}></div>
}