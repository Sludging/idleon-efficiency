import { AnvilProduceModel } from './anvilProduceModel';
import { BaseItemModel } from './baseItemModel';
import { DetDropsModel } from './detDropsModel';
import { ItemSetModel } from './itemSetModel';
import { ItemVendorsModel } from './itemVendorsModel';
import { NoteModel } from './noteModel';
import { RecipeModel } from './recipeModel';
import { SlabItemSortModel } from './slabItemSortModel';
import { SourcesModel } from './sourcesModel';

export interface ItemModel {
    item: BaseItemModel,
    sources?: SourcesModel,
    notes?: NoteModel,
    recipe?: RecipeModel,
    vendors?: ItemVendorsModel,
    anvilProduction?: AnvilProduceModel,
    detDrops?: DetDropsModel,
    slabSort?: SlabItemSortModel,
    itemSet?: ItemSetModel
}
