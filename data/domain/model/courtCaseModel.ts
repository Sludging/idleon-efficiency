import { CaseOutcomeModel } from './caseOutcomeModel';
import { CaseOutcomeTypeEnum } from '../enum/caseOutcomeTypeEnum';
import { CourtCheckTypeEnum } from '../enum/courtCheckTypeEnum';

export interface CourtCaseModel {
    person: string,
    desc: string,
    approveOutcome: CaseOutcomeModel[],
    rejectOutcome: CaseOutcomeModel[],
    currencyScalePer5: CaseOutcomeTypeEnum[],
    coincheck: CourtCheckTypeEnum
}
