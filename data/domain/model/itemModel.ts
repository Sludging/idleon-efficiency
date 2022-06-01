import { AnvilProduceModel } from './anvilProduceModel';
import { BaseItemModel } from './baseItemModel';
import { DetDropsModel } from './detDropsModel';
import { ItemVendorsModel } from './itemVendorsModel';
import { NoteModel } from './noteModel';
import { RecipeModel } from './recipeModel';
import { SourcesModel } from './sourcesModel';

export interface ItemModel {
    item: BaseItemModel,
    sources?: SourcesModel,
    notes?: NoteModel,
    recipe?: RecipeModel,
    vendors?: ItemVendorsModel,
    anvilProduction?: AnvilProduceModel,
    detDrops?: DetDropsModel
}
