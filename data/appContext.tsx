import React, { useState, useEffect } from 'react';
import { getApp } from 'firebase/app';
import { useContext } from 'react';
import { AuthContext } from './firebase/authContext';

import { sendEvent } from '../lib/gtag';


import { FirestoreData } from './firebase/data';
import { initAllItems } from './domain/items';
import { Cloudsave } from './domain/cloudsave';
import { IdleonData, updateIdleonData } from './domain/idleonData';

export enum AppStatus {
  LiveData,
  StaticData,
  InvalidProfile,
  Loading
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



export const AppProvider: React.FC<{appLoading: boolean, data: {data: Map<string, any>, charNames: string[]} | undefined, domain: string, children?: React.ReactNode}> = ({ appLoading, data, domain, children }) => {
  const [idleonData, setData] = useState<IdleonData>(new IdleonData(new Map(), undefined));
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.Loading);
  const [fireStore, setFireStore] = useState<FirestoreData | undefined>(undefined);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const allItems = initAllItems();

  const handleStaticData = async (profile: string, data: { data: Map<string, any>, charNames: string[] }) => {
    const cloudsave = Cloudsave.fromJSON(data.data)
    const newData = await updateIdleonData(cloudsave, data.charNames, allItems, {}, true);
    setData(newData);
    sendEvent({
      action: "handle_static",
      category: "engagement",
      label: profile,
      value: 1,
    });
  }

  const handleLiveData = async (cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>) => {
    const newData = await updateIdleonData(cloudsave, charNames, allItems, serverVars, false);
    setData(newData);
    sendEvent({
      action: "handle_snapshot",
      category: "engagement",
      label: user?.uid,
      value: 1,
  });
  }

  useEffect(() => {
    const app = getApp();
    if (!domain && !fireStore && user) {
      setFireStore(new FirestoreData(user.uid, app, handleLiveData));
      setAppStatus(AppStatus.LiveData);
    } 
    else if (domain) {
      if (!data || data.data.size == 0) {
        setAppStatus(AppStatus.InvalidProfile);
      }
      else {
        handleStaticData(domain, data);
        setAppStatus(AppStatus.StaticData);
      }
    }
    if (!domain && !user) {
      setAppStatus(AppStatus.Loading);
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