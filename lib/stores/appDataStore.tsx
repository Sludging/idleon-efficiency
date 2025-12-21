import { createStore } from 'zustand/vanilla'
import { IdleonData, updateIdleonData } from '../../data/domain/idleonData'
import { Cloudsave } from '../../data/domain/cloudsave'
import { getSubDomain, isSubDomain } from '../../data/utility'
import { getApp } from 'firebase/app'
import { FirestoreData } from '../../data/firebase/data'
import { fetcher } from '../../data/fetchers/getProfile'
import { sendEvent } from '../gtag'

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

export type AppDataState = {
    initialized: boolean

    data: IdleonData,
    status: AppStatus,
    dataStatus: DataStatus,
    profile: string

    // Trying this as means to force re-render
    lastUpdated: Date

    // Changelog tracking
    lastSeenChangelogVersion: string | null
    hasUnseenChangelogs: boolean

    // This shouldn't be used by anything but I need it in the state .. I think
    firestore: FirestoreData | undefined
}

export type AppDataActions = {
    handleLiveData: (userUid: string, cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>, companions: number[]) => void,
    initialize: (userUid: string) => void,
    setDataStatus: (dataStatus: DataStatus) => void,
    markChangelogsSeen: () => void,
    checkForUnseenChangelogs: () => void
}

export type AppDataStore = AppDataState & AppDataActions

export const initAppDataStore = (initData: Map<string, any>): AppDataState => {
    const idleonData = new IdleonData(initData, new Date());
    idleonData.initialized = true;
    
    // Get the last seen changelog version from localStorage (client-side only)
    let lastSeenChangelogVersion = null;
    if (typeof window !== "undefined") {
        lastSeenChangelogVersion = localStorage.getItem("idleon_efficiency_changelog_seen");
    }
    
    return {
        initialized: false,

        data: idleonData,
        status: AppStatus.Init,
        dataStatus: DataStatus.Init,
        profile: "",

        lastUpdated: new Date(),
        
        // Changelog tracking
        lastSeenChangelogVersion,
        hasUnseenChangelogs: checkHasUnseenChangelogs(lastSeenChangelogVersion),

        firestore: undefined
    }
}

// Maybe this needs to be controlled somewhere else? for now it's here.
const handleStaticData = async (profile: string, currentData: IdleonData, data: { data: Map<string, any>, charNames: string[] }) => {
    const cloudsave = Cloudsave.fromJSON(data.data)
    // Fetch companion and servervar data from cloudsave if available.
    let companions: number[] = [];
    let serverVars: Record<string, any> = {}
    if (cloudsave.fields.has("companions")) {
        companions = cloudsave.get("companions") as number[];
    }
    if (cloudsave.fields.has("servervars")) {
        serverVars = cloudsave.get("servervars") as Record<string, any>;
    }
    const idleonData = await updateIdleonData(currentData.getData(), cloudsave, data.charNames, companions, serverVars, true);
    sendEvent({
        action: "handle_static",
        category: "engagement",
        label: profile,
        value: 1,
    });

    return idleonData;
};

const handleLiveData = async (userUid: string, currentData: IdleonData, cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>, companions: number[]) => {
    const idleonData = await updateIdleonData(currentData.getData(), cloudsave, charNames, companions, serverVars, true);
    sendEvent({
        action: "handle_snapshot",
        category: "engagement",
        label: userUid,
        value: 1,
    });

    return idleonData;
};

export const defaultInitState: AppDataState = {
    initialized: false,

    data: new IdleonData(new Map(), new Date()),
    status: AppStatus.Init,
    dataStatus: DataStatus.Init,
    profile: "",

    lastUpdated: new Date(),
    
    // Changelog tracking
    lastSeenChangelogVersion: null,
    hasUnseenChangelogs: true,

    firestore: undefined
}

// Helper function to check for unseen changelogs
function checkHasUnseenChangelogs(lastSeenVersion: string | null): boolean {
    if (typeof window === "undefined") return false;
    
    // Import here to avoid circular dependencies
    const { changelogData } = require('../../data/changelog');
    
    // If no version has been seen yet, there are unseen changelogs
    if (!lastSeenVersion) return true;
    
    // Get the latest version
    const latestVersion = changelogData.length > 0 ? changelogData[0].version : "";
    
    // If the latest version is different from the last seen version, there are unseen changelogs
    return lastSeenVersion !== latestVersion;
}

// Helper function to get the latest changelog version
function getLatestChangelogVersion(): string {
    // Import here to avoid circular dependencies
    const { changelogData } = require('../../data/changelog');
    
    if (changelogData.length === 0) return "";
    return changelogData[0].version;
}

export const createAppDataStore = (
    initState: AppDataState = defaultInitState,
) => {
    return createStore<AppDataStore>()((set, get) => ({
        ...initState,
        initialize: async (userUid?: string) => {
            set((state) => ({ initialized: true }));

            const subDomain = isSubDomain();
            const app = getApp();
            // Regular usage, and firestore hasn't been initialised yet.
            if (!subDomain && userUid) {
                const fireStore = new FirestoreData(userUid, app, get().handleLiveData)
                fireStore.fetchData().then(() => {
                    set((state) => ({ firestore: fireStore }));
                })
                .catch(() => {
                    set((state) => ({
                        dataStatus: DataStatus.MissingData,
                    }))
                })
            }
            // Domain has been provided, it's valid and the profile data hasn't been parsed yet.
            // TODO: Handling of domain change, maybe?
            else if (subDomain) {
                const currentDomain = getSubDomain();
                const value = await fetcher(currentDomain)
                const { data, charNames, domain } = value;
                // If there's no data, it's an invalid profile
                if (!data || data.size == 0) {
                    set((state) => ({ status: AppStatus.InvalidProfile, dataStatus: DataStatus.MissingData }));
                }
                else { // Else, we have data we need to parse.
                    set((state) => ({ dataStatus: DataStatus.Loading }));
                    const newData = await handleStaticData(domain, get().data, { data: data, charNames: charNames as string[] });
                    set((state) => ({ dataStatus: DataStatus.StaticData, data: newData, profile: domain, status: AppStatus.Ready }));
                }
            }
            // No domain and no logged in user, we have no data.
            if (!subDomain && !userUid) {
                set((state) => ({ dataStatus: DataStatus.NoData }));
            }
            // No domain, there's a valid user but we have no actual data. Probably wrong account?
            // Do this somewhere else?
            // if (!subDomain && userUid && dataStatus == DataStatus.NoData) {
            //     setDataStatus(DataStatus.MissingData);
            // };
        },
        handleLiveData: async (userUid: string, cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>, companions: number[]) => {
            set((state) => ({ dataStatus: DataStatus.Loading }));
            const newData = await handleLiveData(userUid, get().data, cloudsave, charNames, serverVars, companions);
            set((state) => ({ dataStatus: DataStatus.LiveData, data: newData, status: AppStatus.Ready, lastUpdated: new Date() }));
        },
        setDataStatus: (dataStatus: DataStatus) => {
            set((state) => ({ dataStatus: dataStatus }));
        },
        markChangelogsSeen: () => {
            if (typeof window === "undefined") return;
            
            const latestVersion = getLatestChangelogVersion();
            if (latestVersion) {
                localStorage.setItem("idleon_efficiency_changelog_seen", latestVersion);
                set({ 
                    lastSeenChangelogVersion: latestVersion,
                    hasUnseenChangelogs: false
                });
            }
        },
        checkForUnseenChangelogs: () => {
            const { lastSeenChangelogVersion } = get();
            set({ 
                hasUnseenChangelogs: checkHasUnseenChangelogs(lastSeenChangelogVersion)
            });
        }
    }))
}
