import targetPlayerConfig from './target-player.json';
import type { Player } from '../../data/domain/player';
const accountDataset = require('../helpers/account-dataset.cjs') as {
  resolveTargetPlayerIndex(defaultIndex: number): number;
};

export const TARGET_PLAYER_INDEX = accountDataset.resolveTargetPlayerIndex(targetPlayerConfig.index);

export const getTargetPlayer = (players: Player[], targetIndex: number = TARGET_PLAYER_INDEX): Player => {
  const player = players.find(candidate => candidate.playerID === targetIndex);
  if (!player) {
    throw new Error(`Target player ${targetIndex} not found in save data`);
  }
  return player;
};
