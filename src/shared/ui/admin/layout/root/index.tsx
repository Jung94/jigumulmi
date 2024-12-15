import styles from './root.module.scss'
import Header from '@/components/admin/header'
import Sidebar from '@/components/admin/sidebar'

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