import targetPlayerConfig from './target-player.json';
import type { Player } from '../../data/domain/player';

export const TARGET_PLAYER_INDEX = targetPlayerConfig.index;

export const getTargetPlayer = (players: Player[]): Player => {
  const player = players.find(candidate => candidate.playerID === TARGET_PLAYER_INDEX);
  if (!player) {
    throw new Error(`Target player ${TARGET_PLAYER_INDEX} not found in save data`);
  }
  return player;
};
