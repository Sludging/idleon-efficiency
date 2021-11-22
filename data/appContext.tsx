import React, { useState, useEffect } from 'react';
import { doc, initializeFirestore, onSnapshot, Firestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { useContext } from 'react';
import { AuthContext } from './firebase/authContext';
import { getDatabase, Database, ref, get, child, goOnline } from 'firebase/database';

import { sendEvent } from '../lib/gtag';

import parseTraps from './domain/traps';
import parseStamps from './domain/stamps';
import parseStatues from './domain/statues';
import parsePlayer from './domain/player';
import parseAlchemy from './domain/alchemy';
import parseBribes from './domain/bribes';
import parseGuild from './domain/guild';
import parseGems from './domain/gemPurchases';
import parseAchievements from './domain/achievements';



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

export const AppProvider: React.FC<{}> = (props) => {
  const [state, setState] = useState(new IdleonData(new Map(), undefined));
  const user = useContext(AuthContext)?.user || undefined;
  const [db, setDB] = useState<Firestore | undefined>(undefined)
  const [realDB, setRealDB] = useState<Database | undefined>(undefined)
  const [charNames, setCharNames] = useState<Array<string>>([]);
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
          accountData.set("stamps", parseStamps(doc.get("StampLv"), doc.get("StampLvM")));
          const parsedTraps = parseTraps([...Array(9)].map((_, i) => {
            return doc.get(`PldTraps_${i}`)
          }));
          accountData.set("traps", parsedTraps);
          try {
            const parsedStatues = parseStatues([...Array(9)].map((_, i) => {
              return JSON.parse(doc.get(`StatueLevels_${i}`))
            }), JSON.parse(doc.get(`StuG`)));
            accountData.set("statues", parsedStatues);
          }
          catch {
            accountData.set("statues", []);
          }
          // AttackLoadout_0 (obviously named)
          // POu_4 (Post office per player) (UIboxUpg0 - for box images)
          // CardEquip_0
          // Prayers_0
          const timeAway = JSON.parse(doc.get('TimeAway'));
          const cauldronBubbles: string[][] = JSON.parse(doc.get('CauldronBubbles'));
          const cards: Record<string, number> = JSON.parse(doc.get('Cards0'));
          accountData.set("players", parsePlayer([...Array(9)].map((_, i) => {
            return {
              equipment: doc.get(`EquipOrder_${i}`),
              equipmentStoneData: doc.get(`EMm0_${i}`),
              toolsStoneData: doc.get(`EMm1_${i}`),
              stats: doc.get(`PVStatList_${i}`),
              classNumber: doc.get(`CharacterClass_${i}`),
              afkTarget: doc.get(`AFKtarget_${i}`),
              currentMap: doc.get(`CurrentMap_${i}`),
              starSigns: doc.get(`PVtStarSign_${i}`)?.split(',') ?? [],
              money: doc.get(`Money_${i}`),
              skills: doc.get(`Lv0_${i}`),
              anvilProduction: doc.get(`AnvilPA_${i}`),
              anvilStats: doc.get(`AnvilPAstats_${i}`),
              anvilSelected: doc.get(`AnvilPAselect_${i}`),
              maxCarryCap: doc.get(`MaxCarryCap_${i}`),
              prayers: doc.get(`Prayers_${i}`),
              postOffice: doc.get(`POu_${i}`),
              timeAway: doc.get(`PTimeAway_${i}`),
              playerStuff: doc.get(`PlayerStuff_${i}`),
              attackLoadout: doc.get(`AttackLoadout_${i}`),
              equippedCards: doc.get(`CardEquip_${i}`),
              currentCardSet: doc.get(`CSetEq_${i}`),
              talentLevels: doc.get(`SL_${i}`),
              talentMaxLevels: doc.get(`SM_${i}`),
              activeBuffs: doc.get(`BuffsActive_${i}`),
              activeBubbles: cauldronBubbles[i] ?? []
            }
          }), timeAway, charNames, cards))
          accountData.set("playerNames", charNames);
          // CauldronP2W (obviously named)
          accountData.set("alchemy", parseAlchemy(doc.get("CauldronInfo"), doc.get("CauldUpgLVs")));
          accountData.set("bribes", parseBribes(doc.get("BribeStatus")));
          accountData.set("guild", parseGuild(JSON.parse(doc.get("Guild"))));
          accountData.set("gems", parseGems(JSON.parse(doc.get('GemItemsPurchased'))));
          accountData.set("achievements", parseAchievements(JSON.parse(doc.get('AchieveReg'))))
          accountData.set("timeAway", timeAway);
          accountData.set("lootyData", JSON.parse(doc.get("Cards1")));
          accountData.set("rawData", doc.data());
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