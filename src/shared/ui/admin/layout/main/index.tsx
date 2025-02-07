import styles from './main.module.scss'

type Props = {
  children: React.ReactNode
  row?: boolean
  scroll?: boolean
  style?: any
}

const Layout = ({
  children, 
  row,
  scroll,
  style,
}: Props) => {
  return (
    <div className={styles.layout} style={style}>
      <div className={`${styles.main} ${row && styles.row} ${scroll && styles.scroll}`}>
        {children}
      </div>
    </div>
  )
}

export default Layout