import { ReactNode, FormEvent } from 'react'
import styles from './form.module.scss'

export default function Form({ children, onSubmit }: { 
  children: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form className={styles['form']} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

Form.Item = FormItem
Form.Control = FormControl
Form.Description = FormDescription
Form.Message = FormMessage
Form.Divider = FormDivider

function FormItem({ row, name, children }: { row?: boolean; name: string; children: React.ReactNode; }) {
  return (
    <div className={`
      ${styles['form-item']}
      ${row ? styles['form-item-row'] : ''}
    `}>
      <div className={styles['form-item-name']}>{name}</div>
      {children}
    </div>
  )
}

function FormControl({ children }: { children: ReactNode; }) {
  return <div className={styles['form-control']}>{children}</div>
}

function FormDescription({ children }: { children: ReactNode | string; }) {
  return <div className={styles['form-description']}>{children}</div>
}

function FormMessage({ children }: { children: ReactNode | string; }) {
  return <div className={styles['form-message']}>{children}</div>
}

function FormDivider() {
  return <div className={styles['form-divider']}></div>
}