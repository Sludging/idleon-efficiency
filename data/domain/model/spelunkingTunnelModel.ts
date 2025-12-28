import { SpelunkingDiscoveryModel } from './spelunkingDiscoveryModel';

export interface SpelunkingTunnelModel {
    index: number,
    name: string,
    loreBonus: string,
    bossDepth: number,
    discoveries: SpelunkingDiscoveryModel[]
}
