import { ChapterBonusModel } from '../model/chapterBonusModel';
import { SpelunkingChapterModel } from '../model/spelunkingChapterModel';

export class SpelunkingChapterBase { constructor(public index: number, public data: SpelunkingChapterModel) { } }



export const initSpelunkingChapterRepo = () => {
    return [    
        new SpelunkingChapterBase(0, <SpelunkingChapterModel>{
                "name": "The fear within",
                "bonuses": [
                    <ChapterBonusModel>{
                        "bonus": "+{ Base Spelunking Efficiency",
                        "x1": 5,
                        "x2": 0,
                        "func": "add",
                        "x3": 1,
                        "requiredPages": 100,
                        "x4": 320,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "+{% Total Spelunking Efficiency",
                        "x1": 1000,
                        "x2": 1000,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 2000,
                        "x4": 320,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "+{% Faster Spelunking Speed",
                        "x1": 30,
                        "x2": 2000,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 25000,
                        "x4": 320,
                        "x5": 0
                    }
                ]
            }),
        new SpelunkingChapterBase(1, <SpelunkingChapterModel>{
                "name": "Decay surrounds",
                "bonuses": [
                    <ChapterBonusModel>{
                        "bonus": "+{ Base Spelunking Efficiency",
                        "x1": 10,
                        "x2": 0,
                        "func": "add",
                        "x3": 1,
                        "requiredPages": 100,
                        "x4": 320,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "+{% Spelunking EXP gain",
                        "x1": 30,
                        "x2": 500,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 2500,
                        "x4": 80,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "x Total Spelunking POW",
                        "x1": 4,
                        "x2": 1000,
                        "func": "decayMulti",
                        "x3": 1,
                        "requiredPages": 10000,
                        "x4": 80,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "x Total Amber Found",
                        "x1": 4,
                        "x2": 1000,
                        "func": "decayMulti",
                        "x3": 1,
                        "requiredPages": 200000,
                        "x4": 80,
                        "x5": 0
                    }
                ]
            }),
        new SpelunkingChapterBase(2, <SpelunkingChapterModel>{
                "name": "This is gospel",
                "bonuses": [
                    <ChapterBonusModel>{
                        "bonus": "+{ Max Stamina for All Players",
                        "x1": 25,
                        "x2": 500,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 100,
                        "x4": 150,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "+{% Faster Stamina Regeneration",
                        "x1": 50,
                        "x2": 600,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 10000,
                        "x4": 150,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "{% extra Overstim Fill Rate",
                        "x1": 250,
                        "x2": 1000,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 200000,
                        "x4": 150,
                        "x5": 0
                    }
                ]
            }),
        new SpelunkingChapterBase(3, <SpelunkingChapterModel>{
                "name": "No escape",
                "bonuses": [
                    <ChapterBonusModel>{
                        "bonus": "+{% Max Stamina for All Players",
                        "x1": 10,
                        "x2": 400,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 100,
                        "x4": 0,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "+{% Spelunking EXP gain",
                        "x1": 50,
                        "x2": 600,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 4000,
                        "x4": 0,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "+{% chance to not use up Elixir",
                        "x1": 3,
                        "x2": 1000,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 100000,
                        "x4": 0,
                        "x5": 0
                    },
                    <ChapterBonusModel>{
                        "bonus": "{% extra Chapter LVs from Pages",
                        "x1": 50,
                        "x2": 2000,
                        "func": "decay",
                        "x3": 1,
                        "requiredPages": 2500000,
                        "x4": 0,
                        "x5": 0
                    }
                ]
            })    
]
}
