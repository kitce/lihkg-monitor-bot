import { CategoryId, CategoryName } from '@kitce/lihkg-api-node/types';
import { mapEnumToTuples } from './enum';

const categoryNameMapping = mapEnumToTuples(CategoryId).reduce((mapping, [categoryKey, categoryId]) => {
  mapping[categoryId] = CategoryName[categoryKey];
  return mapping;
}, {} as Record<CategoryId, CategoryName>);

export const mapCategoryIdToCategoryName = (categoryId: CategoryId) => {
  return categoryNameMapping[categoryId];
};
