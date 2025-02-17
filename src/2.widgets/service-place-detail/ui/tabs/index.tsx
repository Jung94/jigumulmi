import styles from './tabs.module.scss'
import React, { useState, ReactNode } from 'react'
import { TabsContext, useTabsContext } from './tabs.context'

const Tabs = ({ 
  children, 
  defaultValue, 
  value,
  onChange,
  style 
}: {
  children: ReactNode
  defaultValue: string
  value?: string
  onChange?: (value: string) => void
  style?: Record<string, string>
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultValue)
  const activeTab = value ? value : internalActiveTab

  const setActiveTab = (newValue: string) => {
    onChange?.(newValue)
    if (!value) setInternalActiveTab(newValue)
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={styles['tabs']} style={style}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabsList({ children }: { children: ReactNode }) {
  return (
    <div className={styles['tabs-list']}>{children}</div>
  )
}

function TabsTrigger({ 
  children, 
  value,
  disabled,
  onTrigger
}: { 
  children: ReactNode
  value: string 
  disabled?: boolean 
  onTrigger?: () => void
}) {
  const { activeTab, setActiveTab } = useTabsContext()

  const handleClick = () => {
    onTrigger?.()
    if (disabled) return
    setActiveTab?.(value)
  }

  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`${styles['tabs-trigger']} ${activeTab === value ? styles['active'] : ""}`}
    >
      {children}
    </button>
  )
}

function TabsContent({ 
  children, 
  value, 
  basicStyle,
  style 
}: { 
  children: ReactNode
  value: string
  basicStyle?: boolean
  style?: Record<string, string>
}) {
  const { activeTab } = useTabsContext()

  return (
    <div
      style={style}
      className={`
        ${styles['tabs-content']} 
        ${!!basicStyle ? styles['tabs-content-basic-style'] : ''}
        ${activeTab === value ? styles['tabs-content-visible'] : styles['tabs-content-hidden']}
      `}
    >
      {activeTab === value && children}
    </div>
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
}
