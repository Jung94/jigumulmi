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

export function Checkbox({ isActive, onCheck }: { isActive?: boolean; onCheck?: () => void; }) {
  return (
    <div className={styles['checkbox']} onClick={onCheck}>
      <div className={`${styles['checkbox-icon']} ${styles[isActive ? 'active' : 'disabled']}`}>
        <svg width="16" height="16" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M5 13L9 17L19 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
    </div>
  )
}

export function BooleanCircle({ value }: { value: boolean }) {
  if (value) return <div className={`${styles['banner-circle']} ${styles['banner-circle-blue']}`}></div>
    else return <div className={`${styles['banner-circle']} ${styles['banner-circle-red']}`}></div>
}
