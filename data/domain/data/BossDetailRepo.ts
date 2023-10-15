import { BossAttackModel } from '../model/bossAttackModel';
import { BossDetailsModel } from '../model/bossDetailsModel';

export class BossDetailsBase { constructor(public id: string, public data: BossDetailsModel) { } }



export const initBossDetailRepo = () => {
    return [    
        new BossDetailsBase("wolfA", <BossDetailsModel>{
                "health": 25000,
                "defence": 10,
                "exp": 10000,
                "keys": 1,
                "attacks": [
                    <BossAttackModel>{"name": "Fireball", "damage": 40},
                    <BossAttackModel>{"name": "Stomp", "damage": 120},
                    <BossAttackModel>{"name": "Rock Spikes", "damage": 50},
                    <BossAttackModel>{"name": "Spike Traps", "damage": 48},
                    <BossAttackModel>{"name": "Sword Swing", "damage": 100},
                    <BossAttackModel>{"name": "Uppercut", "damage": 200},
                    <BossAttackModel>{"name": "Rocketfist", "damage": 100}
                ]
            }),
        new BossDetailsBase("wolfB", <BossDetailsModel>{
                "health": 8000000,
                "defence": 1350,
                "exp": 400000,
                "keys": 5,
                "attacks": [
                    <BossAttackModel>{"name": "Fireball", "damage": 650},
                    <BossAttackModel>{"name": "Stomp", "damage": 1500},
                    <BossAttackModel>{"name": "Rock Spikes", "damage": 800},
                    <BossAttackModel>{"name": "Spike Traps", "damage": 675},
                    <BossAttackModel>{"name": "Sword Swing", "damage": 1500},
                    <BossAttackModel>{"name": "Uppercut", "damage": 3000},
                    <BossAttackModel>{"name": "Rocketfist", "damage": 1000}
                ]
            }),
        new BossDetailsBase("wolfC", <BossDetailsModel>{
                "health": 100000000,
                "defence": 8000,
                "exp": 50000000,
                "keys": 30,
                "attacks": [
                    <BossAttackModel>{"name": "Fireball", "damage": 3650},
                    <BossAttackModel>{"name": "Stomp", "damage": 5500},
                    <BossAttackModel>{"name": "Rock Spikes", "damage": 3800},
                    <BossAttackModel>{"name": "Spike Traps", "damage": 3675},
                    <BossAttackModel>{"name": "Sword Swing", "damage": 5500},
                    <BossAttackModel>{"name": "Uppercut", "damage": 8000},
                    <BossAttackModel>{"name": "Rocketfist", "damage": 5000}
                ]
            }),
        new BossDetailsBase("Boss2A", <BossDetailsModel>{
                "health": 1000000,
                "defence": 150,
                "exp": 100000,
                "keys": 1,
                "attacks": [
                    <BossAttackModel>{"name": "Hammer", "damage": 1250},
                    <BossAttackModel>{"name": "Scimitar", "damage": 300},
                    <BossAttackModel>{"name": "Fire Column", "damage": 350},
                    <BossAttackModel>{"name": "Purple Psionic Hoops", "damage": 450},
                    <BossAttackModel>{"name": "Finger Gun", "damage": 5000},
                    <BossAttackModel>{"name": "Headpat", "damage": 10000},
                    <BossAttackModel>{"name": "Blue Psionic", "damage": 400}
                ]
            }),
        new BossDetailsBase("Boss2B", <BossDetailsModel>{
                "health": 30000000,
                "defence": 3000,
                "exp": 2000000,
                "keys": 5,
                "attacks": [
                    <BossAttackModel>{"name": "Hammer", "damage": 1800},
                    <BossAttackModel>{"name": "Scimitar", "damage": 4000},
                    <BossAttackModel>{"name": "Fire Column", "damage": 2000},
                    <BossAttackModel>{"name": "Purple Psionic Hoops", "damage": 1500},
                    <BossAttackModel>{"name": "Finger Gun", "damage": 2500},
                    <BossAttackModel>{"name": "Headpat", "damage": 5000},
                    <BossAttackModel>{"name": "Blue Psionic", "damage": 3300}
                ]
            }),
        new BossDetailsBase("Boss2C", <BossDetailsModel>{
                "health": 400000000,
                "defence": 15000,
                "exp": 100000000,
                "keys": 40,
                "attacks": [
                    <BossAttackModel>{"name": "Hammer", "damage": 18000},
                    <BossAttackModel>{"name": "Scimitar", "damage": 40000},
                    <BossAttackModel>{"name": "Fire Column", "damage": 20000},
                    <BossAttackModel>{"name": "Purple Psionic Hoops", "damage": 15000},
                    <BossAttackModel>{"name": "Finger Gun", "damage": 25000},
                    <BossAttackModel>{"name": "Headpat", "damage": 50000},
                    <BossAttackModel>{"name": "Blue Psionic", "damage": 33000}
                ]
            }),
        new BossDetailsBase("Boss3A", <BossDetailsModel>{
                "health": 20000000,
                "defence": 1250,
                "exp": 750000,
                "keys": 1,
                "attacks": [
                    <BossAttackModel>{"name": "Front Stomp", "damage": 3200},
                    <BossAttackModel>{"name": "Back Stomp", "damage": 3600},
                    <BossAttackModel>{"name": "Frozen Spikes", "damage": 2500},
                    <BossAttackModel>{"name": "Falling Icicles", "damage": 2100},
                    <BossAttackModel>{"name": "Tusk Swipe", "damage": 3500}
                ]
            }),
        new BossDetailsBase("Boss3B", <BossDetailsModel>{
                "health": 250000000,
                "defence": 7500,
                "exp": 10000000,
                "keys": 5,
                "attacks": [
                    <BossAttackModel>{"name": "Front Stomp", "damage": 6000},
                    <BossAttackModel>{"name": "Back Stomp", "damage": 9000},
                    <BossAttackModel>{"name": "Frozen Spikes", "damage": 5000},
                    <BossAttackModel>{"name": "Falling Icicles", "damage": 4000},
                    <BossAttackModel>{"name": "Tusk Swipe", "damage": 6000}
                ]
            }),
        new BossDetailsBase("Boss3C", <BossDetailsModel>{
                "health": 2000000000,
                "defence": 25000,
                "exp": 500000000,
                "keys": 50,
                "attacks": [
                    <BossAttackModel>{"name": "Front Stomp", "damage": 18000},
                    <BossAttackModel>{"name": "Back Stomp", "damage": 40000},
                    <BossAttackModel>{"name": "Frozen Spikes", "damage": 20000},
                    <BossAttackModel>{"name": "Falling Icicles", "damage": 15000},
                    <BossAttackModel>{"name": "Tusk Swipe", "damage": 25000},
                    <BossAttackModel>{"name": "filler", "damage": 33000}
                ]
            }),
        new BossDetailsBase("Boss4A", <BossDetailsModel>{
                "health": 80000000,
                "defence": 2500,
                "exp": 750000,
                "keys": 1,
                "attacks": [<BossAttackModel>{"name": "Talk no Jutsu", "damage": 1000}, <BossAttackModel>{"name": "filler", "damage": 400}]
            }),
        new BossDetailsBase("Boss4B", <BossDetailsModel>{
                "health": 350000000,
                "defence": 5,
                "exp": 30000000,
                "keys": 5,
                "attacks": [<BossAttackModel>{"name": "Talk no Jutsu", "damage": 1800}, <BossAttackModel>{"name": "filler", "damage": 3300}]
            }),
        new BossDetailsBase("Boss4C", <BossDetailsModel>{
                "health": 2000000000,
                "defence": 25,
                "exp": 1000000000,
                "keys": 60,
                "attacks": [<BossAttackModel>{"name": "Talk no Jutsu", "damage": 18000}, <BossAttackModel>{"name": "filler", "damage": 33000}]
            }),
        new BossDetailsBase("Boss5A", <BossDetailsModel>{
                "health": 1000000000,
                "defence": 2500,
                "exp": 20000000,
                "keys": 1,
                "attacks": [
                    <BossAttackModel>{"name": "Attack1", "damage": 1000},
                    <BossAttackModel>{"name": "Attack2", "damage": 1500},
                    <BossAttackModel>{"name": "Attack3", "damage": 800},
                    <BossAttackModel>{"name": "Attack4", "damage": 450},
                    <BossAttackModel>{"name": "Attack5", "damage": 5000},
                    <BossAttackModel>{"name": "Attack6", "damage": 10000},
                    <BossAttackModel>{"name": "Attack7", "damage": 400}
                ]
            }),
        new BossDetailsBase("Boss5B", <BossDetailsModel>{
                "health": 1000000000,
                "defence": 5,
                "exp": 700000000,
                "keys": 5,
                "attacks": [
                    <BossAttackModel>{"name": "Attack1", "damage": 1800},
                    <BossAttackModel>{"name": "Attack2", "damage": 4000},
                    <BossAttackModel>{"name": "Attack3", "damage": 2000},
                    <BossAttackModel>{"name": "Attack4", "damage": 1500},
                    <BossAttackModel>{"name": "Attack5", "damage": 2500},
                    <BossAttackModel>{"name": "Attack6", "damage": 5000},
                    <BossAttackModel>{"name": "Attack7", "damage": 3300}
                ]
            }),
        new BossDetailsBase("Boss5C", <BossDetailsModel>{
                "health": 1000000000,
                "defence": 25,
                "exp": 2000000000,
                "keys": 70,
                "attacks": [
                    <BossAttackModel>{"name": "Attack1", "damage": 18000},
                    <BossAttackModel>{"name": "Attack2", "damage": 40000},
                    <BossAttackModel>{"name": "Attack3", "damage": 20000},
                    <BossAttackModel>{"name": "Attack4", "damage": 15000},
                    <BossAttackModel>{"name": "Attack5", "damage": 25000},
                    <BossAttackModel>{"name": "Attack6", "damage": 50000},
                    <BossAttackModel>{"name": "Attack7", "damage": 33000}
                ]
            })    
]
}
