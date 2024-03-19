'use client'

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type AuthStore, createAuthStore } from '../stores/authStore'

export const AuthStoreContext = createContext<StoreApi<AuthStore> | null>(
  null,
)

export interface AuthStoreProviderProps {
  children: ReactNode
}

export const AuthStoreProvider = ({
  children,
}: AuthStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AuthStore>>()
  if (!storeRef.current) {
    storeRef.current = createAuthStore()
  }

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  )
}

export const useAuthStore = <T,>(
  selector: (store: AuthStore) => T,
): T => {
  const authStoreContext = useContext(AuthStoreContext)

  if (!authStoreContext) {
    throw new Error(`useAuthStore must be use within AuthStoreProvider`)
  }

  // Probably a better way to handle this, but it works for now.
  const currentState = authStoreContext.getState()
  if (!currentState.initialized) {
    currentState.initialize();
  }

  return useStore(authStoreContext, selector)
}