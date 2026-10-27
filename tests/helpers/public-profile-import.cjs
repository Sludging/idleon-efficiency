const { isDeepStrictEqual } = require('node:util');

const ADAPTER_VERSION = 'v1.23-public-profile-3';

const jsonListKeys = new Set(`AchieveReg,AnvilCraftStatus,ArcadeUpg,AttackLoadout_,AttackLoadoutpre_,Boats,Breeding,Bubba,BugInfo,Captains,CardPreset_,Cards1,CauldronBubbles,CauldronJobs0,CauldronJobs1,CauldronP2W,CogO,Compass,CookMaster,Cooking,DungUpg,FarmPlot,FarmRank,FlagP,FlagU,GamingSprout,GemItemsPurchased,Guild,HintStatus,Holes,Jars,KLA_,Lab,MapBon,Meals,Menagerie,Ninja,POu_,Pets,PetsStored,PlayerStuff_,PldTraps_,PrayOwned,Prayers_,Print,Refinery,Research,RoyalG,RoyalMaps,SSprog,SailChests,Sailing,SaltLick,Shrine,Spelunk,StatueLevels_,SteamAchieve,StuG,Summon,Sushi,TaskZZ0,TaskZZ1,TaskZZ2,TaskZZ3,TaskZZ4,TaskZZ5,Territory,Tess,TotemInfo,Tower`.split(','));
const sparseListKeys = new Set(`CMm,CogM,EMm0_,EMm1_,IMm_,ObolEqMAP_,ObolEqMAPz1,ObolEqMAPz2,ObolInvMAP_0,ObolInvMAP_1,ObolInvMAP_2,ObolInvMAP_3`.split(','));
const mapKeys = new Set(`ArcUnclaim,AtkCD_,BundlesReceived,CSetEq_,Cards0,FarmCrop,InvBagsUsed_,InvStorageUsed,KRbest,MaxCarryCap_,NPCdialogue_,QuestComplete_,QuestStatus_,SL_,SLpre_,SM_,StarSg,TimeAway,WeeklyBoss`.split(','));

function matchesSourceKey(key, inventory) {
  if (inventory.has(key)) return true;

  for (const sourceKey of inventory) {
    if (sourceKey.endsWith('_') && new RegExp(`^${sourceKey}\\d+$`).test(key)) return true;
  }

  return false;
}

function encodeSourceFields(save, inventory, label, accepts) {
  for (const key of Object.keys(save)) {
    if (!matchesSourceKey(key, inventory)) continue;

    const value = save[key];
    if (typeof value === 'string') {
      let parsed;
      try {
        parsed = JSON.parse(value);
      } catch {
        throw new Error(`Invalid public profile field ${key}: malformed JSON text`);
      }
      if (!accepts(parsed)) {
        throw new Error(`Invalid public profile field ${key}: expected JSON text or native ${label}`);
      }
      continue;
    }
    if (!accepts(value)) {
      throw new Error(`Invalid public profile field ${key}: expected JSON text or native ${label}`);
    }

    save[key] = JSON.stringify(value);
  }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function assertMetadataDoesNotConflict(data, key, expected) {
  if (Object.hasOwn(data, key) && !isDeepStrictEqual(data[key], expected)) {
    throw new Error(`Public profile data field ${key} conflicts with profile metadata`);
  }
}

function normalizeBundlesReceived(data, save) {
  const value = save.BundlesReceived;
  let ownership = {};

  if (value !== undefined) {
    if (typeof value === 'string') {
      try {
        ownership = JSON.parse(value);
      } catch {
        throw new Error('Invalid public profile field BundlesReceived: malformed JSON text');
      }
    } else {
      ownership = value;
    }

    if (!isRecord(ownership)) {
      throw new Error('Invalid public profile field BundlesReceived: expected JSON text or native maps');
    }
    ownership = { ...ownership };
  }

  for (const [key, flag] of Object.entries(data)) {
    const match = /^(?:bun|bon|ban|bin)_[a-z]+$/.exec(key);
    if (match && (flag === 1 || flag === '1')) ownership[key] = 1;
  }

  save.BundlesReceived = ownership;
}

function importPublicProfile(profile) {
  if (!isRecord(profile)) throw new Error('Public profile must be an object');
  if (!isRecord(profile.data)) throw new Error('Public profile is missing save data');
  if (!Array.isArray(profile.charNames) || profile.charNames.length === 0 || profile.charNames.some(name => typeof name !== 'string' || name.length === 0)) {
    throw new Error('Public profile is missing valid character names');
  }
  if (!isRecord(profile.serverVars)) throw new Error('Public profile is missing valid server variables');
  if (!isRecord(profile.companion) || !Array.isArray(profile.companion.l)) {
    throw new Error('Public profile is missing companion ownership data');
  }

  const companionsById = new Map();
  profile.companion.l.forEach((row, index) => {
    if (typeof row !== 'string') throw new Error(`Invalid companion row ${index}: expected comma-delimited text`);
    const fields = row.split(',');
    const idText = fields[0];
    const marker = fields[4];
    if (fields.length < 5 || !/^\d+$/.test(idText) || !/^[01]$/.test(marker)) {
      throw new Error(`Invalid companion row ${index}: expected numeric ID and upgrade marker 0 or 1`);
    }

    const id = Number(idText);
    if (!Number.isSafeInteger(id)) {
      throw new Error(`Invalid companion row ${index}: companion ID must be a safe integer`);
    }
    const level = Number(marker) + 1;
    companionsById.set(id, Math.max(companionsById.get(id) || 0, level));
  });

  const companions = [...companionsById].map(([id, level]) => ({ id, level }));
  assertMetadataDoesNotConflict(profile.data, 'playerNames', profile.charNames);
  assertMetadataDoesNotConflict(profile.data, 'servervars', profile.serverVars);
  assertMetadataDoesNotConflict(profile.data, 'companions', companions);

  const save = {
    ...profile.data,
    playerNames: profile.charNames,
    servervars: profile.serverVars,
    companions,
  };

  if (save.GemsPacksPurchased === 0) delete save.GemsPacksPurchased;

  encodeSourceFields(save, jsonListKeys, 'arrays or objects', value => Array.isArray(value) || isRecord(value));
  encodeSourceFields(save, sparseListKeys, 'sparse objects', isRecord);
  normalizeBundlesReceived(profile.data, save);
  encodeSourceFields(save, mapKeys, 'maps', isRecord);

  return save;
}

module.exports = { ADAPTER_VERSION, importPublicProfile };
