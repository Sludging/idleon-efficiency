import { ResearchLensModel } from '../model/researchLensModel';

export class ResearchLensBase { constructor(public index: number, public data: ResearchLensModel) { } }



export const initResearchLensRepo = () => {
    return [    
        new ResearchLensBase(0, <ResearchLensModel>{
                "index": 0,
                "name": "Magnifying Glass",
                "descriptionTemplate": "When placed on an observation, this lens will give you Research EXP!"
            }),
        new ResearchLensBase(1, <ResearchLensModel>{
                "index": 1,
                "name": "Optical Monocle",
                "descriptionTemplate": "When placed on an observation, this lens will give insight for that observation, which levels it up over time!"
            }),
        new ResearchLensBase(2, <ResearchLensModel>{
                "index": 2,
                "name": "Kaleidoscope",
                "descriptionTemplate": "When placed on an observation, all adjacent lenses will be {% more powerful!"
            })    
]
}
