import styles from './main.module.scss'

type Props = {
  children: React.ReactNode
  style?: any
}

const MainSection = ({children, style}: Props) => {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  )
}

export default MainSection