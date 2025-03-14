import { createContext, useContext, useState } from 'react'

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined)

export function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider")
  }
  return context
}