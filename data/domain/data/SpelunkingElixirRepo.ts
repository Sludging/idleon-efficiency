import { SpelunkingElixirModel } from '../model/spelunkingElixirModel';

export class SpelunkingElixirBase { constructor(public index: number, public data: SpelunkingElixirModel) { } }



export const initSpelunkingElixirRepo = () => {
    return [    
        new SpelunkingElixirBase(0, <SpelunkingElixirModel>{
                "index": 0,
                "description": "For the current player, {% of all stamina used is given right back! @ (Effect wears off when player runs out of Stamina)"
            }),
        new SpelunkingElixirBase(1, <SpelunkingElixirModel>{
                "index": 1,
                "description": "Highlights an area on the floor. @ The hole to the next depth is guaranteed to be in that area!"
            }),
        new SpelunkingElixirBase(2, <SpelunkingElixirModel>{
                "index": 2,
                "description": "Gives the current player a 50% chance to regenerate @ {% Stamina when they run out. @ (Cannot be used a 2nd time while the effect is active)"
            }),
        new SpelunkingElixirBase(3, <SpelunkingElixirModel>{
                "index": 3,
                "description": "Boosts your amber gain by +{% per stamina used during the delve @ at the time this elixir was used. @ (Effect persists for the entire Delve)"
            }),
        new SpelunkingElixirBase(4, <SpelunkingElixirModel>{
                "index": 4,
                "description": "Boosts POW to 5x your normal amount. @ However, you now lose {% POW each time you descend! @ (Effect persists for the entire Delve)"
            }),
        new SpelunkingElixirBase(5, <SpelunkingElixirModel>{
                "index": 5,
                "description": "For the next 2 depths, whenever an object is destroyed it has a {% chance of hitting an adjacent object with the power of your Hammer tool."
            }),
        new SpelunkingElixirBase(6, <SpelunkingElixirModel>{
                "index": 6,
                "description": "All objects have a +{% chance of dropping Double Amber @ instead of a single amber chunk @ (Effect lasts for the entire Delve)"
            }),
        new SpelunkingElixirBase(7, <SpelunkingElixirModel>{
                "index": 7,
                "description": "Shadow Strikes are 1.5x more common, @ and have a +{% higher chance to trigger a multi strike @ (Effect lasts for the entire Delve)"
            }),
        new SpelunkingElixirBase(8, <SpelunkingElixirModel>{"index": 8, "description": "Triggers a Nova Blast. Woah..."}),
        new SpelunkingElixirBase(9, <SpelunkingElixirModel>{
                "index": 9,
                "description": "Increases Stamina Costs by 2x, reduces POW by 100x, but boosts Grand Discovery chance by 5x"
            }),
        new SpelunkingElixirBase(10, <SpelunkingElixirModel>{
                "index": 10,
                "description": "Increases Stamina Costs by 4x, boosts POW by 100x. @ Each use adds a stack of this effect, so 8x and 200x on the 2nd use. @ (Effect persists for the entire Delve)"
            }),
        new SpelunkingElixirBase(11, <SpelunkingElixirModel>{
                "index": 11,
                "description": "This elixir doesn't have a label on it. At least, that's what the label says..."
            })    
]
}
