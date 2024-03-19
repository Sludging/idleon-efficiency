'use client'

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { AppDataStore, DataStatus, createAppDataStore, initAppDataStore } from '../stores/appDataStore'
import { useAuthStore } from './authStoreProvider'
import { initAllItems } from '../../data/domain/items'
import { initAccountDataKeys } from '../../data/domain/idleonData'
import { AuthStatus } from '../../data/firebase/authContext'
import { isSubDomain } from '../../data/utility'

export const AppDataStoreContext = createContext<StoreApi<AppDataStore> | null>(
  null,
)

export interface AppDataStoreProviderProps {
  children: ReactNode
}

export const AppDataStoreProvider = ({
  children,
}: AppDataStoreProviderProps) => {
  const storeRef = useRef<StoreApi<AppDataStore>>()
  if (!storeRef.current) {
    const allItems = initAllItems();
    const initData = initAccountDataKeys(new Map(), allItems)
    storeRef.current = createAppDataStore(initAppDataStore(initData))
  }

  return (
    <AppDataStoreContext.Provider value={storeRef.current}>
      {children}
    </AppDataStoreContext.Provider>
  )
}

export const useAppDataStore = <T,>(
  selector: (store: AppDataStore) => T,
): T => {
  const appDataStoreContext = useContext(AppDataStoreContext)
  const { user, authStatus } = useAuthStore(
    (state) => ({ user: state.user, authStatus: state.authStatus }),
  )

  if (!appDataStoreContext) {
    throw new Error(`useAppDataStore must be use within AppDataStoreProvider`)
  }

  const subDomain = isSubDomain();
  // Probably a better way to handle this.
  const currentState = appDataStoreContext.getState()
  if (!currentState.initialized && (user || subDomain)) {
    currentState.initialize(user?.uid ?? "");
  }

  if (authStatus == AuthStatus.NoUser && !subDomain) {
    currentState.dataStatus = DataStatus.NoData;
  }

    return useStore(appDataStoreContext, selector)
}