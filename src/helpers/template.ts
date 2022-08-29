import fs from 'fs';
import path from 'path';
import { escapeMarkdown } from 'telegram-escape';
import type { IMonitor } from '../models/Monitor';
import { mapCategoryIdToCategoryName } from './lihkg';

const directory = path.join(process.cwd(), './src/templates');

export const getTemplate = (name: string) => {
  const [templateType, templateName] = name.split('/');
  const filepath = path.join(directory, templateType, `${templateName}.txt`);
  return fs.readFileSync(filepath, 'utf8');
};

export const patchMonitor = (monitor: IMonitor) => {
  const { name, categoryIds, keywords, disabled } = monitor;
  return {
    name: escapeMarkdown(name),
    categories: categoryIds.map((categoryId, index) => {
      const id = categoryId;
      const name = escapeMarkdown(mapCategoryIdToCategoryName(categoryId));
      const isLast = index === categoryIds.length - 1;
      return { id, name, isLast };
    }),
    keywords: keywords.map((keyword, index) => {
      const text = escapeMarkdown(keyword);
      const isLast = index === keywords.length - 1;
      return { text, isLast };
    }),
    disabled
  };
};
