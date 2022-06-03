import { MapNameModel } from './mapNameModel';

export interface MapDataModel {
    enemy: string,
    world: string,
    map: MapNameModel,
    portalRequirements: number[]
}
