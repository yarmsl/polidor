import { DeepPartial } from 'react-hook-form';

import { onlyDigits } from '~/lib/rules/pattern';

export const tableConfig: ISuperTableConfig<IVacancy>[] = [
  {
    title: 'Вакансия',
    id: 'title',
  },
  {
    title: 'Требования',
    id: 'requirements',
    ellipsis: true,
  },
  {
    title: 'З/П от',
    id: 'wage',
    type: 'number',
  },
];

export const formConfig: ISuperFormConfig<IVacancyDto>[] = [
  {
    name: 'title',
    required: true,
    label: 'Вакансия',
    defaultValue: '',
  },
  {
    name: 'requirements',
    required: true,
    label: 'Требования',
    type: 'multiline',
    defaultValue: '',
  },
  {
    name: 'wage',
    required: true,
    label: 'Заработная плата от (руб)',
    defaultValue: '',
    type: 'number',
    rules: {
      pattern: onlyDigits(),
    },
  },
];

export const defaultValues = formConfig.map(({ name, defaultValue }) => ({
  [name]: defaultValue,
})) as DeepPartial<IVacancyDto>;
