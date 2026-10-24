import { LegendTalentActivationModel } from './legendTalentActivationModel';
import { LegendTalentMenagerieCapSourceModel } from './legendTalentMenagerieCapSourceModel';
import { LegendTalentResearchCapSourceModel } from './legendTalentResearchCapSourceModel';

export interface LegendTalentMetadataModel {
    researchCapSources: LegendTalentResearchCapSourceModel[],
    menagerieCapSources: LegendTalentMenagerieCapSourceModel[],
    activations: LegendTalentActivationModel[]
}
