import { ClassTypeEnum } from '../enum/classTypeEnum';
import { ToolItemModel } from './toolItemModel';
import { TrapBoxModel } from './trapBoxModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface TrapBoxItemModel extends ToolItemModel {
    trapBoxData: TrapBoxModel
}
