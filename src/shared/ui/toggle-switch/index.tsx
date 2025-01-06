import { ChangeEvent } from 'react'
import styles from './toggle-switch.module.scss'

export default function ToggleSwitch({
  name,
  checked,
  disabled,
  onChange
}: {
  name: string
  checked?: boolean
  disabled?: boolean
  // onChange?: (value: boolean) => void
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className={styles['toggle']}>
      {/* {name && <span className={styles['toggle-name']}>{name}</span>} */}
      <input 
        name={name}
        role='switch' 
        type='checkbox' 
        checked={checked}
        disabled={disabled}
        // onChange={({ target: { checked }}) => onChange && onChange(checked)}
        onChange={(e) => onChange && onChange(e)}
      />
    </label>
  )
}
// https://www.daleseo.com/react-checkboxes/