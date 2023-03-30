import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getApp } from 'firebase/app';
import { useContext } from 'react';
import { AuthContext, AuthStatus } from './firebase/authContext';

import { sendEvent } from '../lib/gtag';


import { FirestoreData } from './firebase/data';
import { initAllItems } from './domain/items';
import { Cloudsave } from './domain/cloudsave';
import { IdleonData, initAccountDataKeys, updateIdleonData } from './domain/idleonData';

export enum AppStatus {
  LiveData,
  StaticData,
  InvalidProfile,
  Loading,
  NoData
}

export interface AppState {
  data: IdleonData,
  status: AppStatus,
  profile: string
}

export const AppContext = React.createContext<AppState>({
  data: new IdleonData(new Map(), new Date()),
  status: AppStatus.Loading,
  profile: ""
});

/* 
Known paths:
1. _uid/${user.uid} = character names
*/



export const AppProvider: React.FC<{ appLoading: boolean, data: { data: Map<string, any>, charNames: string[] } | undefined, domain: string, children?: React.ReactNode }> = ({ appLoading, data, domain, children }) => {
  const allItems = useMemo(() => initAllItems(), []);
  const baseAccountData = initAccountDataKeys(allItems);

  const [idleonData, setData] = useState<IdleonData>(new IdleonData(baseAccountData, new Date()));
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.Loading);
  const [fireStore, setFireStore] = useState<FirestoreData | undefined>(undefined);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const handleStaticData = useCallback(async (profile: string, data: { data: Map<string, any>, charNames: string[] }) => {
    setAppStatus(AppStatus.Loading);
    const cloudsave = Cloudsave.fromJSON(data.data)
    const newData = await updateIdleonData(cloudsave, data.charNames, [], allItems, {}, true);
    setData(newData);
    sendEvent({
      action: "handle_static",
      category: "engagement",
      label: profile,
      value: 1,
    });
    setAppStatus(AppStatus.StaticData);
  }, []);

  const handleLiveData = useCallback(async (cloudsave: Cloudsave, charNames: string[], companions: number[], serverVars: Record<string, any>) => {
    // console.log("LiveData", appStatus, idleonData.getData().size);
    // if (appStatus != AppStatus.LiveData) {
    //   setAppStatus(AppStatus.Loading);
    // }
    //const newData = await updateIdleonData(cloudsave, charNames, companions, allItems, serverVars, false);
    //setData(newData);
    sendEvent({
      action: "handle_snapshot",
      category: "engagement",
      label: user?.uid,
      value: 1,
    });
    setAppStatus(AppStatus.LiveData);
  }, [appStatus]);

  useEffect(() => {
    // Don't do anything while the auth is still being figured out.
    if (authContext?.authStatus == AuthStatus.Loading) {
      return;
    }

    const app = getApp();
    // Regular usage, and firestore hasn't been initialised yet.
    if (!domain && !fireStore && AuthStatus.Valid && user) {
      setFireStore(new FirestoreData(user.uid, app, handleLiveData));
    }
    // Domain has been provided, it's valid and the profile data hasn't been parsed yet.
    else if (domain && domain != "" && appStatus != AppStatus.StaticData) {
      // If there's no data, it's an invalid profile
      if (!data || data.data.size == 0) {
        setAppStatus(AppStatus.InvalidProfile);
      }
      else { // Else, we have data we need to parse.
        handleStaticData(domain, data);
      }
    }
    // No domain and no logged in user, we have no data.
    if (!domain && authContext?.authStatus == AuthStatus.NoUser) {
      setAppStatus(AppStatus.NoData);
    }
  }, [domain, user, authContext, data, appLoading]);

  const contextValue = useMemo(() => ({
    data: idleonData,
    status: appStatus,
    profile: domain
  }), [idleonData, appStatus, domain]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
