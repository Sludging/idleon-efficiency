import { SkillsIndex } from "../SkillsIndex";

export interface ResearchSkillProgress {
  highestLevel: number;
  currentXP: number;
  xpReq: number;
}


/** Select one saved Research snapshot, preferring level before EXP. */
export const selectResearchSkillProgress = (data: Map<string, unknown>, charCount: number): ResearchSkillProgress => {
  const initialLevelData = data.get("Lv0_0") as number[];
  const initialExperienceData = data.get("Exp0_0") as number[];
  const initialRequirementData = data.get("ExpReq0_0") as number[];
  let highestLevel = Number(initialLevelData[SkillsIndex.Research]) || 0;
  let currentXP = Number(initialExperienceData[SkillsIndex.Research]) || 0;
  let xpReq = Number(initialRequirementData[SkillsIndex.Research]);

  for (let characterIndex = 1; characterIndex < charCount; characterIndex++) {
    const levels = data.get(`Lv0_${characterIndex}`) as number[];
    const experience = data.get(`Exp0_${characterIndex}`) as number[];
    const requirements = data.get(`ExpReq0_${characterIndex}`) as number[];
    const level = Number(levels[SkillsIndex.Research]) || 0;
    const xp = Number(experience[SkillsIndex.Research]) || 0;

    if (level > highestLevel || (level === highestLevel && xp > currentXP)) {
      highestLevel = level;
      currentXP = xp;
      xpReq = Number(requirements[SkillsIndex.Research]);
    }
  }

  return { highestLevel, currentXP, xpReq };
};

