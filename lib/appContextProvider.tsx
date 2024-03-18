'use client'
 
import React from 'react'
import { AppProvider } from '../data/appContext'
 
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
}