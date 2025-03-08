'use client'

import Link from 'next/link'
import Button from './button'
import styles from './sidebar.module.scss'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { adminMenus } from './menu-list'

const Sidebar = () => {
  const pathname = usePathname()
  const [ activeMenu, setActiveMenu ] = useState<number>(0)
  const [ activeSubMenu, setActiveSubMenu ] = useState<number>(0)

  const getMenu = () => {
    // path가 없는 경우, 홈페이지 이동 시
    if (pathname === '/') {
      setActiveMenu(adminMenus[0].value)
      setActiveSubMenu(adminMenus[0].subMenu.length ? 1 : 0)
      return
    }

    // path가 있는 경우
    const atomPaths = pathname?.split('/') // Ex: ['', 'admin', 'labeler', 'management']
    const item = adminMenus.find((el: any) => `${atomPaths?.[1]}/${atomPaths?.[2]}` === el.path)
    
    if (!item) { // 일치하는 path가 없는 경우
      setActiveMenu(0)
      setActiveSubMenu(0)
      return
    }

    // Update: 메인 메뉴
    setActiveMenu(item.value)

    // Update: 서브 메뉴
    if (item.subMenu.length === 0) {
      setActiveSubMenu(0)
    } else {
      const subValue = item.subMenu.find((el: any) => pathname?.includes(el.path))?.value
      setActiveSubMenu(subValue ? subValue : 0)
    }
  }

  const getPathAndQuery = (mainMenu: string, subMenu?: string) => {
    // const main = adminMenus.find(menu => menu.name === )
    let menus

    const mainObj = adminMenus?.find(menu => menu.name === mainMenu)
    if (!mainObj) return '/'
    if (!subMenu) return `/${mainObj.path}?${mainObj.query}`
      else {
        const subObj = mainObj.subMenu.find(menu => menu.name === subMenu)
        if (!subObj) return '/'
        return `/${subObj.path}?${subObj.query}`
      }
    return ``
  }

  useEffect(()=>{
    getMenu()
  }, [pathname])

  return (
    <div className={styles.sidebar}>
      <Link href="/admin/place" className={styles.logo}>Jigumulmi</Link>
      {adminMenus.map((el: any) => 
        <Button 
          key={el.value} 
          item={el}
          activeMenu={activeMenu}
          activeSubMenu={activeSubMenu}
          setActiveMenu={setActiveMenu} 
          setActiveSubMenu={setActiveSubMenu} 
        >{el.name}</Button>)}
    </div>
  )
}

export default Sidebar