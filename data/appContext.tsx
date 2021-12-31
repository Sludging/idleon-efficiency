import React, { useState, useEffect } from 'react';
import { doc, initializeFirestore, onSnapshot, Firestore, DocumentSnapshot as Document, getDoc } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { useContext } from 'react';
import { AuthContext } from './firebase/authContext';
import { getDatabase, Database, ref, get, child, goOnline } from 'firebase/database';

import { sendEvent } from '../lib/gtag';

import parseTraps from './domain/traps';
import parseStamps from './domain/stamps';
import parseStatues from './domain/statues';
import parsePlayers from './domain/player';
import parseAlchemy from './domain/alchemy';
import parseBribes from './domain/bribes';
import parseGuild from './domain/guild';
import parseGems from './domain/gemPurchases';
import parseAchievements from './domain/achievements';
import parseLooty from './domain/lootyTracker';
import parseShrines from './domain/shrines';
import { initAllItems, Item } from './domain/items';
import parseStorage from './domain/storage';
import parseQuests from './domain/quests';
import parsePrayers from './domain/prayers';
import parseRefinery from './domain/refinery';
import parseSaltLick from './domain/saltLick';
import parsePrinter from './domain/printer';
import parseDeathnote from './domain/deathnote';
import parseTaskboard from './domain/tasks';
import { Cloudsave, cloudsaveConverter } from './domain/cloudsave';
import parseWorship from './domain/worship';
import parseConstruction from './domain/construction';
import parseCards from './domain/cards';
import parseArcade from './domain/arcade';



class IdleonData {
  private data: Map<string, any>
  private lastUpdated?: Date

  constructor(data: Map<string, any>, lastUpdated?: Date) {
    this.data = data;
    this.lastUpdated = lastUpdated;
  }

  public getData = () => {
    return this.data;
  }

  public getLastUpdated = (raw: boolean = false) => {
    if (raw) {
      return this.lastUpdated;
    }
    if (this.lastUpdated) {
      const resolvedFormat = Intl.DateTimeFormat().resolvedOptions();
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: resolvedFormat.hour12,
        timeZone: resolvedFormat.timeZone
      };
      return Intl.DateTimeFormat(resolvedFormat.locale, options).format(this.lastUpdated);
    }

    return "";
  }
}

export const AppContext = React.createContext<IdleonData>(new IdleonData(new Map(), undefined));

/* 
Known paths:
1. _uid/${user.uid} = character names
*/
const keyFunctionMap: Record<string, Function> = {
  "stamps": (doc: Cloudsave, charCount: number) => parseStamps(doc.get("StampLv"), doc.get("StampLvM")),
  "traps": (doc: Cloudsave, charCount: number) => parseTraps([...Array(charCount)].map((_, i) => { return doc.get(`PldTraps_${i}`) })),
  "statues": (doc: Cloudsave, charCount: number) => parseStatues([...Array(charCount)].map((_, i) => { try { return JSON.parse(doc.get(`StatueLevels_${i}`)) } catch (e) { console.log("Statues", i, doc.get(`StatueLevels_${i}`)); throw e } }), JSON.parse(doc.get(`StuG`))),
  "timeAway": (doc: Cloudsave, charCount: number) => JSON.parse(doc.get('TimeAway')),
  "cauldronBubbles": (doc: Cloudsave, charCount: number) => doc.get('CauldronBubbles'),
  "cards": (doc: Cloudsave, charCount: number) => parseCards(doc.get('Cards0')),
  "players": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parsePlayers(doc, accountData, allItems),
  "alchemy": (doc: Cloudsave, charCount: number) => parseAlchemy(doc.get("CauldronInfo"), doc.get("CauldUpgLVs")),
  "bribes": (doc: Cloudsave, charCount: number) => parseBribes(doc.get("BribeStatus")),
  "guild": (doc: Cloudsave, charCount: number) => parseGuild(JSON.parse(doc.get("Guild"))),
  "gems": (doc: Cloudsave, charCount: number) => parseGems(JSON.parse(doc.get('GemItemsPurchased'))),
  "achievements": (doc: Cloudsave, charCount: number) => parseAchievements(JSON.parse(doc.get('AchieveReg')), JSON.parse(doc.get('SteamAchieve'))),
  "lootyData": (doc: Cloudsave, allItems: Item[], charCount: number) => parseLooty(JSON.parse(doc.get("Cards1")), allItems),
  "rawData": (doc: Cloudsave, charCount: number) => doc.toJSON(),
  "POExtra": (doc: Cloudsave, charCount: number) => {
    return {
      streak: doc.get("CYDeliveryBoxStreak"),
      complete: doc.get("CYDeliveryBoxComplete"),
      misc: doc.get("CYDeliveryBoxMisc"),
    }
  },
  "shrines": (doc: Cloudsave, charCount: number) => parseShrines(JSON.parse(doc.get("Shrine"))),
  "storage": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parseStorage(doc, accountData.get("playerNames"), allItems, JSON.parse(doc.get("InvStorageUsed"))),
  "constellations": (doc: Cloudsave, charCount: number) => JSON.parse(doc.get("SSprog")),
  "quests": (doc: Cloudsave, accountData: Map<string, any>, allItems: Item[], charCount: number) => parseQuests(doc, accountData, allItems),
  "prayers": (doc: Cloudsave, charCount: number) => parsePrayers(JSON.parse(doc.get("PrayOwned"))),
  "refinery": (doc: Cloudsave, charCount: number) => parseRefinery(JSON.parse(doc.get("Refinery"))),
  "saltLick": (doc: Cloudsave, charCount: number) => parseSaltLick(JSON.parse(doc.get("SaltLick"))),
  "printer": (doc: Cloudsave, charCount: number) => parsePrinter(JSON.parse(doc.get("Print")), charCount),
  "deathnote": (doc: Cloudsave, charCount: number) => parseDeathnote([...Array(charCount)].map((_, i) => { return doc.get(`KLA_${i}`) })),
  "taskboard": (doc: Cloudsave, charCount: number) => parseTaskboard(JSON.parse(doc.get(`TaskZZ0`)), JSON.parse(doc.get(`TaskZZ1`)), JSON.parse(doc.get(`TaskZZ2`)), JSON.parse(doc.get(`TaskZZ3`)), doc.get(`TaskZZ4`), doc.get(`TaskZZ5`)),
  "worship": (doc: Cloudsave, accountData: Map<string, any>, charCount: number) => parseWorship(JSON.parse(doc.get("TotemInfo")), accountData),
  "construction": (doc: Cloudsave, charCount: number) => parseConstruction(JSON.parse(doc.get("Tower"))),
  "arcade": (doc: Cloudsave, charCount: number) => parseArcade(JSON.parse(doc.get("ArcadeUpg")), doc.get("OptLacc")),
}


export const AppProvider: React.FC<{}> = (props) => {
  const [state, setState] = useState(new IdleonData(new Map(), undefined));
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const [db, setDB] = useState<Firestore | undefined>(undefined)
  const [realDB, setRealDB] = useState<Database | undefined>(undefined)
  const [charNames, setCharNames] = useState<Array<string>>([]);

  const allItems = initAllItems();

  const getAccountData = async () => {
    if (db?.type == "firestore" && user) {
      if (charNames.length == 0 && realDB) {
        goOnline(realDB);
        const dbRef = ref(realDB);
        get(child(dbRef, `_uid/${user.uid}`)).then((snapshot) => {
          if (snapshot.exists()) {
            setCharNames(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.log(error);
        });
      }

      const unsub = onSnapshot(doc(db, "_data", user.uid).withConverter(cloudsaveConverter),
        { includeMetadataChanges: true }, (doc) => {
          if (doc.exists()) {
            const cloudsave = doc.data();
            updateIdleonData(cloudsave, charNames);
            sendEvent({
              action: "handle_snapshot",
              category: "engagement",
              label: user.uid,
              value: 1,
            });
          }
        });
    }
  }

  const updateIdleonData = async (data: Cloudsave, charNames: string[], isDemo: boolean = false) => {
    let accountData = new Map();
    accountData.set("playerNames", charNames);
    accountData.set("itemsData", allItems);
    Object.entries(keyFunctionMap).forEach(([key, toExecute]) => {
      try {
        if (key == "players" || key == "storage" || key == "quests") {
          accountData.set(key, toExecute(data, accountData, allItems, charNames.length));
        }
        else if (key == "worship") {
          accountData.set(key, toExecute(data, accountData, charNames.length));
        }
        else if (key == "lootyData") {
          accountData.set(key, toExecute(data, allItems, charNames.length));
        }
        else {
          accountData.set(key, toExecute(data, charNames.length));
        }
      }
      catch (e) {
        console.debug(e);
        console.log(`Failed parsing ${key}`);
        accountData.set(key, undefined);
      }
    });
    // CauldronP2W (obviously named)
    // CYWorldTeleports (if I ever care to show it)
    // CogO
    // CYSilverPens
    // DungUpg
    // Guild
    // ForgeLV
    // ForgeItemOrder
    // PlayerStuff_2 - for current charge + other things I think
    // _customBlock_AnvilProduceStats for the rest
    accountData.set("servervars", await getServerVars())

    if (isDemo) {
      const saveGlobalTime = JSON.parse(data.get("TimeAway"))["GlobalTime"] as number;
      const newData = new IdleonData(accountData, new Date(saveGlobalTime * 1000));
      setState(newData);
    }
    else {
      const newData = new IdleonData(accountData, new Date());
      setState(newData);
    }
  }

  const getServerVars = async () => {
    if (db?.type == "firestore" && user) {
      const res = await getDoc(doc(db, "_vars", "_vars"));
      if (res.exists()) {
        return res.data();
      }
    }
  }

  const handleStaticData = async () => {
    const res = await fetch('/api/demo');
    const jsonData = await res.json();
    const cloudsave = Cloudsave.fromJSON(jsonData as Map<string, any>)
    const charNames = cloudsave.fakePlayerNames();
    updateIdleonData(cloudsave, charNames, true);
    sendEvent({
      action: "handle_demo",
      category: "engagement",
      label: "demo",
      value: 1,
    });
  }



  useEffect(() => {
    const app = getApp();
    if (!db) {
      setDB(initializeFirestore(app, {}));
    }
    if (!realDB) {
      setRealDB(getDatabase(app));
      getServerVars();
    }
    if (authContext?.isDemo) {
      handleStaticData();
    }
    else if (user) {
      getAccountData();
    }
  }, [user, db, charNames, authContext]);

  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  );
};