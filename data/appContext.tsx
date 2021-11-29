import React, { useState, useEffect } from 'react';
import { doc, initializeFirestore, onSnapshot, Firestore, DocumentSnapshot as Document } from 'firebase/firestore';
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

  public getLastUpdated = () => {
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
  "stamps": (doc: Document) => parseStamps(doc.get("StampLv"), doc.get("StampLvM")),
  "traps": (doc: Document) => parseTraps([...Array(9)].map((_, i) => { return doc.get(`PldTraps_${i}`) })),
  "statues": (doc: Document) => parseStatues([...Array(9)].map((_, i) => { return JSON.parse(doc.get(`StatueLevels_${i}`)) }), JSON.parse(doc.get(`StuG`))),
  "timeAway": (doc: Document) => JSON.parse(doc.get('TimeAway')),
  "cauldronBubbles": (doc: Document) => JSON.parse(doc.get('CauldronBubbles')),
  "cards": (doc: Document) => JSON.parse(doc.get('Cards0')),
  "players": (doc: Document, accountData: Map<string, any>) => parsePlayers(doc, accountData),
  "alchemy": (doc: Document) => parseAlchemy(doc.get("CauldronInfo"), doc.get("CauldUpgLVs")),
  "bribes": (doc: Document) => parseBribes(doc.get("BribeStatus")),
  "guild": (doc: Document) => parseGuild(JSON.parse(doc.get("Guild"))),
  "gems": (doc: Document) => parseGems(JSON.parse(doc.get('GemItemsPurchased'))),
  "achievements": (doc: Document) => parseAchievements(JSON.parse(doc.get('AchieveReg'))),
  "lootyData": (doc: Document, allItems: Item[]) => parseLooty(JSON.parse(doc.get("Cards1")), allItems),
  "rawData": (doc: Document) => doc.data(),
  "POExtra": (doc: Document) => { 
    return {
      streak: doc.get("CYDeliveryBoxStreak"),
      complete: doc.get("CYDeliveryBoxComplete"),
      misc: doc.get("CYDeliveryBoxMisc"),
  }},
  "shrines": (doc: Document) => parseShrines(JSON.parse(doc.get("Shrine")))
}


export const AppProvider: React.FC<{}> = (props) => {
  const [state, setState] = useState(new IdleonData(new Map(), undefined));
  const user = useContext(AuthContext)?.user || undefined;
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

      const unsub = onSnapshot(doc(db, "_data", user.uid),
        { includeMetadataChanges: true }, (doc) => {
          let accountData = new Map();
          accountData.set("playerNames", charNames);
          Object.entries(keyFunctionMap).forEach(([key, toExecute]) => {
            try {
              if (key == "players") {
                accountData.set(key, toExecute(doc, accountData));
              }
              else if (key == "lootyData") {
                accountData.set(key, toExecute(doc, allItems));
              }
              else {
                accountData.set(key, toExecute(doc));
              }
            }
            catch (e) {
              console.debug(e);
              console.log(`Failed parsing ${key}`);
              accountData.set(key, undefined);
            }
          });
          // AttackLoadout_0 (obviously named)
          // CardEquip_0
          // Prayers_0
          // CauldronP2W (obviously named)
          // CYWorldTeleports (if I ever care to show it)
          // SaltLick
          // CogO
          // ChestOrder
          // CYSilverPens
          // DungUpg
          // Guild
          // Print
          // ForgeLV
          // ForgeItemOrder
          // PrayOwned
          // PlayerStuff_2 - for current charge + other things I think
          // _customBlock_AnvilProduceStats for the rest
          const newData = new IdleonData(accountData, new Date());
          sendEvent({
            action: "handle_snapshot",
            category: "engagement",
            label: user.uid,
            value: 1,
          });
          setState(newData);
        });
    }
  }

  useEffect(() => {
    const app = getApp();
    if (!db) {
      setDB(initializeFirestore(app, {}));
    }
    if (!realDB) {
      setRealDB(getDatabase(app));
    }
    if (user) {
      getAccountData();
    }
  }, [user, db, charNames]);

  return (
    <AppContext.Provider value={state}>
      {props.children}
    </AppContext.Provider>
  );
};