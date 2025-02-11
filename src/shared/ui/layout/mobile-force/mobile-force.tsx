import styles from './mobile-force.module.scss'

export default function MobileForceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles['layout']}>
      <div className={styles['content']}>
        {children}
      </div>
    </div>
  )
}