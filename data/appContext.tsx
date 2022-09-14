import React, { useState, useEffect } from 'react';
import { getApp } from 'firebase/app';
import { useContext } from 'react';
import { AuthContext, AuthStatus } from './firebase/authContext';

import { sendEvent } from '../lib/gtag';


import { FirestoreData } from './firebase/data';
import { initAllItems } from './domain/items';
import { Cloudsave } from './domain/cloudsave';
import { IdleonData, updateIdleonData } from './domain/idleonData';

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
  const [idleonData, setData] = useState<IdleonData>(new IdleonData(new Map(), undefined));
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.Loading);
  const [fireStore, setFireStore] = useState<FirestoreData | undefined>(undefined);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const allItems = initAllItems();

  const handleStaticData = async (profile: string, data: { data: Map<string, any>, charNames: string[] }) => {
    setAppStatus(AppStatus.Loading);
    const cloudsave = Cloudsave.fromJSON(data.data)
    const newData = await updateIdleonData(cloudsave, data.charNames, allItems, {}, true);
    setData(newData);
    sendEvent({
      action: "handle_static",
      category: "engagement",
      label: profile,
      value: 1,
    });
    setAppStatus(AppStatus.StaticData);
  }

  const handleLiveData = async (cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>) => {
    setAppStatus(AppStatus.Loading);
    const newData = await updateIdleonData(cloudsave, charNames, allItems, serverVars, false);
    setData(newData);
    sendEvent({
      action: "handle_snapshot",
      category: "engagement",
      label: user?.uid,
      value: 1,
    });
    setAppStatus(AppStatus.LiveData);
  }

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

  return (
    <AppContext.Provider value={{
      data: idleonData,
      status: appStatus,
      profile: domain
    }}>
      {children}
    </AppContext.Provider>
  );
};