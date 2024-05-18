import styles from './header.module.scss'

type Props = {
  children?: React.ReactNode
  title?: string
  info?: React.ReactNode
  style?: any
}

const HeaderSection = ({children, title, info, style}: Props) => {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.title_wrap}>
        {title && <div className={`${styles.title} ${styles.has_info}`}>{title}</div>}
        {info && <div className={styles.info_wrap}>{info}</div>}
      </div>
      {children}
    </div>
  )
}

export default HeaderSection