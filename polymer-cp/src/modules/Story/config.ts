import { DeepPartial } from 'react-hook-form';

import { onlyDigits } from '~/lib/rules/pattern';

export const tableConfig: ISuperTableConfig<IStory>[] = [
  {
    title: 'История',
    id: 'content',
    ellipsis: true,
  },
  {
    title: 'Год с',
    id: 'from',
    type: 'number',
  },
  {
    title: 'По',
    id: 'to',
    type: 'number',
  },
];

export const formConfig: ISuperFormConfig<IStoryDto>[] = [
  {
    name: 'content',
    required: true,
    label: 'История',
    defaultValue: '',
    type: 'multiline',
  },
  {
    name: 'from',
    required: true,
    label: 'Год (с какого года)',
    defaultValue: '',
    type: 'number',
    rules: {
      pattern: onlyDigits(),
    },
  },
  {
    name: 'to',
    label: 'По какой год (НЕобязательно)',
    defaultValue: '',
    type: 'number',
    rules: {
      pattern: onlyDigits(),
    },
  },
];

export const defaultValues = formConfig.map(({ name, defaultValue }) => ({
  [name]: defaultValue,
})) as DeepPartial<IStoryDto>;
