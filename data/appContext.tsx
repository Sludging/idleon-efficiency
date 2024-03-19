'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { getApp } from 'firebase/app';
import { AuthStatus } from './firebase/authContext';

import { sendEvent } from '../lib/gtag';

import { FirestoreData } from './firebase/data';
import { initAllItems } from './domain/items';
import { Cloudsave } from './domain/cloudsave';
import { IdleonData, initAccountDataKeys, updateIdleonData } from './domain/idleonData';
import { getSubDomain, isSubDomain } from './utility';
import { fetcher } from './fetchers/getProfile';
import { useAuthStore } from '../lib/providers/authStoreProvider';

export enum AppStatus {
  Init,
  InvalidProfile,
  Ready
}

export enum DataStatus {
  Init,
  Loading,
  LiveData,
  NoData,
  StaticData,
  MissingData,
}

export interface AppState {
  data: IdleonData,
  status: AppStatus,
  dataStatus: DataStatus,
  profile: string
}

export const AppContext = React.createContext<AppState>({
  data: new IdleonData(new Map(), new Date()),
  status: AppStatus.Init,
  dataStatus: DataStatus.Init,
  profile: ""
});

/* 
Known paths:
1. _uid/${user.uid} = character names
*/

const allItems = initAllItems();
const initData = initAccountDataKeys(new Map(), allItems);
const idleonData = new IdleonData(initData, new Date());
idleonData.initialized = true;


export const AppProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.Ready);
  const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.Init);
  const [fireStore, setFireStore] = useState<FirestoreData | undefined>(undefined);
  const [currentDomain, setCurrentDomain] = useState<string>("");
  const { user, authStatus } = useAuthStore(
    (state) => state,
  )

  const handleStaticData = async (profile: string, data: { data: Map<string, any>, charNames: string[] }) => {
    setDataStatus(DataStatus.Loading);
    const cloudsave = Cloudsave.fromJSON(data.data)
    console.log("Handle Static", idleonData, cloudsave)
    updateIdleonData(idleonData.getData(), cloudsave, data.charNames, [], allItems, {}, true);
    idleonData.setLastUpdated(idleonData.getData().get("lastUpdated") as Date);
    sendEvent({
      action: "handle_static",
      category: "engagement",
      label: profile,
      value: 1,
    });
    setDataStatus(DataStatus.StaticData);
  };

  const handleLiveData = (cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>, companions: number[]) => {
    setDataStatus(DataStatus.Loading);
    updateIdleonData(idleonData.getData(), cloudsave, charNames, [], allItems, {}, true);
    idleonData.setLastUpdated(idleonData.getData().get("lastUpdated") as Date);
    sendEvent({
      action: "handle_snapshot",
      category: "engagement",
      label: user?.uid,
      value: 1,
    });
    setDataStatus(DataStatus.LiveData);
  };

  useEffect(() => {
    // Don't do anything while the auth is still being figured out.
    if (authStatus != AuthStatus.Loading) {
      const subDomain = isSubDomain();
      const domain = getSubDomain();
      const app = getApp();
      // Regular usage, and firestore hasn't been initialised yet.
      if (!subDomain && !fireStore && AuthStatus.Valid && user) {
        setFireStore(new FirestoreData(user.uid, app, handleLiveData));
      }
      // Domain has been provided, it's valid and the profile data hasn't been parsed yet.
      else if (subDomain && domain != currentDomain && dataStatus != DataStatus.StaticData) {
        fetcher(domain)
          .then(value => {
            const { data, charNames, domain } = value;
            // If there's no data, it's an invalid profile
            if (!data || data.size == 0) {
              setAppStatus(AppStatus.InvalidProfile);
              setDataStatus(DataStatus.MissingData)
            }
            else { // Else, we have data we need to parse.
              handleStaticData(domain, { data: data, charNames: charNames as string[] });
            }
          })
        setCurrentDomain(domain);
      }
      // No domain and no logged in user, we have no data.
      if (!subDomain && authStatus == AuthStatus.NoUser) {
        setDataStatus(DataStatus.NoData);
      }
      // No domain, there's a valid user but we have no actual data. Probably wrong account?
      if (!subDomain && authStatus == AuthStatus.Valid && dataStatus == DataStatus.NoData) {
        setDataStatus(DataStatus.MissingData);
      };
    }
  }, [authStatus, user, appStatus, dataStatus]);


  const contextValue = useMemo(() => ({
    data: idleonData,
    status: appStatus,
    dataStatus: dataStatus,
    profile: currentDomain
  }), [idleonData, appStatus, dataStatus, currentDomain]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
