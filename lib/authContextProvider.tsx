'use client'
 
import React from 'react'
import { AuthProvider } from '../data/firebase/authContext'
import { useRouter } from 'next/navigation'
 
export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}