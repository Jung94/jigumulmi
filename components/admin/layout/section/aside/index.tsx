import styles from './aside.module.scss'

type Props = {
  children: React.ReactNode
  style?: any
}

const AsideSection = ({children, style}: Props) => {
  return (
    <div className={styles.section} style={style}>
      {children}
    </div>
  )
}

export default AsideSection