import targetPlayerConfig from './target-player.json';
import type { Player } from '../../data/domain/player';

export const TARGET_PLAYER_INDEX = targetPlayerConfig.index;

export const getTargetPlayer = (players: Player[], targetIndex: number = TARGET_PLAYER_INDEX): Player => {
  const player = players.find(candidate => candidate.playerID === targetIndex);
  if (!player) {
    throw new Error(`Target player ${targetIndex} not found in save data`);
  }
  return player;
};
