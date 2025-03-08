import styles from './root.module.scss'
import { Header, Sidebar } from '@/src/shared/ui/admin'

const Layout = ({
  children, 
}: {
  children: React.ReactNode
}) => {
  
  return (
    <div className={styles.layout}>
      <nav>
        <Sidebar />
      </nav>
      <header>
        <Header />
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout