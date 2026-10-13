import { ResearchMetadataModel } from '../model/researchMetadataModel';

export class ResearchMetadataBase { constructor(public index: number, public data: ResearchMetadataModel) { } }



export const initResearchMetadataRepo = () => {
    return [    
        new ResearchMetadataBase(0, <ResearchMetadataModel>{
                "baseDiscoveryMinRoll": 1,
                "baseDiscoveryMaxRoll": 100,
                "baseDiscoveryRollsPerDay": 3,
                "baseKaleidoscopeAdjacentBoostPercent": 30,
                "shapeRotationResearchLevel": 90,
                "shapeRotationStepDegrees": 5
            })    
]
}
