'use client'

import React, { useState, useMemo, useEffect, useReducer } from 'react';
import { getApp } from 'firebase/app';
import { useContext } from 'react';
import { AuthContext, AuthStatus } from './firebase/authContext';

import { sendEvent } from '../lib/gtag';

import { FirestoreData } from './firebase/data';
import { initAllItems } from './domain/items';
import { Cloudsave } from './domain/cloudsave';
import { IdleonData, initAccountDataKeys, updateIdleonData } from './domain/idleonData';
import { getSubDomain, isSubDomain } from './utility';
import { fetcher } from './fetchers/getProfile';

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

interface AppState {
  data: IdleonData,
  status: AppStatus,
  dataStatus: DataStatus,
  profile: string
}

export const AppContext = React.createContext<AppState>({
  data: new IdleonData(new Map(), new Date()),
  status: AppStatus.Init,
  dataStatus: DataStatus.Init,
  profile: "",
});

/* 
Known paths:
1. _uid/${user.uid} = character names
*/

const allItems = initAllItems();
const initData = initAccountDataKeys(new Map(), allItems);
const idleonData = new IdleonData(initData, new Date());
idleonData.initialized = true;

function appReducer(state: AppState, action: { type: string, data: any }) {
  switch (action.type) {
    case 'data': {
      return { ...state, data: action.data };
    }
    case 'status': {
      return { ...state, status: action.data };
    }
    case 'dataStatus': {
      return { ...state, dataStatus: action.data };
    }
    case 'profile': {
      return { ...state, profile: action.data };
    }
    default: {
      return state;
    }
  }
}

export const AppProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    status: AppStatus.Ready,
    dataStatus: DataStatus.Init,
    data: new IdleonData(new Map(), new Date()),
    profile: "",
  })

  const [fireStore, setFireStore] = useState<FirestoreData | undefined>(undefined);

  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const handleStaticData = async (profile: string, data: { data: Map<string, any>, charNames: string[] }) => {
    dispatch({ type: "dataStatus", data: DataStatus.Loading })
    const cloudsave = Cloudsave.fromJSON(data.data)
    await updateIdleonData(idleonData.getData(), cloudsave, data.charNames, [], allItems, {}, true);
    idleonData.setLastUpdated(idleonData.getData().get("lastUpdated") as Date);
    dispatch({ type: "data", data: idleonData })
    sendEvent({
      action: "handle_static",
      category: "engagement",
      label: profile,
      value: 1,
    });
    dispatch({ type: "dataStatus", data: DataStatus.StaticData })
  };

  const handleLiveData = async (cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>, companions: number[]) => {
    dispatch({ type: "dataStatus", data: DataStatus.Loading })
    await updateIdleonData(idleonData.getData(), cloudsave, charNames, companions, allItems, {}, true);
    idleonData.setLastUpdated(idleonData.getData().get("lastUpdated") as Date);
    idleonData.lastModified = new Date()
    dispatch({ type: "data", data: idleonData })
    sendEvent({
      action: "handle_snapshot",
      category: "engagement",
      label: user?.uid,
      value: 1,
    });
    dispatch({ type: "dataStatus", data: DataStatus.LiveData })
  };

  useEffect(() => {
    // Don't do anything while the auth is still being figured out.
    if (authContext?.authStatus != AuthStatus.Loading) {
      const subDomain = isSubDomain();
      const domain = getSubDomain();
      const app = getApp();
      // Regular usage, and firestore hasn't been initialised yet.
      if (!subDomain && !fireStore && AuthStatus.Valid && user) {
        setFireStore(new FirestoreData(user.uid, app, handleLiveData));
      }
      // Domain has been provided, it's valid and the profile data hasn't been parsed yet.
      else if (subDomain && domain != state.profile && dataStatus != DataStatus.StaticData) {
        fetcher(domain)
          .then(value => {
            const { data, charNames, domain } = value;
            // If there's no data, it's an invalid profile
            if (!data || data.size == 0) {
              dispatch({ type: "status", data: AppStatus.InvalidProfile })
              dispatch({ type: "dataStatus", data: DataStatus.MissingData })
            }
            else { // Else, we have data we need to parse.
              handleStaticData(domain, { data: data, charNames: charNames as string[] });
            }
          })
        dispatch({ type: "profile", data: domain })
      }
      // No domain and no logged in user, we have no data.
      if (!subDomain && authContext?.authStatus == AuthStatus.NoUser) {
        dispatch({ type: "dataStatus", data: DataStatus.NoData })
      }
      // No domain, there's a valid user but we have no actual data. Probably wrong account?
      if (!subDomain && authContext?.authStatus == AuthStatus.Valid && state.dataStatus == DataStatus.NoData) {
        dispatch({ type: "dataStatus", data: DataStatus.MissingData })
      };
    }
  }, [authContext, state]);

  const { data, status, dataStatus, profile } = state;
  const value = useMemo(() => ({ data, status, dataStatus, profile }), [data, status, dataStatus, profile]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

