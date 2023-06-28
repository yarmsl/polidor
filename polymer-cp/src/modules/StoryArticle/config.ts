import { DeepPartial } from 'react-hook-form';

export const tableConfig: ISuperTableConfig<IStoryArticle>[] = [
  {
    title: 'Заголовок',
    id: 'title',
  },
  {
    title: 'Статья',
    id: 'content',
    ellipsis: true,
  },
];

export const formConfig: ISuperFormConfig<IStoryArticleDto>[] = [
  {
    name: 'title',
    required: true,
    label: 'Заголовок',
    defaultValue: '',
  },
  {
    name: 'content',
    required: true,
    label: 'Статья',
    defaultValue: '',
    type: 'multiline',
  },
];

export const defaultValues = formConfig.map(({ name, defaultValue }) => ({
  [name]: defaultValue,
})) as DeepPartial<IStoryArticleDto>;
