"use client"

import React, {useState, useEffect} from 'react'
import {useRouter, usePathname} from 'next/navigation'
import Image from 'next/image'
import styles from './button.module.scss'

import { DashboardIcon, WaitingProjectIcon, ProjectIcon, UserIcon, UsersIcon, QuestionIcon } from '../icon-list'

const getIcon = (name: string, value: number, activeMenu: number) => {
  const color = activeMenu === value ? '#000' : '#888'
  if (name === 'DashboardIcon') return <DashboardIcon color={color} />
  if (name === 'ProjectIcon') return <ProjectIcon color={color} />
  if (name === 'WaitingProjectIcon') return <WaitingProjectIcon color={color} />
  if (name === 'UserIcon') return <UserIcon color={color} />
  if (name === 'UsersIcon') return <UsersIcon color={color} />
  if (name === 'QuestionIcon') return <QuestionIcon color={color} />
}

interface SidebarButtonProps {
  children: JSX.Element;
  item: any;
  activeMenu: number;
  activeSubMenu: number;
  setActiveMenu: React.Dispatch<React.SetStateAction<number>>;
  setActiveSubMenu: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarButton = ({children, item, activeMenu, activeSubMenu, setActiveMenu, setActiveSubMenu}: SidebarButtonProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const isSubMenu = !!(item.subMenu?.length)
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(true)

  const setSubMenuHeight = () => {
    const panel: HTMLElement | null = document.getElementById(`panel-${item.value}`)
    if (!panel) return
      else if (panel?.style.maxHeight) panel.setAttribute("style", "maxHeight: null;")
      else panel.style.maxHeight = panel.scrollHeight + 'px'
  }
  const movePage = (path: string, query?: any) => {
    let fullPathname = `/${path}`
    if (fullPathname === pathname) return
    if (query) fullPathname = fullPathname + `?${query}`
    router.push(fullPathname)
  }
  const onClickTab = () => {
    // if (item.path.includes('notice')) return  // notice -> _blank notion page
    
    if (!isSubMenu) {
      movePage(item.path, item.query)
      setActiveMenu(item.value)
      setActiveSubMenu(0)
    } else {
      setSubMenuHeight()
      setIsOpenSubMenu(!isOpenSubMenu)
    }
  }
  const onClickSubTab = (v: number, path: string, query: any) => {
    movePage(path, query)
    setActiveMenu(item.value)
    setActiveSubMenu(v)
  }

  useEffect(()=>{
    setSubMenuHeight()
  }, [])

  return (
    // <Link href={`https://predictionai.notion.site/f26b0f10c8e94853bb5b40de7f19c6c2`} target={item.path.includes('notice') ? "_blank" : ""}>
    <>
      <button 
        className={`
          ${styles.button} 
          ${activeMenu === item.value && styles.active_main} 
          ${isSubMenu && styles.is_sub_menu}
        `} 
        value={item.value} 
        onClick={onClickTab}
      >
        <span className={styles.icon}>
          {getIcon(item.icon, item.value, activeMenu)}
        </span>
        <span>{children}</span>
        {isSubMenu &&
          <span className={styles.nav_arrow}>
            <Image 
              src={isOpenSubMenu 
                ? '/images/sidebar/nav-arrow-up.svg' 
                : '/images/sidebar/nav-arrow-down.svg'
              } 
              alt='nav-arrow'
              width={13}
              height={13}
            />
          </span>
        }
      </button>

      {isSubMenu && 
        <div className={`${styles.sub_menu} ${isOpenSubMenu && styles.sub_button}`} id={`panel-${item.value}`}>
          {item.subMenu.map((el: any) => {
            return (
              <button className={`${styles.sub_button} ${activeSubMenu === el.value && styles.active}`} key={el.value} onClick={()=>onClickSubTab(el.value, el.path, el.query)}>{el.name}</button>
            )
          })}
        </div>
      }
    </>
    // </Link>
  )
}

export default SidebarButton