import styles from './atoms.module.scss'
import type { TdProps, ThProps, TrProps } from './types'

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