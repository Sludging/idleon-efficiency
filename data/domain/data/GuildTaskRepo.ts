import { GuildTaskModel } from '../model/guildTaskModel';

export class GuildTaskBase { constructor(public index: number, public data: GuildTaskModel) { } }



export const initGuildTaskRepo = () => {
    return [    
        new GuildTaskBase(0, <GuildTaskModel>{"task": "Defeat Monsters", "requirement": 300, "guildPoints": 10}),
        new GuildTaskBase(1, <GuildTaskModel>{"task": "W1 Daily Task", "requirement": 1, "guildPoints": 10}),
        new GuildTaskBase(2, <GuildTaskModel>{"task": "W2 Daily Task", "requirement": 1, "guildPoints": 10}),
        new GuildTaskBase(3, <GuildTaskModel>{"task": "Defeat any Boss", "requirement": 20, "guildPoints": 30}),
        new GuildTaskBase(4, <GuildTaskModel>{"task": "Claim 5+ Hour AFK gain", "requirement": 35, "guildPoints": 30}),
        new GuildTaskBase(5, <GuildTaskModel>{"task": "Claim Guild Points", "requirement": 250, "guildPoints": 30}),
        new GuildTaskBase(6, <GuildTaskModel>{"task": "Choppin Minigame Score", "requirement": 20, "guildPoints": 10}),
        new GuildTaskBase(7, <GuildTaskModel>{"task": "Pick up Item Drops", "requirement": 300, "guildPoints": 10}),
        new GuildTaskBase(8, <GuildTaskModel>{"task": "Play W1 Colosseum", "requirement": 1, "guildPoints": 10}),
        new GuildTaskBase(9, <GuildTaskModel>{"task": "Play W2 Colosseum", "requirement": 1, "guildPoints": 10}),
        new GuildTaskBase(10, <GuildTaskModel>{"task": "Defeat a World Boss", "requirement": 1, "guildPoints": 10}),
        new GuildTaskBase(11, <GuildTaskModel>{"task": "Fishing Minigame Score", "requirement": 4, "guildPoints": 10}),
        new GuildTaskBase(12, <GuildTaskModel>{"task": "Sign Post Office Order", "requirement": 1, "guildPoints": 10}),
        new GuildTaskBase(13, <GuildTaskModel>{"task": "Catching Minigame Score", "requirement": 11, "guildPoints": 10}),
        new GuildTaskBase(14, <GuildTaskModel>{"task": "Mining Minigame Score", "requirement": 5, "guildPoints": 10}),
        new GuildTaskBase(15, <GuildTaskModel>{"task": "Play Party Dungeon", "requirement": 1, "guildPoints": 10}),
        new GuildTaskBase(16, <GuildTaskModel>{"task": "Filler", "requirement": 15, "guildPoints": 10}),
        new GuildTaskBase(17, <GuildTaskModel>{"task": "Filler", "requirement": 15, "guildPoints": 10}),
        new GuildTaskBase(18, <GuildTaskModel>{"task": "Filler", "requirement": 15, "guildPoints": 10}),
        new GuildTaskBase(19, <GuildTaskModel>{"task": "Filler", "requirement": 15, "guildPoints": 10}),
        new GuildTaskBase(20, <GuildTaskModel>{"task": "Filler", "requirement": 15, "guildPoints": 10}),
        new GuildTaskBase(21, <GuildTaskModel>{"task": "Collect Cards", "requirement": 25, "guildPoints": 30}),
        new GuildTaskBase(22, <GuildTaskModel>{"task": "Defeat Crystal Mobs", "requirement": 5, "guildPoints": 30}),
        new GuildTaskBase(23, <GuildTaskModel>{"task": "Defeat a Chaotic Boss", "requirement": 1, "guildPoints": 30}),
        new GuildTaskBase(24, <GuildTaskModel>{"task": "Play Party Dungeons", "requirement": 4, "guildPoints": 30}),
        new GuildTaskBase(25, <GuildTaskModel>{"task": "Filler", "requirement": 17, "guildPoints": 30})    
]
}
