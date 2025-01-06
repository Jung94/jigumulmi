import styles from './header.module.scss'

type Props = {
  children?: React.ReactNode
  title: string
  style?: any
}

const HeaderSection = ({children, title, style}: Props) => {
  return (
    <div className={styles['header']} style={style}>
      <div className={styles['title']}>{title}</div>
      <div className={styles['control']}>
        {children}
      </div>
    </div>
  )
}

export default HeaderSection