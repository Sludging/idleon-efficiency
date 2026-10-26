import { KillroyRunUpgradeModel } from '../model/killroyRunUpgradeModel';

export class KillroyRunUpgradeBase { constructor(public index: number, public data: KillroyRunUpgradeModel) { } }



export const initKillroyRunUpgradeRepo = () => {
    return [    
        new KillroyRunUpgradeBase(0, <KillroyRunUpgradeModel>{"id": 0, "name": "+1 second timer"}),
        new KillroyRunUpgradeBase(1, <KillroyRunUpgradeModel>{"id": 1, "name": "+Talent Drops"}),
        new KillroyRunUpgradeBase(2, <KillroyRunUpgradeModel>{"id": 2, "name": "+1% bonus skulls"}),
        new KillroyRunUpgradeBase(3, <KillroyRunUpgradeModel>{"id": 3, "name": "+Faster Respawn"}),
        new KillroyRunUpgradeBase(4, <KillroyRunUpgradeModel>{"id": 4, "name": "+Dungeon Drops"}),
        new KillroyRunUpgradeBase(5, <KillroyRunUpgradeModel>{"id": 5, "name": "+Pearl Drops"})    
]
}
