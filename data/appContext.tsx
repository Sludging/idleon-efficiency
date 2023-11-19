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



export const AppProvider: React.FC<{ appLoading: boolean, data: { data: Map<string, any>, charNames: string[] } | undefined, domain: string, children?: React.ReactNode }> = ({ appLoading, data, domain, children }) => {
  // This section is called multiple times so I used memos, is that .. an issue?
  const allItems = useMemo(() => initAllItems(), []);
  const baseAccountData = useMemo(() => initAccountDataKeys(allItems), []);

  const [idleonData, setData] = useState<IdleonData>(new IdleonData(baseAccountData, new Date()));
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.Ready);
  const [dataStatus, setDataStatus] = useState<DataStatus>(DataStatus.Init);
  const [fireStore, setFireStore] = useState<FirestoreData | undefined>(undefined);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const handleStaticData = useCallback(async (profile: string, data: { data: Map<string, any>, charNames: string[] }) => {
    setDataStatus(DataStatus.Loading);
    const cloudsave = Cloudsave.fromJSON(data.data)
    const newData = await updateIdleonData(idleonData.getData(), cloudsave, data.charNames, [], allItems, {}, true);
    setData(newData);
    sendEvent({
      action: "handle_static",
      category: "engagement",
      label: profile,
      value: 1,
    });
    setDataStatus(DataStatus.StaticData);
  }, [appStatus, dataStatus]);

  const handleLiveData = async (cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>) => {
    // TODO: FIX COMPANIONS
    setDataStatus(DataStatus.Loading);
    const newData = await updateIdleonData(idleonData.getData(), cloudsave, charNames, [], allItems, serverVars, false);
    setData(newData);
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
    if (authContext?.authStatus == AuthStatus.Loading) {
      return;
    }

    const app = getApp();
    // Regular usage, and firestore hasn't been initialised yet.
    if (!domain && !fireStore && AuthStatus.Valid && user) {
      setFireStore(new FirestoreData(user.uid, app, handleLiveData));
    }
    // Domain has been provided, it's valid and the profile data hasn't been parsed yet.
    else if (domain && domain != "" && dataStatus != DataStatus.StaticData) {
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
      setDataStatus(DataStatus.NoData);
    }
    // No domain, there's a valid user but we have no actual data. Probably wrong account?
    if (!domain && authContext?.authStatus == AuthStatus.Valid && dataStatus == DataStatus.NoData) {
      setDataStatus(DataStatus.MissingData);
    }
  }, [domain, user, authContext, data, appLoading]);

  const contextValue = useMemo(() => ({
    data: idleonData,
    status: appStatus,
    dataStatus: dataStatus,
    profile: domain
  }), [idleonData, appStatus, dataStatus, domain]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
